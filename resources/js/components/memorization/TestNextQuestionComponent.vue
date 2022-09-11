<template>
    <button type="button" class="btn btn-dark tnq_btn_next"
        v-if="displayNextBtn"
        @click="onNextQuestion()"
    >次へ</button>
    <button type="button" class="btn btn-dark tnq_btn_next"
        v-if="displayFinishBtn"
        @click="onFinish()"
    >テスト終了</button>
</template>

<script>

// 共通処理
import { INIT_DATA } from '../../const.js';

export default {
    data() {
        return {
            displayNextBtn: false,
            displayFinishBtn: false,
            onClickNum: INIT_DATA.NEXT_CLICK_NUM,
        }
    },
    methods: {

        /**
         * リセット処理
         *
         * @return {void}
         */
        resetNextQuestion() {
            this.displayNextBtn = false;
            this.displayFinishBtn = false;
            this.onClickNum = INIT_DATA.NEXT_CLICK_NUM;
        },

        /**
         * 次へボタン表示処理
         *
         * @param {number} totalQuestionNum
         * @return {void}
         */
        displayNextQuestion(totalQuestionNum) {
            // 現在のクリック回数が総問題数より少ない場合
            if (this.onClickNum < totalQuestionNum) {
                this.displayNextBtn = true;
            } else {
                this.displayFinishBtn = true;
            }
        },

        /**
         * 次へボタン押下処理
         *
         * @return {void}
         */
        onNextQuestion() {
            this.onClickNum++;
            this.displayNextBtn = false;
            this.$emit('nextQuestion');
        },

        /**
         * テスト終了ボタン押下処理
         *
         * @return {void}
         */
        onFinish() {
            this.displayFinishBtn = false;
            this.$emit('finish');
        }
    }
}

</script>

<style lang="scss">

.tnq_btn_next {
    width: 150px;
}

</style>