<template>
  <div id="app">
    <List
      v-if="inList"
      @delete-list="deleteList"
      @update-list="updateList"
      @open-task="openTask"
      :lists="lists"
      :updated="updated"
      :createListBtn="createListBtn"
      :createList="createList"
      :searchListBtn="searchListBtn"
      :searchList="searchList"
      :searchItem="searchItem"
    />
    <Task
      :tasks="tasks"
      :back="back"
      :updated="updated"
      :createTask="createTask"
      :listId="listId"
      :listName="listName"
      :clearCompletedTasks="clearCompletedTasks"
      @delete-task="deleteTask"
      @update-task="updateTask"
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
      inputToggle: true,
      inList: true,
      listCount: 0,
      lists: [],
      searchLists: [],
      tasks: [],
      updated: "",
      taskCount: 0,
      searchItem: ""
    };
  },
  async created() {
    let data = await fetch("http://localhost:3000/list", { method: "get" });
    let jsonData = await data.json();
    this.lists = jsonData.lists;
    this.searchLists = this.lists.slice();
  },
  methods: {
    createListBtn() {
      let input = document.querySelector(".newListInput");
      if (input.style.display === "none") input.style.display = "block";
      else input.style.display = "none";
    },
    searchListBtn() {
      this.searchItem = "";
      let search = document.querySelector(".searchInput");
      if (search.style.display === "none") search.style.display = "block";
      else search.style.display = "none";
    },
    async searchList(searchItem) {
      this.lists = this.searchLists.slice();
      this.searchItem = searchItem;
      if (searchItem) {
        // let ids = [];
        let list = this.lists.filter(list =>
          list.listName.toLowerCase().startsWith(searchItem.toLowerCase())
        );
        // .map(id => id.listId);
        console.log(list);
        this.lists = list;
        // let response = await window.fetch("http://localhost:3000/list/", {
        //   method: "get",
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // });
        // const jsonData = await response.json();
        // this.listId = jsonData.listId;
        // this.lists.push({
        //   listId: jsonData.listId,
        //   listName: updated,
        //   inputToggle: true
        // });
      }
    },
    async createList(updated) {
      this.lists = this.searchLists.slice();
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
        this.searchLists = this.lists.slice();
      }
      let input = document.querySelector(".newListInput");
      input.style.display = "none";
    },
    inputToggleFunction() {
      this.inputToggle = !this.inputToggle;
    },
    deleteList(listId) {
      this.lists = this.searchLists.slice();
      this.lists = this.lists.filter(a => a.listId != listId);
      this.searchLists = this.lists.slice();
      window.fetch(`http://localhost:3000/list/${listId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const deleteElement = event.target.parentNode.parentNode;
      deleteElement.parentNode.removeChild(deleteElement);
    },
    updateList(listId, listName) {
      this.lists = this.searchLists.slice();
      this.searchLists = this.lists.slice();
      window.fetch(`http://localhost:3000/list/${listId}/`, {
        method: "PUT",
        body: JSON.stringify({ listName: listName }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      for (const list of this.lists) {
        list.inputToggle = true;
      }
    },
    back() {
      this.inList = true;
      this.tasks = [];
    },
    openTask(listId) {
      this.lists = this.searchLists.slice();
      this.listId = listId;
      for (const list of this.lists) {
        if (list.listId === listId) {
          this.listName = list.listName;
          break;
        }
      }
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
      window.fetch(`http://localhost:3000/tasks/${listId}/task/taskId`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const deleteElement = event.target.parentNode.parentNode;
      deleteElement.parentNode.removeChild(deleteElement);
    },
    updateTask(taskId, listId) {
      // prioritySorting
      let array = this.tasks;
      array.sort((a, b) => {
        a = a.priority;
        b = b.priority;
        return a > b ? -1 : a < b ? 1 : 0;
      });
      // dateSorting
      array.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        const c = new Date(false);
        if (a.getTime() === c.getTime() && b.getTime() !== c.getTime()) {
          return 1;
        }
        if (b.getTime() === c.getTime() && a.getTime() !== c.getTime()) {
          return -1;
        }
        if (b.getTime() === new Date(false) && a.getTime() === c.getTime()) {
          return 0;
        }
        return a < b ? -1 : a < b ? 1 : 0;
      });

      // doneSorting
      array.sort((a, b) => {
        a = a.checked;
        b = b.checked;
        if (a === b) return 0;
        if (a === false) return -1;
        if (b === false) return 1;
      });
      // after editing tasks
      window.fetch(`http://localhost:3000/tasks/${listId}/task/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ tasks: this.tasks }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    clearCompletedTasks(listId) {
      console.log(this.tasks);
      this.tasks = this.tasks.filter(a => a.checked != true);
      console.log(this.tasks);
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
