<template>
  <div class="suggestion">
    <form v-if="editing">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Predlog {{ dbId }}</span>
          <el-button style="float: right; padding: 3px 0" @click.native="saveSuggestion">Shrani</el-button>
        </div>
        <el-row>
          <el-col :span="10" :offset="1">
            <h4>Opiši družbeni problem, na katerega se projekt naslavlja:</h4>
            <p>Komu se godi krivica? Kaj je narobe? Zakaj je narobe?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="problem"
            >
            </el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <h4>Opiši predlagani projekt v nekaj stavkih:</h4>
            <p>Kako bi projekt / kampanja naslovila in opozorila na predstavljen problem? Kaj je zgodba, ki jo povemo? Kaj je twist / inovativen pristop / viralni faktor, ki bo pritegnil pozornost?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="solution"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <h4>Kdo je ciljna skupina?</h4>
            <p>Splošna javnost? Mediji? Odločevalci? Specifična demografska skupina?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="target"
            >
            </el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <h4>Kaj je akcijski cilj projekta?</h4>
            <p>Kaj želiš, da posameznik naredi, ko se seznani s projektom? Podpiše peticijo? Pošlje mail odločevalcem? Shara objavo? Vabi prijatelje? ...</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="goal"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <h4>Kateri komunikacijski kanali bi se uporabili?</h4>
            <p>Spletna stran? Družbena omrežja? Offline?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="channels"
            >
            </el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <h4>Oriši faze oziroma časovnico projekta:</h4>
            <p>Ima projekt več faz? Kako si sledijo in kaj se zgodi kje?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="phases"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <h4>Kako lahko pomagaš?</h4>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="help"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </form>
        <div v-else>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Suggestion',
  data() {
    return {
    };
  },

  props: {
    problem: {
      type: String,
    },
    solution: {
      type: String,
    },
    target: {
      type: String,
    },
    goal: {
      type: String,
    },
    channels: {
      type: String,
    },
    phases: {
      type: String,
    },
    help: {
      type: String,
    },
    editing: {
      type: Boolean,
    },
    dbId: {
      type: String,
    },
  },

  mounted() {
    // this.db = firebase.firestore();

    // this.db.collection('suggestions');
  },

  methods: {
    saveSuggestion() {
      firebase.firestore().collection('suggestions').doc(this.dbId).set({
        problem: this.problem,
        solution: this.solution,
        target: this.target,
        goal: this.goal,
        channels: this.channels,
        phases: this.phases,
        help: this.help,
        editing: false,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .suggestion {
    width: 100%;

    form {
      width: 100%;

      textarea {
        width: 100%;
      }
    }
  }
</style>
