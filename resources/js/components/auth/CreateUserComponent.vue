<template>
    <HeaderComponent/>
    <div class="alert alert-success alert-dismissible fade show" v-if="isSuccess" role="alert">
        <p class="l_message">ユーザー作成に成功しました。</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="alert alert-danger" v-if="isError" role="alert">
        <p class="cu_message" v-for="(message, index) in errorMessages" :key="index">{{ message }}</p>
    </div>
    <div class="loading" v-show="isProcessing()">
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary loading_spinner" role="status">
                <span class="sr-only">Connecting...</span>
            </div>
        </div>
    </div>
    <div class="cu_create_user_area">
        <div class="cu_create_user_form">
            <label>■ユーザー名</label>
            <input type="text" class="form-control w100" v-model="userName" placeholder="ユーザー名を入力してください">
        </div>
        <div class="cu_create_user_form">
            <label>■メールアドレス</label>
            <input type="text" class="form-control w100" v-model="email" placeholder="メールアドレスを入力してください">
        </div>
        <div class="cu_create_user_form">
            <label>■パスワード</label>
            <input type="password" class="form-control w100" v-model="password" placeholder="パスワードを入力してください">
        </div>
        <div class="cu_create_user_form">
            <label>■パスワード（確認用）</label>
            <input type="password" class="form-control w100" v-model="confPassword" placeholder="パスワード（確認用）を入力してください">
        </div>
        <div class="cu_create_user_action">
            <button type="button" class="btn btn-dark" @click="onCreateUser()" v-bind:disabled="isProcessing()">ユーザー作成</button>
        </div>
    </div>
</template>

<script>

// 共通部品取得
import HeaderComponent from '../common/HeaderComponent.vue';
import Common from '../../common.js';
import { ERROE_MESSAGES, REGEXP, API_URL } from '../../const.js';

export default {
    data() {
        return {
            isError: false,
            isSuccess: false,
            errorMessages: [],
            userName: '',
            email: '',
            password: '',
            confPassword: ''
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
        onCreateUser() {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }
            // 処理を開始する
            this.startProcessing();

            // ログインフォームのバリデーションチェック
            if (this.isInputCreateUserForm()) {
                // 処理を終了する
                this.endProcessing();
                return;
            }
            // ユーザーを作成する
            this.addUser();
        },

        /**
         * ユーザー登録フォームの入力値をチェックする
         *
         * @return {boolean}
         */
        isInputCreateUserForm() {
            this.isError = false;
            this.errorMessages = [];

            // ユーザーが空の場合
            if (this.userName === '') {
                this.errorMessages.push(ERROE_MESSAGES.EMPTY_USERNAME);
            }

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

            // パスワード（確認用）が空の場合
            if (this.confPassword === '') {
                this.errorMessages.push(ERROE_MESSAGES.EMPTY_CONF_PASSWORD);
            }

            // パスワードとパスワード（確認用）の入力値が一致しない場合
            if (this.password !== ''
                && this.confPassword !== ''
                && this.password !== this.confPassword
            ) {
                this.errorMessages.push(ERROE_MESSAGES.UNMATCHED_PASSWORD);
            }

            // エラーが存在するかチェック
            if (this.errorMessages.length > 0) {
                this.isError = true;
            }
            return this.isError;
        },

        /**
         * ユーザー登録処理
         *
         * @return {void}
         */
        addUser() {
            var self = this;

            // ユーザー登録処理を実行する
            axios.post(
                API_URL.CREATE_USER,
                self.getUserFormData(),
            )
            .then(function(res) {
                self.isSuccess = true;
                // ユーザーフォームをリセットする
                self.resetUserForm();
                // 処理を終了する
                self.endProcessing();
            })
            .catch(function(res) {
                // エラーをセット
                self.setErrorMessage(res.response.data.errors);
                // 処理を終了する
                self.endProcessing();
            })
        },

        /**
         * ユーザー登録するデータ取得
         *
         * @return {object}
         */
        getUserFormData() {
            return {
                name: this.userName,
                email: this.email,
                password: this.password,
                password_confirmation: this.confPassword
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
        },

        /**
         * ユーザーフォームをリセットする
         *
         * @return void
         */
        resetUserForm() {
            this.userName = '';
            this.email = '';
            this.password = '';
            this.confPassword = '';
        }
    }
}

</script>

<style lang="scss">

    .cu_create_user_area {
        background-color: #cfe3ff;
        width: 25vw;
        height: 450px;
        margin: 150px auto 20px;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 2px 2px 2px 2px #000235;
    }

    .cu_create_user_form {
        margin: 0px auto 20px;
    }

    .cu_create_user_action {
        text-align: center;
        margin-top: 30px;
    }

    .cu_message {
        margin-bottom: auto;
    }

</style>