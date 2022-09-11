<template>
    <table class="tr_result_table">
        <thead>
            <tr>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Q5</th>
                <th>Q6</th>
                <th>Q7</th>
                <th>Q8</th>
                <th>Q9</th>
                <th>Q10</th>
                <th>暗記率</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="(value, index) in result" :key="index">{{ value }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>

// 共通処理
import Common from '../../common.js';
import { IS_MEMORY, MEMORY_RESULT, INIT_DATA } from '../../const.js';



export default {

    data() {
        return {
            result: INIT_DATA.RESULT
        }
    },
    methods: {

        /**
         * 結果をリセットする
         *
         * @return {void}
         */
        resetResult() {
            this.result = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0%'];
        },

        /**
         * 結果をセット
         *
         * @param {number} currentQuestionNum,
         * @param {number} totalQuestionNum,
         * @param {boolean} isMemory,
         * @return {void}
         */
        setResult(currentQuestionNum, totalQuestionNum, isMemory) {
            this.result[currentQuestionNum] = (isMemory === IS_MEMORY.TRUE) ? MEMORY_RESULT.TRUE : MEMORY_RESULT.FALSE;
            this.result.pop();
            this.result.push(String(Math.round((this.getMemoriesNum() / (currentQuestionNum + 1)) * 100)) + '%');
        },

        /**
         * 結果の〇の数を取得
         *
         * @return {number}
         */
        getMemoriesNum() {
            var count = 0;

            // 結果の数だけループ
            for (var menory of this.result) {
                // 〇の場合は加算
                if (menory === MEMORY_RESULT.TRUE) {
                    count++;
                }
            }
            return count;
        }
    }
}

</script>

<style lang="scss">

.tr_result_table {
    width: 100%;
    border: solid 1px#9a9a9a;

    tr, th, td {
        height: 50px;
        width: 9%;
        border: solid 1px #9a9a9a;
        text-align: center;

        th {
            background-color: #c7c7c7;
        }
    }
}
</style>