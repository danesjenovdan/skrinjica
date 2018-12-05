<template>
  <div class="ballot-box">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4" :xs="{span:24,offset:0}">
            <suggestion
              v-for="suggestion in suggestions"
              :key="suggestion.dbId"
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
        <el-row style="text-align:center">
          <el-button type="primary" @click.native="addSuggestion">Dodaj predlog</el-button>
        </el-row>
      </el-main>
    </el-container>
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
    },
  },
};
</script>
