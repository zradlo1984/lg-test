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
      contestCorrect: 0,
      contestQuestionPoints: 0,
      contestQuestions: 0,
      contestRounds: 1,
      questionWrong: 0,
      questionRound: 1,
      questionRoundLimit: 2,

      limitAllRound: 1,
      limitRepeatAllErrors: 0,
      limitRepeatWrongQuestion: 4,
      limitRepeatCorrectQuestion: 2,
      limitShowCorrectAnswer: 3,

      correct: undefined,
    }},


  methods: {
    reset() {
      this.questions = shuffleArray([...this.selectedQuestions])
      this.errors = []
      this.contestQuestionPoints = 0
      this.contestCorrect = 0
      this.contestRounds = 1
      this.questionRound = 1
      this.questionWrong = 0
      this.questionRoundLimit = 2
      this.limitRepeatCorrectQuestion = 2
    },
    onCorrect() {
      console.log(this.actualQuestion.question + ' correct')
      if(!this.showAnswer && this.questionRound==1) {
        this.contestCorrect+=this.questionWrong===0?2:1
        this.contestQuestionPoints+=this.questionWrong===0?2:0
      }
      this.correct = 1
      setTimeout(this.onCorrectTimeout, 300);
    },
    onCorrectTimeout() {
      this.correct = undefined
      this.goNext()
    },
    onWrong() {
      console.log(this.actualQuestion.question + ' wrong')
      this.contestQuestionPoints+=this.questionWrong===0?2:0
      this.questionWrong+=1
      this.questionRoundLimit = this.limitRepeatWrongQuestion
      this.errors.push(this.actualQuestion)
      this.correct = 2
      setTimeout(this.onWrongTimeout, 1000);
    },
    onWrongTimeout() {
      this.correct = undefined
    },
    goNext() {
      if(this.questionRound>=this.questionRoundLimit) {
        this.questions.shift()
        this.questionRound=0
        this.contestQuestions+=1
        this.questionRoundLimit = this.limitRepeatCorrectQuestion
      }
      this.questionRound+=1
      this.questionWrong=0
      if(this.actualQuestion === undefined) {
        this.questionRoundLimit = this.limitRepeatCorrectQuestion
        this.questionRound=1
        if(this.contestRounds < this.limitAllRound)
          this.questions = shuffleArray([...this.selectedQuestions])
        else {
          this.limitRepeatCorrectQuestion = this.limitRepeatWrongQuestion
          this.questionRoundLimit = this.limitRepeatCorrectQuestion
          this.questions = shuffleArray([...new Set(this.errors)])
          if(this.contestRounds >= this.limitRepeatAllErrors + this.limitAllRound)
            this.errors = []
        }
        this.contestRounds+=this.questions.length==0?0:1
      }
    },
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
        return this.contestQuestionPoints==0?0: (100*this.contestCorrect/this.contestQuestionPoints).toFixed(2)
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
        return this.questionWrong >= this.limitShowCorrectAnswer
      }
    },
  },
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
      return this.contestQuestionPoints==0?0: (100*this.contestCorrect/this.contestQuestionPoints).toFixed(2)
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
      return this.questionWrong >= this.limitShowCorrectAnswer
    },
    contestKey() {
      return 'cr' + this.contestRounds + 'q' + this.contestQuestions + 'qr' + this.questionRound
    }
  },
}
</script>


<template>
  <div class="modal correct" v-if="correct == 1"><div>√</div></div>
  <div class="modal wrong"   v-if="correct == 2"><div>x</div></div>
  <Result :grade="grade" :grade-gym="gradeGym" v-if="actualQuestionComponent === undefined" @click="reset"/>
  <div class="score">{{ contestCorrect }}/{{ contestQuestionPoints }} {{ score }}% &rarr; {{ grade }} <sub class="small">{{ contestRounds }}/{{ nextQuestions?.length || 0 }}</sub></div>
  <component :is="actualQuestionComponent"
             :data="actualQuestion"
             :selectedQuestions="selectedQuestions"
             :showAnswer="showAnswer"
             :key="contestKey"
             v-if="actualQuestionComponent !== undefined"
             @correct="onCorrect()"
             @wrong="onWrong()"
  ></component>
  <div class="q-wrong" v-for="i in questionWrong">x</div>
  <div class="q-next" v-if="nextQuestions !== undefined">
    <span v-for="q in nextQuestions">{{q.question}}</span>
  </div>
</template>


<style scoped lang="scss">
.modal {
  border: 1px solid red;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.modal div {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-weight: bold;
  -webkit-text-stroke: 3px black;
  font-size: 500%;
}

.modal.wrong {
  background-color: rgba(255, 0, 0, 0.2);
  color: red;
}

.modal.correct {
  background-color: rgba(0, 64, 0, 0.2);
  color: darkgreen;
  font-size: 300%;
}

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
