/**
 * 初期化データ
 *
 * @var object
 */
export const INIT_DATA = {
    RESULT: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0%'],
    QUESTION_NO: 'Q.-',
    NEXT_CLICK_NUM: 1
}

/**
 * 正規表現
 *
 * @var object
 */
export const REGEXP = {
    EMAIL: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
    PASSWORD: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/
}

/**
 * エラーメッセージ
 *
 * @var object
 */
export const ERROE_MESSAGES = {
    EMPTY_USERNAME: 'ユーザー名が未入力です。',
    EMPTY_EMAIL: 'メールアドレスが未入力です。',
    EMPTY_PASSWORD: 'パスワードが未入力です。',
    EMPTY_CONF_PASSWORD: 'パスワード（確認用）が未入力です。',
    DIFFERENT_FORMAT_EMAIL: 'メールアドレスの形式で入力してください。',
    DIFFERENT_FORMAT_PASSWORD: 'パスワードは8文字以上の半角英数字で入力してください。',
    UNMATCHED_PASSWORD: 'パスワードとパスワード（確認用）が一致しません。',
    NOTFOUND_USER: '認証できるユーザーが存在しません'
}

/**
 * APIURL
 *
 * @var object
 */
export const API_URL = {
    CREATE_USER: '/api/auth/user',
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    DICTIONARY: '/api/dictionary/',
    SHOW_DICTIONARY: '/api/dictionary/show/',
    MEMORIZATION: '/api/memorization/',
    SHOW_MEMORIZATION: '/api/memorization/show/',
    TRANSLATTOR_TEXT: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0',
}

/**
 * 認証をチェック
 *
 * @var object
 */
export const IS_AUTH = {
    TRUE: 1,
    FALSE: 0
};

/**
 * 認証をチェック
 *
 * @var object
 */
export const IS_MEMORY = {
    TRUE: '1',
    FALSE: '0'
};

/**
 * 言語ID
 *
 * @var object
 */
export const LANGUAGE_ID = {
    JAPANESE: '1',
    ENGLISH: '2'
};

/**
 * 言語データインデックス
 *
 * @var object
 */
export const LANGUAGE_DATA_INDEX = {
    JAPANESE: 0,
    ENGLISH: 1
};

/**
 * 暗記結果
 *
 * @var object
 */
export const MEMORY_RESULT = {
    TRUE: '〇',
    FALSE: '×'
};

/**
 * Translator Text API Azure key
 *
 * @var string
 */
export const TRANSLATTOR_TEXT_API_KEY = '00535dac066b4a2082585ca1d175d365';

/**
 * Translator Text API Header
 *
 * @var object
 */
export const TRANSLATTOR_TEXT_API_HEADER = {
    'Ocp-Apim-Subscription-Key': TRANSLATTOR_TEXT_API_KEY,
    'Ocp-Apim-Subscription-Region': 'japaneast',
    'Content-Type': 'application/json'
};

/**
 * 翻訳履歴ソート一覧
 *
 * @var object
 */
export const DICTIONARY_SORTS = {
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
export const QUESTION_TYPES = {
    RANDOM: 'ランダムで出題',
    ONLY_NO_MEMORIZATION: '暗記していないもののみ出題',
    ONLY_MEMORIZATION: '暗記しているもののみ出題'
};