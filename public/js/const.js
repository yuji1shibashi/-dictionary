/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/const.js":
/*!*******************************!*\
  !*** ./resources/js/const.js ***!
  \*******************************/
/*! namespace exports */
/*! export API_URL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DICTIONARY_SORTS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ERROE_MESSAGES [provided] [no usage info] [missing usage info prevents renaming] */
/*! export INIT_DATA [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IS_AUTH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IS_MEMORY [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANGUAGE_DATA_INDEX [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANGUAGE_ID [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MEMORY_RESULT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QUESTION_TYPES [provided] [no usage info] [missing usage info prevents renaming] */
/*! export REGEXP [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TRANSLATTOR_TEXT_API_HEADER [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TRANSLATTOR_TEXT_API_KEY [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INIT_DATA": () => /* binding */ INIT_DATA,
/* harmony export */   "REGEXP": () => /* binding */ REGEXP,
/* harmony export */   "ERROE_MESSAGES": () => /* binding */ ERROE_MESSAGES,
/* harmony export */   "API_URL": () => /* binding */ API_URL,
/* harmony export */   "IS_AUTH": () => /* binding */ IS_AUTH,
/* harmony export */   "IS_MEMORY": () => /* binding */ IS_MEMORY,
/* harmony export */   "LANGUAGE_ID": () => /* binding */ LANGUAGE_ID,
/* harmony export */   "LANGUAGE_DATA_INDEX": () => /* binding */ LANGUAGE_DATA_INDEX,
/* harmony export */   "MEMORY_RESULT": () => /* binding */ MEMORY_RESULT,
/* harmony export */   "TRANSLATTOR_TEXT_API_KEY": () => /* binding */ TRANSLATTOR_TEXT_API_KEY,
/* harmony export */   "TRANSLATTOR_TEXT_API_HEADER": () => /* binding */ TRANSLATTOR_TEXT_API_HEADER,
/* harmony export */   "DICTIONARY_SORTS": () => /* binding */ DICTIONARY_SORTS,
/* harmony export */   "QUESTION_TYPES": () => /* binding */ QUESTION_TYPES
/* harmony export */ });
/**
 * 初期化データ
 *
 * @var object
 */
var INIT_DATA = {
  RESULT: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0%'],
  QUESTION_NO: 'Q.-',
  NEXT_CLICK_NUM: 1
};
/**
 * 正規表現
 *
 * @var object
 */

var REGEXP = {
  EMAIL: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
  PASSWORD: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/
};
/**
 * エラーメッセージ
 *
 * @var object
 */

var ERROE_MESSAGES = {
  EMPTY_USERNAME: 'ユーザー名が未入力です。',
  EMPTY_EMAIL: 'メールアドレスが未入力です。',
  EMPTY_PASSWORD: 'パスワードが未入力です。',
  EMPTY_CONF_PASSWORD: 'パスワード（確認用）が未入力です。',
  DIFFERENT_FORMAT_EMAIL: 'メールアドレスの形式で入力してください。',
  DIFFERENT_FORMAT_PASSWORD: 'パスワードは8文字以上の半角英数字で入力してください。',
  UNMATCHED_PASSWORD: 'パスワードとパスワード（確認用）が一致しません。',
  NOTFOUND_USER: '認証できるユーザーが存在しません'
};
/**
 * APIURL
 *
 * @var object
 */

var API_URL = {
  CREATE_USER: '/api/auth/user',
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  DICTIONARY: '/api/dictionary/',
  SHOW_DICTIONARY: '/api/dictionary/show/',
  MEMORIZATION: '/api/memorization/',
  SHOW_MEMORIZATION: '/api/memorization/show/',
  TRANSLATTOR_TEXT: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
};
/**
 * 認証をチェック
 *
 * @var object
 */

var IS_AUTH = {
  TRUE: 1,
  FALSE: 0
};
/**
 * 認証をチェック
 *
 * @var object
 */

var IS_MEMORY = {
  TRUE: '1',
  FALSE: '0'
};
/**
 * 言語ID
 *
 * @var object
 */

var LANGUAGE_ID = {
  JAPANESE: '1',
  ENGLISH: '2'
};
/**
 * 言語データインデックス
 *
 * @var object
 */

var LANGUAGE_DATA_INDEX = {
  JAPANESE: 0,
  ENGLISH: 1
};
/**
 * 暗記結果
 *
 * @var object
 */

var MEMORY_RESULT = {
  TRUE: '〇',
  FALSE: '×'
};
/**
 * Translator Text API Azure key
 *
 * @var string
 */

var TRANSLATTOR_TEXT_API_KEY = '00535dac066b4a2082585ca1d175d365';
/**
 * Translator Text API Header
 *
 * @var object
 */

var TRANSLATTOR_TEXT_API_HEADER = {
  'Ocp-Apim-Subscription-Key': TRANSLATTOR_TEXT_API_KEY,
  'Ocp-Apim-Subscription-Region': 'japaneast',
  'Content-Type': 'application/json'
};
/**
 * 翻訳履歴ソート一覧
 *
 * @var object
 */

var DICTIONARY_SORTS = {
  CREATED_AT_DESC: '翻訳日時新しい順',
  CREATED_AT_ASC: '翻訳日時古い順',
  FROM_LANGUAGE_ASC: '検索言語昇順',
  FROM_LANGUAGE_DESC: '検索言語降順',
  FROM_WORD_ASC: '検索ワード昇順',
  FROM_WORD_DESC: '検索ワード降順',
  TO_LANGUAGE_ASC: '翻訳言語昇順',
  TO_LANGUAGE_DESC: '翻訳言語降順',
  TO_WORD_ASC: '翻訳ワード昇順',
  TO_WORD_DESC: '翻訳ワード降順',
  IS_MEMORY_DESC: '暗記済み順',
  IS_MEMORY_ASC: '暗記待ち順'
};
/**
 * 出題タイプ
 *
 * @var object
 */

var QUESTION_TYPES = {
  RANDOM: 'ランダムで出題',
  ONLY_NO_MEMORIZATION: '暗記していないもののみ出題',
  ONLY_MEMORIZATION: '暗記しているもののみ出題'
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/const.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;