<?php

namespace App\Http\Servises;

use Illuminate\Support\Facades\Auth;
use App\Models\language;

/**
 * 辞書翻訳関連の機能を扱うサービスクラス
 */
class CommonServise
{
    /**
     * ログインユーザー名取得
     *
     * @return string
     */
    public static function getLoginUserName()
    {
        return Auth::user();
    }

    /**
     * 認証済みかチェック
     *
     * @return boolean
     */
    public static function AuthCheck()
    {
        return (Auth::check()) ? true : false;
    }

    /**
     * 言語を取得する
     *
     * @return App\Models\language
     */
    public static function getDictionary()
    {
        return language::all()->toArray();
    }
}