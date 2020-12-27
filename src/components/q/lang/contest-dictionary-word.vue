<script lang="ts">
import {ContestDictionaryWord} from "../../../types/lang-contest-types"
import {getArrayIndex, getStringArray, shuffleArray} from "../../../utils/helpers";

function getAnswers(allQuestions: ContestDictionaryWord[], q:ContestDictionaryWord):string[] {

  function getQA(index:number, i:number):string|string[] {
    const chidx = getArrayIndex(index, i, allQuestions.length)
    if(allQuestions[chidx].type !== "ContestDictionaryWord")
      return []
    else
      return getStringArray(allQuestions[chidx].answer).concat(getStringArray(allQuestions[chidx].choices))
  }

  let answers = [...getStringArray(q.answer)]
  let choices = []
  const index = allQuestions.indexOf(q);
  let i =0
  while(i < 10) {
    i+=1
    choices = [...new Set(choices.concat(getStringArray(getQA(index, i)), getStringArray(getQA(index, -i))))].filter(v=>answers.indexOf(v)<0)
  }
  let result = [shuffleArray(answers)[0], ...shuffleArray(choices)].slice(0,6)
  return shuffleArray(result)
}

export default {
  name: 'ContestDictionaryWord',
  emits: ['correct','wrong'],
  props: ['data','selectedQuestions','showAnswer'],
  computed: {
    q():ContestDictionaryWord {return this.data as ContestDictionaryWord},
    answers() {return getStringArray(this.q.answer)},
    choices() {return getAnswers(this.selectedQuestions, this.data)}
  },
  methods: {
    correctClass(ch:string) {
      if(this.showAnswer) {
        return this.answers.indexOf(ch)>=0 ? "correct":""
      }
      return ""
    }
  }
}
</script>

<template>
  <div class="q-task">Translate</div>
  <div class="q-q">{{q.question}}</div>
  <div class="q-a"><div v-for="ch in choices" :class="correctClass(ch)" @click="$emit(answers.indexOf(ch)>=0?'correct':'wrong')">{{ ch }}</div></div>
</template>

<style scoped lang="scss">
.q-task {
  background: #fee;
  border: 1px solid red;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  padding: 15px;
  margin: 2px 0;
}

.q-q {
  @extend .q-task;
  background: #ffe;
  font-weight: bolder;
}

.q-a {
  @extend .q-task;
  background: #eef;
  font-weight: bolder;
  padding-top: 10px;
}
.q-a div {
  display: block;
  border: 1px solid blue;
  margin-top: 5px;
  padding: 10px;
  border-radius: 15px;
}

.q-a .correct {
  background: darkgreen;
  color: white;
  font-weight: bold;
  border: 1px solid darkgreen;
}
</style>