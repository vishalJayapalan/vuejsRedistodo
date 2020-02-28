<template>
  <div id="app">
    <List
      v-if="inList"
      :lists="lists"
      :openTask="openTask"
      :updated="updated"
      :createListBtn="createListBtn"
      :createList="createList"
      :deleteList="deleteList"
      :updateList="updateList"
    />
    <Task
      :tasks="tasks"
      :back="back"
      :updated="updated"
      :createTask="createTask"
      :listId="listId"
      :deleteTask="deleteTask"
      :updateTask="updateTask"
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
      inList: true,
      listCount: 0,
      lists: [],
      tasks: [],
      updated: "",
      taskCount: 0
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
    getLists() {
      window
        .fetch("http://localhost:3000/list", { method: "get" })
        .then(response => response.json())
        .then(jsonData => {
          this.lists = jsonData.lists;
        });
    },
    createListBtn() {
      let input = document.querySelector(".newListInput");
      input.style.display = "block";
    },
    createList(updated) {
      if (updated) {
        window
          .fetch("http://localhost:3000/list/", {
            method: "POST",
            body: JSON.stringify({ listName: updated }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
          .then(jsonData => {
            this.listCount = jsonData.listId;
            this.lists.push({ listId: jsonData.listCount, listName: updated });
          });
      }
      let input = document.querySelector(".newListInput");
      input.style.display = "none";
    },
    deleteList(event) {
      // console.log(event.target);
      const listId = event.target.parentNode.id;
      this.lists = this.lists.filter(a => a.listId != listId);
      window
        .fetch(`http://localhost:3000/list/${listId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => console.log(response.json()));
      const deleteElement = event.target.parentNode.parentNode;
      deleteElement.parentNode.removeChild(deleteElement);
    },
    updateList(event) {
      console.log(event);
      //   const listId=0;
      //   const listName=0;
      //   window
      //     .fetch(`http://localhost:3000/list/${listId}/`, {
      //       method: "PUT",
      //       body:{listName:  listName  },
      //       headers: {
      //         "Content-Type": "application/json"
      //       }
      //     })
      //     .then(response => console.log(response.json()))
    },
    back() {
      this.inList = true;
      this.getLists();
      console.log(this.lists);
      this.tasks = [];
    },
    openTask(event) {
      const listId = event.target.parentNode.id;
      this.listId = listId;
      this.inList = false;
      window
        .fetch(`http://localhost:3000/tasks/${listId}/task`, {
          method: "get"
        })
        .then(response => response.json())
        .then(jsonData => {
          this.taskCount = jsonData.taskCount;
          this.tasks = jsonData.tasks;
        });
      this.lists = [];
    },
    displayTaskFeatures() {},
    createTask(listId, tname) {
      window
        .fetch(`http://localhost:3000/tasks/${listId}/task`, {
          method: "POST",
          body: JSON.stringify({ tname: tname }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(jsonData => {
          this.tasks.push({
            taskId: jsonData.task.tid,
            tname: jsonData.task.tname,
            checked: false,
            priority: 0,
            date: false,
            notes: ""
          });
        });
    },
    deleteTask(event, listId) {
      const taskId = event.target.parentNode.id;
      this.tasks = this.tasks.filter(a => a.taskId != taskId);
      window.fetch(`http://localhost:3000/tasks/${listId}/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      // .then(response => console.log(response.json()));
      const deleteElement = event.target.parentNode.parentNode;
      deleteElement.parentNode.removeChild(deleteElement);
    },
    updateTask(event, listId) {
      console.log(this.tasks.length, "length");
      console.log(this.tasks[0], "tasks");
      console.log(event);
      const taskId = event.target.parentNode.id;
      console.log(this.tasks);
      console.log(listId);
      window.fetch(`http://localhost:3000/tasks/${listId}/task/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ tasks: this.tasks }),
        headers: {
          "Content-Type": "application/json"
        }
      });
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
}
</style>
