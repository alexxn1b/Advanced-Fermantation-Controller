<template>
  <div class="home">
    <div class="row">
      <div class="col-1">&nbsp;</div>
      <div class="col-4">
        Fermenter temp: {{data.system.temp1}}&#x2103; <br/>
        Room temp: {{data.system.temp2}}&#x2103;
      </div>
      <div class="col-4">Target temp: {{data.system.target}}&#x2103;</div>
      <div v-show="data.system.heat" class="col-2">Heat on</div>
      <div v-show="data.system.cold" class="col-2">Cold on</div>
      <div class="col-1">&nbsp;</div>
    </div>
    <b-button variant="primary" v-show="data.system.status==0" v-on:click="$router.push('sp')">Set program</b-button>
    <b-button variant="danger" v-show="data.system.status==1" v-on:click="alert('stop program')">Stop</b-button>
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
  system: {
    status: 0, // 0 stopped, 1 running
    temp1: 0,
    temp2: 0,
    target: 0,
    sg: 0,
    heat: false,
    cold: false
  },
  errors: []
}
export default {
  name: 'Home',
  data () {
    return {
      data: data
    }
  },
  methods: {
    loadData: function () {
      console.log('load invoked')
      this.axios.get('/api/data')
        .then(response => {
          // JSON responses are automatically parsed.
          this.data.system = response.data
          this.data.errors = []
        })
        .catch(e => {
          console.log(e)
          this.data.system.errors.push(e)
        })
    },
    navigateTo: function (nav) {
      // Do what you want here.
      // this.saveTheThing()
      this.$router.push({
        path: nav
      })
    }
  },
  created: function () {
    console.log('ready....')
    this.loadData()

    setInterval(function () {
      this.loadData()
    }.bind(this), 5000)
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
