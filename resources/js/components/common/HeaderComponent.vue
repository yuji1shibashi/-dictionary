<template>
    <header>
        <div v-if="isAuthenticated">
            <router-link class="h_link" to="/dictionary">単語翻訳</router-link>
            <router-link class="h_link" to="/memorization">暗記テスト</router-link>
            <router-link class="h_link" to="/logout">ログアウト</router-link>
            <div class="h_user_name">ログインユーザ：{{ userName }}</div>
        </div>
        <div v-else>
            <router-link class="h_link" to="/login">ログイン</router-link>
            <router-link class="h_link" to="/create_user">ユーザー作成</router-link>
        </div>
    </header>
    <div class="header_height"></div>
</template>

<script>
export default {
    data() {
        return {
            isAuthenticated: false,
            userName: ''
        }
    },
    mounted() {
        // ログイン済みかを判定する
        this.isAuthenticated = Boolean(parseInt(localStorage.getItem("isAuth"), 10));
        // ログインユーザー名をセット
        this.userName = localStorage.getItem('loginUserName');
    },
}
</script>

<style lang="scss">

header {
    background-color: #000235;
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 100;

    .h_link, .h_user_name {
        color: #FFF;
        font-weight: bold;
        font-size: 22px;
        margin: 15px;
        display: inline-block;
    }
    .h_user_name {
        float: right;
        margin-right: 30px;
    }
}

.header_height {
    height: 60px;
}

</style>