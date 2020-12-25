<script lang="ts">
export default {
  name: 'Result',
  props: ['grade','gradeGym'],
  computed: {
    gradeClass() {return "grade" + this.grade}
  }
}
</script>

<template>
  <h1 :class="gradeClass">{{grade}}<span class="small">/{{gradeGym}}</span></h1>
</template>

<style lang="scss">
h1 {
  text-align: center;
  font-size: 600%;
  margin-bottom: 0;
  color: gray;
}

.small {
  font-size: 50%;
}

h1.grade1 {color: darkgreen}
h1.grade2 {color: black}
h1.grade3 {color: orange}
h1.grade4 {color: orangered}
h1.grade5 {color: red}

h6 {
  margin: 0;
  text-align: center;
}
</style>