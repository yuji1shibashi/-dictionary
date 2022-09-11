<template>
    <label>回答：</label>
    <input type="text" class="form-control tta_to_answer_form" v-model="toAnswer" readonly>
    <p class="tta_comment">※暗記ができていれば〇、苦手だと感じたら×を押してください。</p>
    <div class="tta_btn_area">
        <label for="maru" class="btn tta_btn_memory"
            :class="{ 'btn-primary': checkMemory, 'btn-outline-primary': !checkMemory }"
            v-show="openAnswer"
        >〇</label>
        <input type="radio" id="maru" class="tta_btn_memory" value='1'
            :disabled="!openAnswer"
            v-model="isMemory"
            @change="changeMemory()"
        >
        <label for="batsu" class="btn tta_btn_memory"
            :class="{ 'btn-danger': checkUnMemory , 'btn-outline-danger': !checkUnMemory }"
            v-show="openAnswer"
        >×</label>
        <input type="radio" id="batsu" class="tta_btn_memory" value='0'
            :disabled="!openAnswer"
            v-model="isMemory"
            @change="changeMemory()"
        >
    </div>
</template>

<script>


// 共通処理
import Common from '../../common.js';
import { API_URL, IS_MEMORY } from '../../const.js';

export default {
    data() {
        return {
            isMemory: null,
            checkMemory: false,
            checkUnMemory: false,
            openAnswer: false,
            toAnswer: '',
            waitAnswer: '',
            currentHistoryId: 0,
        }
    },
    mixins: [Common],
    methods: {

        /**
         * 回答をセットする
         *
         * @param {number} historyId
         * @param {string} toAnswer
         * @return {void}
         */
        setToAnswer(historyId, toAnswer) {
            this.openAnswer = false;
            this.currentHistoryId = historyId;
            this.waitAnswer = toAnswer;
        },

        /**
         * リセット処理
         *
         * @return {void}
         */
        resetToAnswer() {
            this.waitAnswer = '';
            this.toAnswer = '';
            this.checkMemory = false;
            this.checkUnMemory = false;
            this.isMemory = null;
        },

        /**
         * 回答表示
         *
         * @return {void}
         */
        displayAnswer() {
            this.openAnswer = true;
            this.toAnswer = this.waitAnswer;
        },

        /**
         * 暗記状態を変更
         *
         * @return {void}
         */
        changeMemory() {
            // 暗記している場合
            if (this.isMemory === IS_MEMORY.TRUE) {
                this.checkMemory = true;
                this.checkUnMemory = false;

            // 暗記していない場合
            } else {
                this.checkMemory = false;
                this.checkUnMemory = true;
            }
            // 暗記状態を更新する
            this.updateMemory();
        },

        /**
         * 暗記状態を更新
         *
         * @return {void}
         */
        updateMemory() {
            var self = this;
            this.startProcessing()

            axios.put(
                API_URL.DICTIONARY + self.currentHistoryId,
                {historyId: self.currentHistoryId, isMemory: parseInt(self.isMemory)}
            )
            .then(function(res) {
                // 処理を終了する
                self.endProcessing();
                self.$emit('changeMemory', self.isMemory);
            })
            .catch(function(res) {
                alert('エラーが発生しました。');
                // 処理を終了する
                self.endProcessing();
            });
        },

        /**
         * テスト終了の処理
         *
         * @return {void}
         */
        finish() {
            this.openAnswer = false;
        }
    }
}

</script>

<style lang="scss">

.tta_comment {
    font-size: 12px;
    margin: 10px 37px 0px 0px;
    text-align: right;
}

.tta_to_answer_form {
    display: inline-block;
    width: 90%;
}

.tta_btn_area {
    margin: 10px 37px 0px 0px;
    float: right;
}

.tta_btn_memory {
    margin: 10px;
    height: 40px;
    width: 40px;
}

input[type="radio"] {
    display: none;
}


</style>