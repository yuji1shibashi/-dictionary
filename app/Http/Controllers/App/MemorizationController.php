<?php

namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use App\Http\Servises\CommonServise;
use App\Http\Servises\MemorizationServise;

/**
 * 翻訳暗記テスト関連の機能を扱うコントローラークラス
 */
class MemorizationController extends AppController
{
    /**
     * 暗記テストサービスインスタンス
     *
     * @var MemorizationServise
     */
    protected $memorizationServise;

    /**
     * コンストラクタ
     *
     * @param MemorizationServise $memorizationServise
     */
    public function __construct(MemorizationServise $memorizationServise)
    {
        $this->memorizationServise = $memorizationServise;
    }

    /**
     * 暗記テスト翻訳画面の初期表示に使用するデータを呼び出す関数
     *
     * @param string $userId
     * @return array
     */
    public function index(string $userId)
    {
        // データが問題なく取得できた場合はレスポンスを返す
        return [
            'langages' => CommonServise::getDictionary()
        ];
    }

    /**
     * 翻訳履歴を取得する
     *
     * @param Request $request
     * @param string $userId
     * @return void
     */
    public function show(string $userId, Request $request)
    {
        return $this->memorizationServise->getTranslationQuestionList(
            intval($userId),
            intval($request->languageId),
            $request->questionType
        );
    }
}
