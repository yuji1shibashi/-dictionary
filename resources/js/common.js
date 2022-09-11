export default {
    data() {
        return {
            processing: false,
            loginUserName: '',
            loginUserId: 0
        }
    },
    methods: {

        /**
         * 処理開始
         *
         * @return {void}
         */
        startProcessing() {
            this.processing = true
        },

        /**
         * 処理終了
         *
         * @return {void}
         */
        endProcessing() {
            this.processing = false
        },

        /**
         * 処理中かチェック
         *
         * @return {boolean}}
         */
        isProcessing() {
            return this.processing
        },
    }
}