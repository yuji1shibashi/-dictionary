<template>
    <HeaderComponent/>
    <div class="loading" v-show="isProcessing()">
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary loading_spinner" role="status">
                <span class="sr-only">Connecting...</span>
            </div>
        </div>
    </div>
    <div class="alert alert-success alert-dismissible fade show" v-if="isSuccess" role="alert">
        <p class="l_message">暗記テストが終了しました。再度挑戦する場合は「リセット」をして「テスト開始」を押下してください。</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="alert alert-warning alert-dismissible fade show" v-if="isUnQuestions" role="alert">
        <p class="l_message">出題できる問題がありません。「リセット」をして設定を変更後「テスト開始」を押下してください。</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="alert alert-danger alert-dismissible fade show" v-if="isError" role="alert">
        <p class="l_message">エラーが発生しました。時間をおいてお試しください。</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="test_top_area">
        <div class="mi_setting_area">
            <h2 class="title bold">■出題設定</h2>
            <TestSettingComponent
                :languages="languages"
                @reset="reset()"
                @getTranslationQuestionList="getTranslationQuestionList($event)"
                ref="setting"
            />
        </div>
        <div class="mi_result_area">
            <h2 class="title bold">■現在の回答</h2>
            <TestResultComponent
                ref="result"
            />
        </div>
    </div>
    <div class="mi_answer_area">
        <h2 class="title bold">■暗記テスト</h2>
        <div>
            <div class="mi_form_answer_area">
                <TestFromAnswerComponent
                    @displayAnswer="displayAnswer()"
                    ref="fromAnswer"
                />
            </div>
            <div class="mi_to_answer_area">
                <TestToAnswerComponent
                @changeMemory="changeMemory($event)"
                    ref="toAnswer"
                />
            </div>
        </div>
        <div class="mi_btn_next">
            <TestNextQuestionComponent
                @nextQuestion="nextQuestion()"
                @finish="finish()"
                ref="nextQuestion"
            />
        </div>
    </div>
</template>

<script>

// 部品取得
import HeaderComponent from '../common/HeaderComponent.vue';
import TestSettingComponent from './TestSettingComponent.vue';
import TestResultComponent from './TestResultComponent.vue';
import TestFromAnswerComponent from './TestFromAnswerComponent.vue';
import TestToAnswerComponent from './TestToAnswerComponent.vue';
import TestNextQuestionComponent from './TestNextQuestionComponent.vue';
// 共通処理
import Common from '../../common.js';
import { API_URL, LANGUAGE_ID, LANGUAGE_DATA_INDEX } from '../../const.js';

export default {
    data() {
        return {
            languages: {},
            selectedLanguageData: {},
            TranslationQuestionList: [],
            totalQuestionNum: 0,
            currentQuestionNum: 0,
            isTestStart: false,
            isSuccess: false,
            isError: false,
            isUnQuestions: false
        }
    },
    mounted() {
        var self = this;
        // 翻訳画面の初期データを取得
        axios.get(
           API_URL.MEMORIZATION + localStorage.getItem("loginUserId")
        )
        .then(function(res) {
            self.languages = res.data.langages;
            // 検索言語と翻訳言語の初期値をセットする
            self.selectedLanguageData = self.languages[LANGUAGE_DATA_INDEX.JAPANESE]
            self.$refs.setting.setSelectedLanguage(self.selectedLanguageData.id);
        });
    },
    mixins: [Common],
    components: {
        HeaderComponent,
        TestSettingComponent,
        TestResultComponent,
        TestFromAnswerComponent,
        TestToAnswerComponent,
        TestNextQuestionComponent
    },
    methods: {

        /**
         * 翻訳テスト一覧取得
         *
         * @param {object} data
         * @return {void}
         */
        getTranslationQuestionList(data) {
            var self = this;
            this.isError = false;
            this.startProcessing()

            // 翻訳暗記テストデータ取得
            axios.get(
                API_URL.SHOW_MEMORIZATION + this.getApiParam(data)
            )
            .then(function(res) {
                // 1件も出題できる問題がない場合
                if (res.data.length === 0) {
                    // 処理を終了する
                    self.isUnQuestions = true;
                    self.endProcessing()
                    return;
                }

                // 必要なデータをセットする
                self.TranslationQuestionList = res.data;
                self.totalQuestionNum = res.data.length;

                // 検索ワードと現在の質問Noをセット
                self.$refs.fromAnswer.setFromAnswer(
                    String(self.currentQuestionNum + 1),
                    self.TranslationQuestionList[self.currentQuestionNum].from_word
                );
                // 翻訳ワードとIDをセット
                self.$refs.toAnswer.setToAnswer(
                    self.TranslationQuestionList[self.currentQuestionNum].id,
                    self.TranslationQuestionList[self.currentQuestionNum].to_word
                );
                // 処理を終了する
                self.endProcessing()
            })
            .catch(function(res) {
                self.isError = true;
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * パラメータを取得
         *
         * @param {object} data
         * @return {string}
         */
        getApiParam(data) {
            var param = '';
            param += localStorage.getItem("loginUserId");
            param += '?languageId=' + data.selectedLanguage
            param += '&questionType=' + data.selectedQuestionType
            return param;
        },

        /**
         * データをリセット
         *
         * @return {void}
         */
        reset() {
            this.selectedLanguageData = {};
            this.TranslationQuestionList = [];
            this.totalQuestionNum = 0;
            this.currentQuestionNum = 0;
            this.isTestStart = false;
            this.isSuccess = false;
            this.isError = false;
            this.isUnQuestions = false;
            this.$refs.result.resetResult();
            this.$refs.fromAnswer.resetFromAnswer();
            this.$refs.toAnswer.resetToAnswer();
            this.$refs.nextQuestion.resetNextQuestion();
        },

        /**
         * 回答を表示
         *
         * @return {void}
         */
        displayAnswer() {
            this.$refs.toAnswer.displayAnswer();
        },

        /**
         * 暗記情報を変更
         *
         * @return {void}
         */
        changeMemory(isMemory) {
            // 暗記情報をセット
            this.$refs.result.setResult(
                this.currentQuestionNum,
                this.totalQuestionNum,
                isMemory
            );
            // 「次へ」ボタンを表示
            this.$refs.nextQuestion.displayNextQuestion(this.totalQuestionNum)
        },

        /**
         * 次の問題を準備
         *
         * @return {void}
         */
        nextQuestion() {
            // 現在の質問Noを加算
            ++this.currentQuestionNum;

            // そう問題数を超える場合は処理を抜ける
            if (this.currentQuestionNum > this.totalQuestionNum) {
                return;
            }
            // 質問と回答をリセットする
            this.$refs.fromAnswer.resetFromAnswer();
            this.$refs.toAnswer.resetToAnswer();

            // 次の質問をセット
            this.$refs.fromAnswer.setFromAnswer(
                String(this.currentQuestionNum + 1),
                this.TranslationQuestionList[this.currentQuestionNum].from_word
            );
            // 次の回答をセット
            this.$refs.toAnswer.setToAnswer(
                this.TranslationQuestionList[this.currentQuestionNum].id,
                this.TranslationQuestionList[this.currentQuestionNum].to_word
            );
        },

        /**
         * テスト終了処理
         *
         * @return {void}
         */
        finish() {
            this.isSuccess = true;
            this.$refs.toAnswer.finish();
        }
    }
}

</script>

<style lang="scss">

.test_top_area {
    width: 100%;
    padding: 50px;
}

.mi_setting_area {
    width: 40%;
    height: auto;
    padding: 0px 15px 0px 0px;
    display: inline-block;
}

.mi_result_area {
    width: 60%;
    height: auto;
    padding: 0px 15px 0px 100px;
    display: inline-block;
    vertical-align: top;
}

.mi_answer_area {
    width: 100%;
    height: 250px;
    padding: 0px 50px;
}

.mi_form_answer_area {
    width: 50%;
    display: inline-block;
    vertical-align: top;
    padding: 0px 50px 0px 0px;

}

.mi_to_answer_area {
    width: 50%;
    display: inline-block;
    padding: 37px 0px 0px 50px;
}

.mi_btn_next {
    text-align: center;
    margin-top: 30px;
}

</style>