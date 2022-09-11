<template>
    <HeaderComponent/>
    <div class="alert alert-success alert-dismissible fade show" v-if="isSuccess" role="alert">
        <p class="l_message">翻訳に成功しました。</p>
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
    <div class="loading" v-show="isProcessing()">
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary loading_spinner" role="status">
                <span class="sr-only">Connecting...</span>
            </div>
        </div>
    </div>
    <div class="si_search_area">
        <h2 class="title bold">■単語検索</h2>
        <SearchFromComponent
            :languages="languages"
            @changedFromLanguage="setLanguageData($event)"
            @ApiWordTranslation="ApiWordTranslation($event)"
            ref="searchFrom"/>
        <SearchToComponent
            :languages="languages"
            ref="searchTo"/>
    </div>
    <div class="si_list_area">
        <h2 class="title bold">■検索履歴</h2>
        <SearchHistorySortComponent
            @sortTranslationHistory="sortTranslationHistory($event)"/>
        <SearchHistoryTableComponent
            ref="historyTable"/>
    </div>
</template>

<script>

// 部品取得
import HeaderComponent from '../common/HeaderComponent.vue';
import SearchFromComponent from './SearchFromComponent.vue';
import SearchToComponent from './SearchToComponent.vue';
import SearchHistorySortComponent from './SearchHistorySortComponent.vue';
import SearchHistoryTableComponent from './SearchHistoryTableComponent.vue';
// 共通処理
import Common from '../../common.js';
import {
    LANGUAGE_ID,
    LANGUAGE_DATA_INDEX,
    API_URL,
    TRANSLATTOR_TEXT_API_HEADER
 } from '../../const.js';

export default {

    data() {
        return {
            languages: {},
            selectedFromLanguageData: {},
            selectedToLanguageData: {},
            searchWord: '',
            translationWord: '',
            sortType: 'CREATED_AT_DESC',
            isSuccess: false,
            isError: false,

        }
    },
    mounted() {
        var self = this;
        // 翻訳画面の初期データを取得
        axios.get(
            API_URL.DICTIONARY + localStorage.getItem("loginUserId")
        )
        .then(function(res) {
            // 翻訳履歴をテーブルにセットする
            self.$refs.historyTable.setTranslationHistories(res.data.translationHistories);

            // 検索言語と翻訳言語の初期値をセットする
            self.languages = res.data.langages;
            self.selectedFromLanguageData = self.languages[LANGUAGE_DATA_INDEX.JAPANESE]
            self.selectedToLanguageData = self.languages[LANGUAGE_DATA_INDEX.ENGLISH]
            self.$refs.searchFrom.setFromLanguageSelection(self.selectedFromLanguageData.name);
            self.$refs.searchTo.setToLanguageSelection(self.selectedToLanguageData.name);
        });
    },
    mixins: [Common],
    components: {
        HeaderComponent,
        SearchFromComponent,
        SearchToComponent,
        SearchHistorySortComponent,
        SearchHistoryTableComponent
    },
    methods: {

        /**
         * 言語データをセットする
         *
         * @param {string} lamguageId
         * @return {void}
         */
        setLanguageData(data) {
            // 検索言語をセット
            this.selectedFromLanguageData = data;
            // 翻訳言語データをセット
            this.setToLanguageData(data.id);
            // 翻訳言語の選択肢をセットする
            this.$refs.searchTo.setToLanguageSelection(this.selectedToLanguageData.name);
        },

        /**
         * 翻訳言語データをセットする
         *
         * @param {string} lamguageId
         * @return {void}
         */
        setToLanguageData(lamguageId) {
            switch (lamguageId) {
                // 日本語を選択した場合は英語をセット
                case LANGUAGE_ID.JAPANESE :
                    this.selectedToLanguageData = this.languages[LANGUAGE_DATA_INDEX.ENGLISH];
                    break;

                // 英語を選択した場合は日本語をセット
                case LANGUAGE_ID.ENGLISH :
                    this.selectedToLanguageData = this.languages[LANGUAGE_DATA_INDEX.JAPANESE];
                    break;

                // デフォルトは英語でセット
                default :
                    this.selectedToLanguageData = this.languages[LANGUAGE_DATA_INDEX.ENGLISH];
                    break;
            }
        },

        /**
         * 検索したい単語を翻訳する
         *
         * @param {string} searchWord
         * @return {void}
         */
        ApiWordTranslation(searchWord) {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }

            // 処理を開始する
            var self = this;
            this.searchWord = searchWord;
            this.isSuccess = false;
            this.isError = false;
            this.startProcessing()

            // Translator Text APIで翻訳処理を実行する
            axios.post(
                self.getRequestUrlFormation(),
                self.getTransmissionData(searchWord),
                {headers: TRANSLATTOR_TEXT_API_HEADER}
            )
            .then(function(res) {
                // 翻訳結果をセットする
                self.translationWord = res.data[0].translations[0].text;
                self.$refs.searchTo.setTranslationWord(self.translationWord);

                // 翻訳履歴を登録する
                self.addTranslationHistory();
            })
            .catch(function(res) {
                self.isError = true;
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * Translator Text APIに投げるパラメータをセットして返す
         *
         * @return {string}
         */
        getRequestUrlFormation() {
            // ベースURL
            var requestUrl = API_URL.TRANSLATTOR_TEXT;
            // 検索する言語を設定
            requestUrl += '&from=' + this.selectedFromLanguageData.code;
            // 翻訳する言語を設定
            requestUrl += '&to=' + this.selectedToLanguageData.code;

            return requestUrl;
        },

        /**
         * Translator Text APIに送るデータを取得
         *
         * @param {string} searchWord
         * @return {object}
         */
        getTransmissionData(searchWord) {
            return [{"Text": searchWord}];
        },

        /**
         * 翻訳履歴を登録
         *
         * @return {void}
         */
        addTranslationHistory() {
            var self = this;

            // 翻訳履歴登録処理
            axios.post(
                API_URL.DICTIONARY,
                self.getTranslationHistoryData()
            )
            .then(function(res) {
                // 翻訳履歴テーブルに一覧を表示する
                self.$refs.historyTable.reloadTranslationHistoryList(self.sortType);
                self.isSuccess = true;
                // 処理を終了する
                self.endProcessing();
            })
            .catch(function(res) {
                self.isError = true;
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * 翻訳履歴を登録するデータ取得
         *
         * @return {object}
         */
        getTranslationHistoryData() {
            return {
                user_id: localStorage.getItem("loginUserId"),
                from_language_id: parseInt(this.selectedFromLanguageData.id),
                to_language_id: parseInt(this.selectedToLanguageData.id),
                from_word: this.searchWord,
                to_word: this.translationWord,
            }
        },

        /**
         * 翻訳履歴をソートする
         *
         * @param {string} selectionSort
         */
        sortTranslationHistory(selectionSort) {
            this.sortType = selectionSort.selectionSort;
            this.$refs.historyTable.reloadTranslationHistoryList(selectionSort.selectionSort);
        }
    }
}

</script>

<style lang="scss">

.si_search_area {
    width: 100%;
    height: 250px;
    padding: 50px;
}
.si_list_area {
    width: 100%;
    height: auto;
    padding: 50px;

    h2 {
        display: inline-block;
    }
}

</style>