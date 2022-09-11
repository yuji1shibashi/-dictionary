<template>
    <select class="form-control shs_sort"
        v-model="selectionSort"
        @change="selectedSort()"
    >
        <option v-for="(sort, index) in sorts" :value="index" :key="index">{{ sort }}</option>
    </select>
</template>

<script>

import { DICTIONARY_SORTS } from '../../const.js';

export default {
    data() {
        return {
            sorts: DICTIONARY_SORTS,
            selectionSort: 'CREATED_AT_DESC'
        }
    },
    methods: {
        selectedSort() {
            this.$emit('sortTranslationHistory',{selectionSort: this.selectionSort});
        }
    }
}
</script>

<style lang="scss">

.shs_sort {
    float: right;
    width: 30vw;
    display: inline-block;
}

</style>