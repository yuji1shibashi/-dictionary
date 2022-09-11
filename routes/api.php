<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * ログイン処理
 */
Route::post('/login', [App\Http\Controllers\App\LoginController::class, 'login']);
/**
 * ログアウト処理
 */
Route::post('/logout', [App\Http\Controllers\App\LoginController::class, 'logout']);

/**
 * 認証関連
 */
Route::prefix('/auth')->group(function () {
    /**
     * ユーザー登録
     */
    Route::post('/user', [App\Http\Controllers\App\RegisterController::class, 'create']);
    /**
     * ユーザー名取得
     */
    Route::get('/user', [App\Http\Controllers\App\LoginController::class, 'getLoginUserName']);
});

/**
 * 単語翻訳関連
 */
Route::prefix('/dictionary')->group(function () {
    /**
     * 単語翻訳画面の初期表示データ取得
     */
    Route::get('/{userId}', [App\Http\Controllers\App\DictionaryController::class, 'index']);
    /**
     * 単語翻訳画面データ取得
     */
    Route::get('/show/{userId}', [App\Http\Controllers\App\DictionaryController::class, 'show']);
    /**
     * 単語翻訳履歴登録
     */
    Route::post('/', [App\Http\Controllers\App\DictionaryController::class, 'store']);
    /**
     * 単語翻訳履歴登録
     */
    Route::put('/{historyId}', [App\Http\Controllers\App\DictionaryController::class, 'update']);
    /**
     * 単語翻訳履歴削除
     */
    Route::delete('/{historyId}', [App\Http\Controllers\App\DictionaryController::class, 'destroy']);
});

/**
 * 翻訳暗記テスト関連
 */
Route::prefix('/memorization')->group(function () {
    /**
     * 翻訳暗記テスト画面の初期表示データ取得
     */
    Route::get('/{userId}', [App\Http\Controllers\App\MemorizationController::class, 'index']);
    /**
     * 翻訳暗記テスト画面データ取得
     */
    Route::get('/show/{userId}', [App\Http\Controllers\App\MemorizationController::class, 'show']);
    /**
     * 翻訳暗記テスト履歴登録
     */
    Route::post('/', [App\Http\Controllers\App\MemorizationController::class, 'store']);
    /**
     * 翻訳暗記テスト履歴登録
     */
    Route::put('/{historyId}', [App\Http\Controllers\App\MemorizationController::class, 'update']);
    /**
     * 翻訳暗記テスト履歴削除
     */
    Route::delete('/{historyId}', [App\Http\Controllers\App\MemorizationController::class, 'destroy']);
});