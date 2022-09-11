<?php

namespace App\Http\Servises;

use Illuminate\Http\Request;
use App\Models\language;
use App\Models\TranslationHistory;

/**
 * 翻訳暗記テスト関連の機能を扱うサービスクラス
 */
class MemorizationServise
{
    /**
     * 翻訳問題一覧取得
     *
     * @param int $userId
     * @param int $languageId
     * @param string $questionType
     * @return object
     */
    public function getTranslationQuestionList(int $userId, int $languageId, string $questionType)
    {
        $historyModel = new TranslationHistory;
        return $historyModel->getTranslationQuestionList($userId, $languageId, $questionType);
    }
}