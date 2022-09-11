<?php

namespace App\Http\Servises;

use Illuminate\Http\Request;
use App\Models\TranslationHistory;

/**
 * 辞書翻訳関連の機能を扱うサービスクラス
 */
class DictionaryServise
{
    /**
     * ソートデータ
     *
     * @var array
     */
    const DOCTIONARY_SORTS_DATA = [
        'CREATED_AT_DESC' => ['key' => 'translation_histories.created_at', 'sort' => 'DESC'],
        'CREATED_AT_ASC' => ['key' => 'translation_histories.created_at', 'sort' => 'ASC'],
        'FROM_LANGUAGE_ASC' => ['key' => 'from_language', 'sort' => 'ASC'],
        'FROM_LANGUAGE_DESC' => ['key' => 'from_language', 'sort' => 'DESC'],
        'FROM_WORD_ASC' => ['key' => 'translation_histories.from_word', 'sort' => 'ASC'],
        'FROM_WORD_DESC' => ['key' => 'translation_histories.from_word', 'sort' => 'DESC'],
        'TO_LANGUAGE_ASC' => ['key' => 'to_language', 'sort' => 'ASC'],
        'TO_LANGUAGE_DESC' => ['key' => 'to_language', 'sort' => 'DESC'],
        'TO_WORD_ASC' => ['key' => 'translation_histories.to_word', 'sort' => 'ASC'],
        'TO_WORD_DESC' => ['key' => 'translation_histories.to_word', 'sort' => 'DESC'],
        'IS_MEMORY_ASC' => ['key' => 'translation_histories.is_memory', 'sort' => 'ASC'],
        'IS_MEMORY_DESC' => ['key' => 'translation_histories.is_memory', 'sort' => 'DESC'],
    ];

    /**
     * ソートキー
     *
     * @var string
     */
    private $sortKey = '';

    /**
     * ソート順
     *
     * @var string
     */
    private $sort = '';

    /**
     * 翻訳履歴一覧を取得
     *
     * @param int $userId
     * @param string $sortType
     * @return App\Models\TranslationHistory
     */
    public function getTranslationHistory(int $userId, string $sortType = "CREATED_AT_DESC")
    {
        $this->setSort($sortType);

        $historyModel = new TranslationHistory;
        return $historyModel->getHistoryList($userId, $this->sortKey, $this->sort);
    }

    /**
     * 翻訳履歴を登録
     *
     * @param Request $request
     * @return App\Models\TranslationHistory
     */
    public function store(Request $request)
    {
        return TranslationHistory::create([
            'user_id' => $request->user_id,
            'from_language_id' => $request->from_language_id,
            'to_language_id' => $request->to_language_id,
            'from_word' => $request->from_word,
            'to_word' => $request->to_word,
            'is_memory' => false,
        ]);
    }

    /**
     * 翻訳の暗記状態を更新
     *
     * @param Request $request
     * @return App\Models\TranslationHistory
     */
    public function updateMemorization(Request $request)
    {
        return TranslationHistory::where('id', $request->historyId)->update([
            'is_memory' => $request->isMemory,
        ]);
    }

    /**
     * 翻訳履歴を削除
     *
     * @param int $historyId
     * @return App\Models\TranslationHistory
     */
    public function destroy(int $historyId)
    {
        return TranslationHistory::find($historyId)->delete();
    }

    /**
     * 翻訳履歴のソート順をセット
     *
     * @param string $sortType
     * @return void
     */
    private function setSort(string $sortType)
    {
        $this->sortKey = self::DOCTIONARY_SORTS_DATA[$sortType]['key'];
        $this->sort = self::DOCTIONARY_SORTS_DATA[$sortType]['sort'];
    }

    /**
     * 翻訳問題一覧取得
     *
     * @return object
     */
    public function getTranslationQuestionList()
    {
        $historyModel = new TranslationHistory;
        return $historyModel->getHistoryList(1,1,'');
    }
}