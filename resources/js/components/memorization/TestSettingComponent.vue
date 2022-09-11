<template>
    <div class="ts_setting_area">
        <div class="ts_question">
            <label>出題優先：</label>
            <select class="form-control ts_inline_select"
                v-model="selectedQuestionType"
                :disabled="isTestStart"
            >
                <option v-for="(type, index) in questionTypes" :value="index" :key="index">{{ type }}</option>
            </select>
        </div>
        <div>
            <label>出題言語：</label>
            <select class="form-control ts_inline_select" v-model="selectedLanguage" :disabled="isTestStart">
                <option v-for="language in languages"
                    :key="language.id"
                    :value="language.id"
                >{{ language.name }}</option>
            </select>
        </div>
    </div>
    <div class="ts_btn_area">
        <button type="button" class="btn btn-primary ts_button"
            v-on:click="onTestStart()"
            :disabled="isTestStart"
        >テスト開始</button>
        <button type="button" class="btn btn-secondary ts_button" v-on:click="onReset()">リセット</button>
    </div>
</template>

<script>

// 共通処理
import Common from '../../common.js';
import { LANGUAGE_ID, LANGUAGE_DATA_INDEX, QUESTION_TYPES } from '../../const.js';

export default {
    data() {
        return {
            selectedLanguage: LANGUAGE_ID.JAPANESE,
            questionTypes: QUESTION_TYPES,
            selectedQuestionType: 'RANDOM',
            isTestStart: false
        }
    },
    props: {
        'languages': {
            default: {}
        }
    },
    mixins: [Common],
    methods: {

        /**
         * テスト開始ボタン押下処理
         *
         * @return {void}
         */
        onTestStart() {
            this.isTestStart = true;
            this.$emit('getTranslationQuestionList', {
                selectedLanguage: this.selectedLanguage,
                selectedQuestionType: this.selectedQuestionType
            });
        },

        /**
         * 言語をセット
         *
         * @return {void}
         */
        setSelectedLanguage(selectedLanguage) {
            this.selectedLanguage = selectedLanguage;
        },

        /**
         * リセット押下処理
         *
         * @return {void}
         */
        onReset() {
            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }
            // 言語の初期値「日本語」をセット
            this.selectedLanguage = this.languages[LANGUAGE_DATA_INDEX.JAPANESE].id;
            this.isTestStart = false;
            this.$emit('reset');
        }
    }
}

</script>

<style lang="scss">

.ts_setting_area {
    display: inline-block;
    width: 80%;
}

.ts_btn_area {
    display: inline-block;
    float: right;
}

.ts_button {
    display: block;
    margin: 0px 0px 10px;
    width: 100px;
}

.ts_inline_select {
    display: inline;
    width: 80%;
}

.ts_question {
    margin: 0px 0px 10px;
}

</style>