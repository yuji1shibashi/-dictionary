<template>
    <HeaderComponent/>
    <div class="alert alert-danger" v-if="isError" role="alert">
        <p class="l_message" v-for="(message, index) in errorMessages" :key="index">{{ message }}</p>
    </div>
    <div class="loading" v-show="isProcessing()">
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary loading_spinner" role="status">
                <span class="sr-only">Connecting...</span>
            </div>
        </div>
    </div>
    <div class="l_login_area">
        <div class="l_login_form">
            <label>■メールアドレス</label>
            <input type="text" class="form-control w100" v-model="email" placeholder="メールアドレスを入力してください">
        </div>
        <div class="l_login_form">
            <label>■パスワード</label>
            <input type="password" class="form-control w100" v-model="password" placeholder="パスワードを入力してください">
        </div>
        <div class="l_login_action">
            <button type="button" class="btn btn-dark l_login_btn" @click="onLogin()">ログイン</button>
        </div>
    </div>
</template>

<script>

// 共通部品取得
import HeaderComponent from '../common/HeaderComponent.vue';
import Common from '../../common.js';
import { ERROE_MESSAGES, REGEXP, API_URL, IS_AUTH } from '../../const.js';

export default {
    data() {
        return {
            isError: false,
            errorMessages: [],
            email: '',
            password: ''
        }
    },
    mixins: [Common],
    components: {
        HeaderComponent
    },
    methods: {

        /**
         * ログインボタン押下時の挙動
         *
         * @return {void}
         */
        onLogin() {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }
            // 処理を開始する
            this.startProcessing();

            // ログインフォームのバリデーションチェック
            if (this.isInputLoginForm()) {
                // 処理を終了する
                this.endProcessing();
                return;
            }
            // ログイン処理
            this.login();
        },

        /**
         * ログインフォームの入力値をチェックする
         *
         * @return {boolean}
         */
        isInputLoginForm() {
            this.isError = false;
            this.errorMessages = [];

            // メールアドレスが空の場合
            if (this.email === '') {
                this.errorMessages.push(ERROE_MESSAGES.EMPTY_EMAIL);
            }

            // メールアドレスの形式が異なる場合
            if (this.email.match(REGEXP.EMAIL) === null) {
                this.errorMessages.push(ERROE_MESSAGES.DIFFERENT_FORMAT_EMAIL);
            }

            // パスワードが空の場合
            if (this.password === '') {
                this.errorMessages.push(ERROE_MESSAGES.EMPTY_PASSWORD);
            }

            // パスワードの形式が異なる場合
            if (this.password.match(REGEXP.PASSWORD) === null) {
                this.errorMessages.push(ERROE_MESSAGES.DIFFERENT_FORMAT_PASSWORD);
            }

            // エラーが存在するかチェック
            if (this.errorMessages.length > 0) {
                this.isError = true;
            }
            return this.isError;
        },

        /**
         * ログイン処理
         *
         * @return {void}
         */
        login() {
            var self = this;

            // ログイン処理実行
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post(
                    API_URL.LOGIN,
                    self.getLoginFormData()
                )
                .then(function(res) {
                    // ユーザー情報を保持
                    localStorage.setItem("isAuth", IS_AUTH.TRUE);
                    localStorage.setItem("loginUserName", res.data.loginUserData.name);
                    localStorage.setItem("loginUserId", res.data.loginUserData.id);
                    // 処理を終了する
                    self.endProcessing();
                    // 単語翻訳画面に遷移する
                    self.$router.push({path: '/dictionary'});
                })
                .catch(function(res) {
                    self.isError = true;
                    self.password = '';
                    // エラーをセット
                    if (res.response.data.errors.length > 0) {
                        self.setErrorMessage(res.response.data.errors);
                    } else {
                        self.errorMessages.push(ERROE_MESSAGES.NOTFOUND_USER);
                    }
                    // 処理を終了する
                    self.endProcessing();
                });
            });
        },

        /**
         * ログインするデータ取得
         *
         * @return {object}
         */
        getLoginFormData() {
            return {
                email: this.email,
                password: this.password,
                remember: true
            }
        },

        /**
         * エラーメッセージをセットする
         *
         * @param {object} errorMessages
         */
        setErrorMessage(errorMessages) {
            var self = this;
            this.isError = true;

            // エラー種類の数だけループする
            Object.keys(errorMessages).forEach(function (key) {
                // エラーの数だけループする
                Object.keys(errorMessages[key]).forEach(function (index) {
                    self.errorMessages.push(errorMessages[key][index]);
                });
            });
        }
    }
}

</script>

<style lang="scss">

    .l_login_area {
        background-color: #cfe3ff;
        width: 25vw;
        height: 270px;
        margin: 150px auto 20px;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 2px 2px 2px 2px #000235;
    }

    .l_login_form {
        margin: 0px auto 20px;
    }

    .l_login_action {
        text-align: center;
        margin-top: 30px;
    }

    .l_login_btn {
        margin-left: 20px;
    }

    .l_message {
        margin-bottom: auto;
    }

</style>