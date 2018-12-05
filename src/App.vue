<template>
  <div id="app">
    <BallotBox />
  </div>
</template>

<script>
import BallotBox from './components/BallotBox.vue';

export default {
  name: 'app',
  components: {
    BallotBox,
  },
};
</script>

<style lang="scss">
body {
  font-family: 'Fira Sans', sans-serif;
}
</style>
