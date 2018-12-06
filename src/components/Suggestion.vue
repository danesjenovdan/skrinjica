<template>
  <div class="suggestion">
    <form v-if="editing">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-title">{{ title === '' ? `Predlog ${dbId}` : `${title}` }}</span>
        </div>
        <el-row>
          <el-col :span="22" :offset="1">
            <h4>Ime predloga:</h4>
            <el-input
              type="input"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="title"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="1">
            <h4>Opiši družbeni problem, ki ga projekt naslavlja:</h4>
            <p>Komu se godi krivica? Kaj je narobe? Zakaj je narobe?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="problem"
            >
            </el-input>
          </el-col>
          <el-col :span="11" :offset="1">
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
          <el-col :span="11" :offset="1">
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
          <el-col :span="11" :offset="1">
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
          <el-col :span="11" :offset="1">
            <h4>Kateri komunikacijske kanale bi uporabili?</h4>
            <p>Spletna stran? Družbena omrežja? Offline?</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="channels"
            >
            </el-input>
          </el-col>
          <el-col :span="11" :offset="1">
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
            <h4>Kako vidiš svojo vlogo v projektu?</h4>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 5}"
              placeholder="Piši sem ..."
              v-model="help"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:center;margin-top:2rem;">
            <el-button
              type="success"
              @click.native="saveSuggestion"
            >Shrani</el-button>
          </el-col>
        </el-row>
      </el-card>
    </form>
    <div v-else>
      <el-card class="locked">
        <div slot="header" class="clearfix">
          <span class="card-title">{{ title === '' ? `Predlog ${dbId}` : `${title}` }}</span>
        </div>
        <h4>Opiši družbeni problem, ki ga projekt naslavlja:</h4>
        <p class="pre-line" v-text="problem"></p>
        <h4>Opiši predlagani projekt v nekaj stavkih:</h4>
        <p class="pre-line" v-text="solution"></p>
        <h4>Kdo je ciljna skupina?</h4>
        <p class="pre-line" v-text="target"></p>
        <h4>Kaj je akcijski cilj projekta?</h4>
        <p class="pre-line" v-text="goal"></p>
        <h4>Kateri komunikacijske kanale bi uporabili?</h4>
        <p class="pre-line" v-text="channels"></p>
        <h4>Oriši faze oziroma časovnico projekta:</h4>
        <p class="pre-line" v-text="phases"></p>
        <h4>Kako vidiš svojo vlogo v projektu?</h4>
        <p class="pre-line" v-text="help"></p>
        <el-row>
          <el-col style="text-align:center;margin-top:2rem;">
            <el-button
              type="warning"
              @click.native="$emit('editme')"
            >Uredi</el-button>
            <el-button
              v-if="admin"
              type="error"
              @click.native="deleteSuggestion"
            >Izbriši</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <br>
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
      default: false,
    },
    dbId: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    admin: {
      type: Boolean,
      default: false,
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
        title: this.title,
      });

      this.$emit('saveme');
    },

    deleteSuggestion() {
      firebase.firestore().collection('suggestions').doc(this.dbId).delete()
        .then(() => {
          this.$emit('deleteme');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .suggestion {
    width: 100%;

    .card-title {
      font-size: 24px;
      font-weight: bold;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    p {
      margin-top: 0;
    }

    .pre-line {
      white-space: pre-line;
    }

    form {
      width: 100%;

      .el-col {
        margin-bottom: 2rem;
      }

      textarea {
        width: 100%;
      }
    }

    .locked {
      h4 {
        color: #502525a8;
        font-size: 14px;
      }
      p {
        font-size: 18px;
      }
    }
  }
</style>
