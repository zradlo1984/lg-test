<script lang="ts">
import ContestDictionaryWordQuestion from "./q/lang/contest-dictionary-word.vue"
import Result from "./result.vue"
import {shuffleArray} from "../utils/helpers";
import {ContestQuestionType} from "../types/contestQuestionType";

export default {
  name: 'Contest',
  props: ['selectedQuestions'],
  components: {
    ContestDictionaryWordQuestion,
    Result
  },

  data () {
    return {
      questions: shuffleArray([...this.selectedQuestions]),
      errors: [],
      correct: 0,
      answers: 0,
      rounds: 1,
      wrong: 0
    }},

  computed: {
    actualQuestion():ContestQuestionType {
      return this.questions.length>0? this.questions[0]:undefined
    },
    nextQuestions():ContestQuestionType {
      return this.questions.length>0? this.questions.slice(1):undefined
    },
    actualQuestionComponent() {
      return this.questions.length>0? this.questions[0].type + "Question":undefined
    },
    score() {
      return this.answers==0?0: (100*this.correct/this.answers).toFixed(2)
    },
    grade() {
      const score = this.score
      if(score>=90)
        return 1
      if(score>=75)
        return 2
      if(score>=50)
        return 3
      if(score>=25)
        return 4
      return 5
    },
    gradeGym() {
      const score = this.score
      if(score>=90)
        return 1
      if(score>=75)
        return 2
      if(score>=55)
        return 3
      if(score>=40)
        return 4
      return 5
    },
    showAnswer() {
      return this.wrong >= 3
    }
  },

  methods: {
    onCorrect() {
      console.log(this.actualQuestion.question + ' correct')
      if(!this.showAnswer) {
        this.correct+=this.wrong===0?2:1
        this.answers+=this.wrong===0?2:0
      }
      this.goNext()
    },
    onWrong() {
      console.log(this.actualQuestion.question + ' wrong')
      this.answers+=this.wrong===0?2:0
      this.wrong+=1
      this.errors.push(this.actualQuestion)
    },
    goNext() {
      this.questions.shift()
      this.wrong=0
      if(this.actualQuestion === undefined) {
        this.rounds+=1
        if(this.rounds < 3)
          this.questions = shuffleArray([...this.selectedQuestions])
        else {
          this.questions = shuffleArray([...new Set(this.errors)])
          if(this.rounds >= 5)
            this.errors = []
        }
      }
    },
    reset() {
      this.questions = shuffleArray([...this.selectedQuestions])
      this.errors = []
      this.answers = 0
      this.correct = 0
      this.rounds = 0
    }
  }
}
</script>


<template>
  <Result :grade="grade" :grade-gym="gradeGym" v-if="actualQuestionComponent === undefined" @click="reset"/>
  <div class="score">{{correct}}/{{answers}} {{score}}% &rarr; {{grade}} <sub class="small">{{rounds}}/{{nextQuestions?.length||0}}</sub></div>
  <component :is="actualQuestionComponent"
             :data="actualQuestion"
             :contestQuestions="selectedQuestions"
             :showAnswer="showAnswer"
             v-if="actualQuestionComponent !== undefined"
             @correct="onCorrect()"
             @wrong="onWrong()"
  ></component>
  <div class="q-wrong" v-for="i in wrong">x</div>
  <div class="q-next" v-if="nextQuestions !== undefined">
    <span v-for="q in nextQuestions">{{q.question}}</span>
  </div>
</template>


<style scoped lang="scss">
.score {
  text-align: center;
  color: gray;
}
.small {
  font-size: 50%;
}
.q-wrong {
  float: left;
  color: red;
  border-radius: 15px;
  border: 1px solid red;
  margin-left: 5px;
  padding: 2px 4px 5px;
  line-height: 12px;
}
.q-next {
  max-width: 50%;
  margin-left: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}
.q-next:before {
  content:'';
  position:absolute;
  width: 100%;
  height: 30px;
  background: linear-gradient( to right, transparent, white);
}
.q-next span:first-of-type {
  padding-left: 0;
}
.q-next span {
  padding: 0 10px;
  font-weight: lighter;
}
</style>
