<template>
    <div class="sf_search_from_area">
        <select id="fromLanguage" class="form-control w50 m_bottom10" v-model="selectedFromLanguage" @change="changedFromLanguage($event)">
            <option v-for="language in languages"
                :key="language.id"
                :data-id="language.id"
                :data-code="language.code"
            >{{ language.name }}</option>
        </select>
        <input type="text" class="form-control w100" placeholder="翻訳したい単語を入力してください" v-model="searchWord" @blur="blurSearchWordBox()">
        <span class="sf_font_size_11">※テキストボックスからカーソルが外れると翻訳を開始します。</span>
    </div>
</template>

<script>

export default {
    data() {
        return {
            selectedFromLanguage: '',
            searchWord: ''
        }
    },
    props: {
        'languages': {
            default: {}
        }
    },
    methods: {

        /**
         * 検索言語が変更された場合の処理
         *
         * @param {object} params
         * @return {void}
         */
        changedFromLanguage: function(params) {
            // 親コンポーネントにID、言語コード、言語名を返す
            this.$emit('changedFromLanguage',
                {
                    id: params.target.options[params.target.selectedIndex].getAttribute('data-id'),
                    code: params.target.options[params.target.selectedIndex].getAttribute('data-code'),
                    language: params.target.value
                }
            );
        },

        /**
         * 検索言語を選択
         *
         * @param {string} language
         * @return {void}
         */
        setFromLanguageSelection(language) {
            this.selectedFromLanguage = language;
        },

        /**
         * 検索ワードボックスからカーソルが外れた際の処理
         *
         * @return {void}
         */
        blurSearchWordBox() {
            // 検索ワードが空ではない場合は検索処理を実行
            if (this.searchWord !== '') {
                this.$emit('ApiWordTranslation', this.searchWord);
            }
        }
    }
}

</script>

<style lang="scss">

.sf_search_from_area {
    width: 40vw;
    display: inline-block;
}

.sf_font_size_11 {
    font-size: 11px;
}

</style>