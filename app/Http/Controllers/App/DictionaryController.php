<?php

namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use App\Http\Servises\CommonServise;
use App\Http\Servises\DictionaryServise;

/**
 * 辞書翻訳関連の機能を扱うコントローラークラス
 */
class DictionaryController extends AppController
{
    /**
     * 辞書サービスインスタンス
     *
     * @var DictionaryServise
     */
    protected $dictionaryServise;

    /**
     * コンストラクタ
     *
     * @param DictionaryServise $dictionaryServise
     */
    public function __construct(DictionaryServise $dictionaryServise)
    {
        $this->dictionaryServise = $dictionaryServise;
    }

    /**
     * 辞書翻訳画面の初期表示に使用するデータを呼び出す関数
     *
     * @param string $userId
     * @return array
     */
    public function index(string $userId)
    {
        // 言語を取得する
        $langages = CommonServise::getDictionary();
        $translationHistory = $this->dictionaryServise->getTranslationHistory(intval($userId));

        // データが問題なく取得できた場合はレスポンスを返す
        return [
            'langages' => $langages,
            'translationHistories' => $translationHistory
        ];
    }

    /**
     * 翻訳履歴を取得する
     *
     * @param string $userId
     * @param Request $request
     * @return void
     */
    public function show(string $userId, Request $request)
    {
        return $this->dictionaryServise->getTranslationHistory(intval($userId), $request->sortType);
    }

    /**
     * 翻訳履歴を登録
     *
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
    {
        return $this->dictionaryServise->store($request);
    }

    /**
     * 翻訳履歴の暗記を更新
     *
     * @param Request $request
     * @return array
     */
    public function update(Request $request)
    {
        return $this->dictionaryServise->updateMemorization($request);
    }

    /**
     * 翻訳履歴を削除
     *
     * @param Request $request
     * @return array
     */
    public function destroy(Request $request)
    {
        return $this->dictionaryServise->destroy($request->historyId);
    }
}
