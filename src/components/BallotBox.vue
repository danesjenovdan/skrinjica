<template>
  <div class="ballot-box">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6" :xs="{span:24,offset:0}">
            <p class="intro">Blabla intro tekst blabla. Blabla intro tekst blabla. Blabla intro tekst blabla. Blabla intro tekst blabla. Blabla intro tekst blabla. Blabla intro tekst blabla.</p>
          </el-col>
        </el-row>
        <el-row style="text-align:center; padding-bottom: 40px;">
          <el-button type="primary" @click.native="addSuggestion">Dodaj predlog</el-button>
        </el-row>
        <el-row>
          <el-col
            :span="16"
            :offset="4"
            :xs="{span:24,offset:0}"
            v-for="suggestion in suggestions.filter(suggestion => editors.indexOf(suggestion.dbId) !== -1)"
            :key="suggestion.dbId"
          >
            <suggestion
              :problem="suggestion.problem"
              :solution="suggestion.solution"
              :target="suggestion.target"
              :goal="suggestion.goal"
              :channels="suggestion.channels"
              :phases="suggestion.phases"
              :help="suggestion.help"
              :editing="editors.indexOf(suggestion.dbId) !== -1"
              :dbId="suggestion.dbId"
              :title="suggestion.title"
              :admin="admin"
              @saveme="onSave(suggestion.dbId)"
              @editme="editors.push(suggestion.dbId)"
              @deleteme="onDelete(suggestion.dbId)"
            ></suggestion>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="10"
            :offset="(i % 2 == 0) ? 1 : 2"
            :xs="{span:24,offset:0}"
            v-for="(suggestion, i) in suggestions.filter(suggestion => editors.indexOf(suggestion.dbId) === -1)"
            :key="suggestion.dbId"
          >
            <suggestion
              :problem="suggestion.problem"
              :solution="suggestion.solution"
              :target="suggestion.target"
              :goal="suggestion.goal"
              :channels="suggestion.channels"
              :phases="suggestion.phases"
              :help="suggestion.help"
              :editing="editors.indexOf(suggestion.dbId) !== -1"
              :dbId="suggestion.dbId"
              :title="suggestion.title"
              :admin="admin"
              @saveme="onSave(suggestion.dbId)"
              @editme="editors.push(suggestion.dbId)"
              @deleteme="onDelete(suggestion.dbId)"
            ></suggestion>
          </el-col>
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
      editors: [],
      admin: false,
    };
  },

  mounted() {
    this.db = firebase.firestore();

    this.refreshSuggestions(false);

    this.editors = this.$ls.get('editors', '').split(',');

    if (document.location.href.indexOf('admin') !== -1) {
      this.admin = true;
    }
  },

  methods: {
    addSuggestion() {
      const ref = this.getRandomString();
      this.editors.push(ref);
      this.$ls.set('editors', this.editors);
      this.db.collection('suggestions').doc(ref).set({
        problem: '',
        solution: '',
        target: '',
        goal: '',
        channels: '',
        phases: '',
        help: '',
        title: '',
      }).then(() => {
        this.refreshSuggestions(true);
      });
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

    onSave(dbId) {
      this.editors.splice(this.editors.indexOf(dbId), 1);
      this.$ls.set('editors', this.editors);
      this.refreshSuggestions(true);
    },

    onDelete(dbId) {
      this.editors.splice(this.editors.indexOf(dbId), 1);
      this.$ls.set('editors', this.editors);
      this.refreshSuggestions(true);
    },

    getRandomString() {
      return Math.random().toString(36).substring(7);
    },
  },
};
</script>

<style lang="scss" scoped>
  .intro {
    font-size: 24px;
  }
</style>
