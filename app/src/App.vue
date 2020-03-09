<template>
  <div id="app">
    <List
      v-if="inList"
      :openTask="openTask"
      :lists="lists"
      :createList="createList"
      :deleteList="deleteList"
    />
    <Task
      :tasks="tasks"
      :back="back"
      :createTask="createTask"
      :listId="listId"
      :listName="listName"
      :deleteTask="deleteTask"
      :clearCompletedTasks="clearCompletedTasks"
      v-else
    />
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
      listId: 0,
      listName: "",
      inList: true,
      lists: [],
      tasks: []
    };
  },
  async mounted() {
    const data = await fetch("http://localhost:3000/list", { method: "get" });
    const jsonData = await data.json();
    this.lists = jsonData.lists;
    this.searchLists = this.lists.slice();
  },
  methods: {
    async createList(updated) {
      if (updated) {
        let response = await window.fetch("http://localhost:3000/list/", {
          method: "POST",
          body: JSON.stringify({ listName: updated }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const jsonData = await response.json();
        this.listId = jsonData.listId;
        this.lists.push({
          listId: jsonData.listId,
          listName: updated,
          inputToggle: true
        });
      }
    },
    deleteList(listId) {
      this.lists = this.lists.filter(a => a.listId != listId);
      window.fetch(`http://localhost:3000/list/${listId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    back() {
      this.inList = true;
      this.tasks = [];
    },
    async openTask(listId, listName) {
      this.listId = listId;
      this.listName = listName;
      this.inList = false;
      const response = await window.fetch(
        `http://localhost:3000/tasks/${listId}/task`,
        {
          method: "get"
        }
      );
      const jsonData = await response.json();

      this.tasks = jsonData.tasks;
    },
    async createTask(listId, tname) {
      const response = await window.fetch(
        `http://localhost:3000/tasks/${listId}/task`,
        {
          method: "POST",
          body: JSON.stringify({ tname: tname }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const jsonData = await response.json();
      this.tasks.push({
        taskId: jsonData.task.taskId,
        tname: jsonData.task.tname,
        checked: false,
        priority: 0,
        date: false,
        notes: ""
      });
    },
    deleteTask(taskId, listId) {
      this.tasks = this.tasks.filter(a => a.taskId != taskId);
      window.fetch(`http://localhost:3000/tasks/${listId}/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    clearCompletedTasks(listId) {
      this.tasks = this.tasks.filter(a => a.checked != true);
      window.fetch(
        `http://localhost:3000/tasks/${listId}/clearCompletedTasks/`,
        {
          method: "DELETE",
          body: JSON.stringify({ tasks: this.tasks }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
