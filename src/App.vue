<script lang="ts">
import ContestComponent from "./components/contest.vue"
import ContestSelector from "./components/contest-selector.vue"

export default {
  name: 'App',
  components: {
    ContestComponent,
    ContestSelector
  },

  data () {
    return {
      contestQuestions: undefined
  }},
  methods: {
    onStart(selectedQuestions) {
      this.contestQuestions = selectedQuestions
      console.log(selectedQuestions)
    }
  }

}
</script>


<template>
  <ContestSelector  v-if="!contestQuestions?.length" @start="onStart"/>
  <ContestComponent v-if="contestQuestions?.length" :selectedQuestions="contestQuestions"/>
</template>


<style scoped lang="scss">
</style>
