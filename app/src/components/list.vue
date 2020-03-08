<template>
  <div class="listPage">
    <nav class="listNav">
      <button class="newListButton" @click="inputToggle=!inputToggle">New List</button>
      <!-- <div class="buttonGroup">
        <button class="btnGroup">Lists</button>
        <button class="btnGroup">Scheduled</button>
        <button class="btnGroup">Today</button>
      </div>-->
      <button @click="[searchToggle=!searchToggle]">Search</button>
    </nav>
    <input
      class="newListInput"
      type="text"
      v-if="inputToggle"
      placeholder="Please Enter New List Name"
      v-model="updated"
      @keyup.enter="[createList(updated),updated='',inputToggle=!inputToggle]"
      @blur="[updated='',inputToggle = false]"
    />
    <input
      class="searchInput"
      type="text"
      v-if="searchToggle"
      placeholder="Please Enter list name"
      v-model="searchItem"
      @blur="[searchItem='',searchToggle=!searchToggle]"
    />
    <div class="listContainer">
      <div class="individualList" v-for="list of searchList" :key="list.listId">
        <individualList
          :list="list"
          :deleteList="deleteList"
          :updateList="updateList"
          @open-task="$emit('open-task',list.listId,list.listName)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import individualList from "./individualList";
export default {
  name: "list",
  components: {
    individualList
  },
  data() {
    return {
      updated: "",
      searchItem: "",
      searchToggle: false,
      inputToggle: false
    };
  },
  props: {
    lists: Array,
    createList: Function,
    deleteList: Function
  },
  computed: {
    searchList() {
      if (this.searchItem.length) {
        return this.lists.filter(list =>
          list.listName.toLowerCase().startsWith(this.searchItem.toLowerCase())
        );
      }
      return this.lists.slice();
    }
  },
  methods: {
    updateList(listId, listName) {
      window.fetch(`http://localhost:3000/list/${listId}/`, {
        method: "PUT",
        body: JSON.stringify({ listName: listName }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }
};
</script>

<style>
.created {
  display: none;
}
.listNav {
  height: 30px;
  display: flex;
  background-color: black;
  justify-content: space-between;
}
.newListInput {
  margin-top: 10px;
  margin-left: 25%;
  width: 50%;
}
.searchInput {
  margin-top: 10px;
  margin-left: 25%;
  width: 50%;
}
.btnGroup {
  height: 30px;
}
.listContainer {
  display: flex;
  flex-wrap: wrap;
}
.tasksInside {
  margin: 20px;
  width: 150px;
  height: 150px;
  background-color: honeydew;
}
.listName {
  display: inline-block;
}
</style>