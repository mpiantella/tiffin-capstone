<template>
  <div class="tasks">
    <h1>Task Manager</h1>
    <button @click="createUser()" class="taskButton">Create User</button>
  </div>
</template>

<script>
import CreateUser from '../appsync/mutations/CreateUser'
export default {
  name: 'Tasks',
  methods: {
    createUser() {

      console.log('call apollo mutate')
      this.$apollo.mutate({
        mutation: CreateUser
      })
      .then(data => console.log(data))
      .catch(error => console.error("error!!!: ", error))
    },
  },
  data () {
    return {
      taskname: '',
      tasks: []
    }
  },
  // apollo: {
  //   tasks: {
  //     query: () => ListTasks,
  //     update: data => data.listTasks.items
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.taskButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #2196F3;
  border: none;
  color: white;
  outline: none;
}
.input {
  width: 100%;
  padding: 8px;
  font-size: 18px;
  border: none;
  border-bottom: 2px solid #2196F3;
  outline: none;
}
.button {
  cursor: pointer;
}
.button:hover {
  opacity: 0.5
}
.text {
  margin-top: 4px;
  margin-bottom: 0px;
}
.delete {
  color: #2196F3;
}
.task {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  padding-top: 8px;
  padding-bottom: 9px;
}
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
