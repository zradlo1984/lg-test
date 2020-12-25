<script lang="ts">
import ContestData from "../data/contest-data.ts"
import {ContestQuestionType} from "../types/contestQuestionType.ts"

export default {
  name: "ContestSelector",
  emits: ['start'],
  data() {return {
    contestData: ContestData
  }},
  methods: {
    submit() {
      let selectedQuestions = []
      this.contestData.forEach(book => {
        book.sections.forEach(section => {
          if(section.checked)
            selectedQuestions= selectedQuestions.concat(section.questions)
          else
            section?.subsections?.forEach( subsection => {
              if(subsection.checked)
                selectedQuestions = selectedQuestions.concat(subsection.questions)
            })
        })
      })
      this.$emit("start", selectedQuestions)
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="book in contestData"
          class="foldable" :class="{unfolded: book.unfolded}"
          @click.self="book.unfolded=!book.unfolded"
      >{{book.book}}
          <ul v-if="book.unfolded">
            <li v-for="section in book.sections"
                :class="{foldable: section?.subsections?.length>0, unfolded: section.unfolded}"
                @click.self="section.unfolded=!section.unfolded"
            ><input type="checkbox" v-if="section?.questions?.length" v-model="section.checked" />{{section.section}}
                <ul v-if="section.unfolded">
                  <li v-for="subsection in section.subsections"
                      :class="{disabled: section.checked}"
                   ><input v-if= "section.checked" type="checkbox" checked="checked" :disabled="section.checked"
                  /><input v-if="!section.checked" type="checkbox" v-model="subsection.checked" :disabled="section.checked"
                  />{{subsection.subsection}}
                  </li>
                </ul>
            </li>
          </ul>
      </li>
    </ul>
    <input type="button" @click="submit" value="Start"/>
  </div>
</template>

<style scoped lang="scss">
div {
  border: 1px solid red;
  border-radius: 15px;
  margin: 15px;
  background-color: #fee;
  padding: 5px;
}

ul {
  list-style: none;
}

div > ul {
  padding-inline-start: 0px;
}

div > ul > li > ul {
  padding-inline-start: 20px;
}

li {
  padding: 2px 0px;
}

li.foldable:before {
  display: inline-block;
  margin-left: 3px;
  width: 20px;
  content: '►';
  font-family: "Courier New",Courier,sans-serif;
  transform: scale(0.5, 1);
}

li.foldable.unfolded:before {
  content: '▼';
  font-family: "Courier New",Courier,sans-serif;
  transform: scale(0.6, 0.5) translateX(-3px);
}

li.disabled {
  color: darkgray;
}

input[type=button] {
  background: #efe;
  border: 1px solid red;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  padding: 15px;
  margin: 2px 0;
  width: 100%;
}
</style>