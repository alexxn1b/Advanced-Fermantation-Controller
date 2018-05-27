<template>
  <div class="selectProgram">
    <div class="row">
      <div class="col-6">
        <label class="form-label">
          Manual Target Temperature:
          <input v-model="data.programs.target" class="form-control">
        </label>
      </div>
      <div class="col-2">
        <b-button variant="primary" v-on:click="alert('vai a programmare...')">Set this target</b-button>
      </div>
    </div>

    <div class="container" v-if="data.programs && data.programs.schedules && data.programs.schedules.length">
      <div class="row" v-for="schedule of data.programs.schedules" v-bind:key="schedule.id">
        <div class="col-2">{{schedule.id}}</div>
        <div class="col-2">{{schedule.name}}</div>
        <div class="col-2">{{scheduleType(schedule)}}</div>
        <div class="col-2">
          <b-button variant="danger" v-on:click="$router.push({ path: 'ep', query: { id: schedule.id }})">Edit</b-button>
        </div>
        <div class="col-2">
        <b-button variant="primary" :disabled="schedule.name === ''" v-on:click="alert('vai a programmare...')">Select</b-button>
        </div>
      </div>
    </div>

    <b-button variant="danger" v-on:click="$router.go(-1)">Cancel</b-button>
    <!-- If ERRORS -->
    <ul v-if="data.errors && data.errors.length">
      <li v-for="error of data.errors" v-bind:key="error.message">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
var data = {
  programs: {
  },
  errors: []
}
export default {
  name: 'SelectProgram',
  data () {
    return {
      data: data
    }
  },
  methods: {
    scheduleType: function (item) {
      if (item.type === 0) {
        return 'Linear'
      } else {
        return 'Bands'
      }
    },
    loadData: function () {
      console.log('load invoked')
      this.axios.get('/api/programs')
        .then(response => {
          // JSON responses are automatically parsed.
          this.data.programs = response.data
          this.data.errors = []
        })
        .catch(e => {
          console.log(e)
          this.data.system.errors.push(e)
        })
    }
  },
  created: function () {
    console.log('ready....')
    this.loadData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
