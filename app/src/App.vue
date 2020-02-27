<template>
  <div id="app">
    <List v-if="inList" :lists="lists" :openTask="openTask" />
    <Task :tasks="tasks" :back="back" :newName="newName" v-else />
  </div>
</template>

<script>
import List from "./components/list.vue";
import Task from "./components/task.vue";

export default {
  name: "App",
  components: {
    List,
    Task
  },
  data() {
    return {
      inList: true,
      lists: [],
      tasks: [],
      newName: "",
      taskCount:0,
    };
  },
  mounted() {
    window
      .fetch("http://localhost:3000/list", { method: "get" })
      .then(response => response.json())
      .then(jsonData => {
        this.lists = jsonData.lists;
      });
  },
  methods: {
    createList(){},
    back() {
      this.inList = true;
    },
    openTask(event) {
      this.inList = false;
      const listId = event.target.id;
      window
        .fetch(`http://localhost:3000/tasks/${listId}/task`, {
          method: "get"
        })
        .then(response => response.json())
        .then(jsonData => {
          this.taskCount = jsonData.taskCount;
          this.tasks = jsonData.tasks;
        });
    },
    displayTaskFeatures() {},
    createTask() {
      const listId; // get list id 
      tasks.push({ taskId: taskCount, tname: this.newName });
      window.fetch(`http://localhost:3000/tasks/${listId}/task/`, {
          method: "post"
        }).then(response=>response.json()).then(jsonData=>{
          this.tasks.push({taskId:this.taskCount,tname:newName,"checked":false,"priority":0,"date":false,"notes":""})
        })
        this.taskCount++
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
