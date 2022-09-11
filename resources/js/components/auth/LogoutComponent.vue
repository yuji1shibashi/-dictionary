<template>
    <HeaderComponent/>
    <div class="loading" v-show="isProcessing()">
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary loading_spinner" role="status">
                <span class="sr-only">Connecting...</span>
            </div>
        </div>
    </div>
</template>

<script>

// 共通部品取得
import HeaderComponent from '../common/HeaderComponent.vue';
import Common from '../../common.js';
import { API_URL, IS_AUTH } from '../../const.js';

export default {
    mounted() {
        var self = this;

        // ログアウト処理を実行
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post(
                API_URL.LOGOUT,
                []
            )
            .then(function(res) {
                // ユーザー情報を破棄
                localStorage.clear();
                self.$router.push({path: '/login'});
            })
            .catch(function(res) {
                // ユーザー情報を破棄
                localStorage.clear();
                self.$router.push({path: '/login'});
            });
        });
    },
    mixins: [Common]
}

</script>