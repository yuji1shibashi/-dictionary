<template>
    <table class="sh_search_history_table">
        <thead>
            <tr>
                <th class="w10">検索言語</th>
                <th class="w25">検索ワード</th>
                <th class="w10">翻訳言語</th>
                <th class="w25">翻訳ワード</th>
                <th class="w10">翻訳日</th>
                <th class="w10 text_c">暗記</th>
                <th class="w10 text_c">削除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(history, index) in translationHistories" :key="history.id">
                <td>{{ history.from_language }}</td>
                <td>{{ history.from_word }}</td>
                <td>{{ history.to_language }}</td>
                <td>{{ history.to_word }}</td>
                <td>{{ history.created_at }}</td>
                <td class="text_c checkbox">
                    <input type="checkbox"
                        v-on:click="onMemorization(history.id, $event.target.checked)"
                        :checked="history.is_memory === parseInt(isMemory.TRUE)"
                    >
                </td>
                <td class="text_c">
                    <input type="button" class="btn btn-danger"
                        v-on:click="onDelete(history.id, index)"
                        value="削除"
                    >
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

// 共通処理
import Common from '../../common.js';
import { IS_MEMORY, API_URL } from '../../const.js';

export default {
    data() {
        return {
            isMemory: IS_MEMORY,
            translationHistories: {}
        }
    },
    mixins: [Common],
    methods: {

        /**
         * 翻訳履歴をセット
         *
         * @param {object} translationHistories
         * @return {void}
         */
        setTranslationHistories(translationHistories) {
            this.translationHistories = translationHistories;
        },

        /**
         * 翻訳履歴一覧をリロード
         *
         * @param {string} sortKey
         * @return {void}
         */
        reloadTranslationHistoryList(sortKey) {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }

            // 処理を開始する
            var self = this;
            this.startProcessing();

            // 翻訳画面の初期データを取得
            axios.get(
                API_URL.SHOW_DICTIONARY + localStorage.getItem("loginUserId") + '?sortType=' + sortKey
            )
            .then(function(res) {
                self.setTranslationHistories(res.data);
                // 処理を終了する
                self.endProcessing();
            })
            .catch(function(res) {
                alert('エラーが発生しました。');
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * 翻訳履歴削除
         *
         * @param {number} historyId
         * @param {number} index
         * @return {void}
         */
        onDelete(historyId, index) {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }

            // 削除するかどうかチェック
            if (!window.confirm('対象の翻訳履歴を削除してもよろしいですか？')) {
                return;
            }

            // 処理を開始する
            var self = this;
            this.startProcessing();

            // 翻訳履歴削除
            axios.delete(
                API_URL.DICTIONARY + historyId
            )
            .then(function(res) {
                // テーブル上から削除
                self.translationHistories.splice(index, 1);
                // 処理を終了する
                self.endProcessing();
            })
            .catch(function(res) {
                alert('エラーが発生しました。');
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * 翻訳暗記更新処理
         *
         * @param {number} historyId
         * @param {boorean} isMemory
         * @return {void}
         */
        onMemorization(historyId, isMemory) {

            // 処理を実行中かをチェック
            if (this.isProcessing()) {
                return;
            }

            // 処理を開始する
            var self = this;
            this.startProcessing();

            // 翻訳暗記更新処理
            axios.put(
                API_URL.DICTIONARY + historyId,
                {historyId: historyId, isMemory: isMemory}
            )
            .then(function(res) {
                // 処理を終了する
                self.endProcessing();
            })
            .catch(function(res) {
                alert('エラーが発生しました。');
                // 処理を終了する
                self.endProcessing();
            });
        }
    }
}
</script>


<style lang="scss">

.sh_search_history_table {
    width: 100%;

    tr {
        border-bottom: solid 1px #929292
    }

    tbody tr:nth-child(even){
        background-color: #eaf1ff;
    }

    thead tr {
        background-color: #00335f;
        color: #fff;
    }

    th, td {
        height: 50px;
        padding-left: 20px;
        font-size: 16px;
        line-height: 16px;
    }
}

</style>