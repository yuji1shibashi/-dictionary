<template>
    <div class="st_search_to_area">
        <select class="form-control w50 m_bottom10" v-model="selectedToLanguage" disabled>
            <option v-for="language in languages"
                :key="language.id"
                :data-id="language.id"
                :data-code="language.code"
            >{{ language.name }}</option>
        </select>
        <input type="text" class="form-control w100" v-model="translationWord" placeholder="翻訳結果が表示されます" readonly>
    </div>
</template>

<script>

export default {
    data() {
        return {
            selectedToLanguage: '',
            translationWord: ''
        }
    },
    props: {
        'languages': {
            default: {}
        }
    },
    methods: {

        /**
         * 翻訳言語を選択
         *
         * @param {string} language
         * @return {void}
         */
        setToLanguageSelection(language) {
            this.selectedToLanguage = language;
        },

        /**
         * 翻訳結果をセット
         *
         * @param {string} translationWord
         * @return {void}
         */
        setTranslationWord(translationWord) {
            this.translationWord = translationWord;
        }
    }
}
</script>

<style lang="scss">

.st_search_to_area {
    width: 40vw;
    display: inline-block;
    float: right;
}

</style>