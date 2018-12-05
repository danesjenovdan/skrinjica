<template>
  <div class="ballot-box">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="12" v-for="suggestion in suggestions" :key="suggestion.dbId">
            <suggestion
              :problem="suggestion.problem"
              :solution="suggestion.solution"
              :target="suggestion.target"
              :goal="suggestion.goal"
              :channels="suggestion.channels"
              :phases="suggestion.phases"
              :help="suggestion.help"
              :editing="suggestion.editing"
              :dbId="suggestion.dbId"
            ></suggestion>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <button @click="addSuggestion">Add suggestion</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import Suggestion from './Suggestion.vue';

export default {
  name: 'BallotBox',
  components: {
    Suggestion,
  },
  data() {
    return {
      db: null,
      suggestions: [],
    };
  },

  mounted() {
    this.db = firebase.firestore();

    this.refreshSuggestions(false);
    // this.db.collection('suggestions');
  },

  methods: {
    addSuggestion() {
      this.db.collection('suggestions').doc().set({
        problem: '',
        solution: '',
        target: '',
        goal: '',
        channels: '',
        phases: '',
        help: '',
        editing: true,
      }).then(() => {
        this.refreshSuggestions(true);
      });
      console.log('add suggestion');
    },
    refreshSuggestions(clear) {
      if (clear) {
        this.suggestions = [];
      }

      this.db.collection('suggestions').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          const toPush = item.data();
          toPush.dbId = item.id;
          this.suggestions.push(toPush);
        });
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .ballot-box {
    width: 100%;
  }
</style>
