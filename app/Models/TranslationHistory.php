<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TranslationHistory extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * 翻訳出題数
     *
     * @var int
     */
    const TRANSLATION_QUWSTION_NUM = 10;

    /**
     * 質問タイプ
     *
     * @var string[]
     */
    const QUESTION_TYPE = [
        'RANDOM' => 'RANDOM',
        'ONLY_NO_MEMORIZATION' => 'ONLY_NO_MEMORIZATION',
        'ONLY_MEMORIZATION' => 'ONLY_MEMORIZATION'
    ];

    /**
     * 暗記状況
     *
     * @var array
     */
    const IS_MEMORY = [
        'TRUE' => 1,
        'FALSE' => 0
    ];

    protected $fillable = ['user_id', 'from_language_id', 'to_language_id', 'from_word', 'to_word', 'is_memory', 'deleted_at', 'created_at', 'updated_at'];

    /**
     *
     *
     * @param int $userId
     * @param string $sortKey
     * @param string $sort
     * @return object
     */
    public function getHistoryList(int $userId, string $sortKey, string $sort)
    {
        return DB::table('translation_histories')
            ->join('languages AS fromlang', 'fromlang.id', '=', 'translation_histories.from_language_id')
            ->join('languages AS tolang', 'tolang.id', '=', 'translation_histories.to_language_id')
            ->select(
                'translation_histories.id',
                'fromlang.name AS from_language',
                'translation_histories.from_word',
                'tolang.name AS to_language',
                'translation_histories.to_word',
                'translation_histories.is_memory',
                DB::raw('DATE_FORMAT(`translation_histories`.`created_at`, "%Y/%m/%d") AS `created_at`')
            )
            ->whereNull('translation_histories.deleted_at')
            ->where('translation_histories.user_id', '=', $userId)
            ->orderBy($sortKey, $sort)
            ->get();
    }

    /**
     * 出題数取得
     *
     * @param int $userId
     * @param int $languageId
     * @param string $questionType
     * @return object
     */
    public function getTranslationQuestionList(int $userId, int $languageId, string $questionType)
    {
        $where = [
            ['translation_histories.user_id', '=', $userId],
            ['translation_histories.from_language_id', '=', $languageId]
        ];

        return DB::table('translation_histories')
         ->select(
             'translation_histories.id',
             'translation_histories.from_word',
             'translation_histories.to_word'
         )
         ->whereNull('translation_histories.deleted_at')
         ->where($this->filterQuestionType($questionType, $where))
         ->inRandomOrder()
         ->take(self::TRANSLATION_QUWSTION_NUM)
         ->get();
    }

    /**
     * 絞り込む質問条件を取得
     *
     * @param string $questionType
     * @param array $where
     * @return array
     */
    private function filterQuestionType(string $questionType, array $where)
    {
        switch ($questionType) {
            // 暗記していないもののみ出題
            case self::QUESTION_TYPE['ONLY_NO_MEMORIZATION'] :
                $where[] = ['translation_histories.is_memory', '=', self::IS_MEMORY['FALSE']];
                break;

            // 暗記しているもののみ出題
            case self::QUESTION_TYPE['ONLY_MEMORIZATION'] :
                $where[] = ['translation_histories.is_memory', '=', self::IS_MEMORY['TRUE']];
                break;
        }
        return $where;
    }
}
