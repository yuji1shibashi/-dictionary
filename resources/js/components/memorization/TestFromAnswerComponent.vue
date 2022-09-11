<template>
    <h3>{{ currentQuestionNum }}</h3>
    <label>問題：</label>
    <input type="text" class="form-control tfa_from_answer_form" v-model="fromAnswer" readonly>
    <div>
        <button type="button" class="btn btn-success tfa_btn_answer_conf"
            :disabled="disabledConfBtn"
            @click="onConfAnswer()"
        >回答確認</button>
    </div>
</template>

<script>

// 共通処理
import { INIT_DATA } from '../../const.js';

export default {
    data() {
        return {
            currentQuestionNum: INIT_DATA.QUESTION_NO,
            fromAnswer: '',
            disabledConfBtn: true
        }
    },
    methods: {

        /**
         * 回答、質問Noをセットする
         *
         * @param {string} currentQuestionNum
         * @param {string} fromAnswer
         * @return {void}
         */
        setFromAnswer(currentQuestionNum, fromAnswer) {
            this.currentQuestionNum = 'Q.' + currentQuestionNum;
            this.fromAnswer = fromAnswer;
            this.disabledConfBtn = false;
        },

        /**
         * 回答確認ボタン押下処理
         *
         * @return {void}
         */
        onConfAnswer() {
            this.disabledConfBtn = true;
            this.$emit('displayAnswer');
        },

        /**
         * 質問リセット処理
         *
         * @return {void}
         */
        resetFromAnswer() {
            this.currentQuestionNum= INIT_DATA.QUESTION_NO;
            this.fromAnswer = '';
            this.disabledConfBtn = true;
        }
    }
}

</script>

<style lang="scss">

.tfa_from_answer_form {
    display: inline-block;
    width: 90%;
}

.tfa_btn_answer_conf {
    margin: 20px 42px 0px 0px;
    float: right;
}

</style>