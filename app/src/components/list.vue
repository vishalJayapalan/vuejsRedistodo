<template>
  <div class="listPage">
    <nav class="listNav">
      <button class="newListButton" @click="createListBtn">New List</button>
      <div class="buttonGroup">
        <button class="btnGroup">Lists</button>
        <button class="btnGroup">Scheduled</button>
        <button class="btnGroup">Today</button>
      </div>
      <button @click="searchListBtn">Search</button>
    </nav>
    <input
      class="newListInput"
      type="text"
      placeholder="Please Enter New List Name"
      v-model="updated"
      @keyup.enter="createList(updated)"
    />
    <input
      class="searchInput"
      type="text"
      placeholder="Please Enter list name"
      v-model="searchItem"
      @keyup="searchList(searchItem)"
    />
    <div class="listContainer">
      <div class="individualList" v-for="list of lists" :key="list.listId">
        <individualList
          :list="list"
          @delete-list="$emit('delete-list',list.listId)"
          @open-task="$emit('open-task',list.listId)"
          @update-list="$emit('update-list',list.listId,list.listName)"
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
  props: {
    lists: Array,
    createList: Function,
    updated: String,
    searchItem: String,
    createListBtn: Function,
    searchListBtn: Function,
    searchList: Function,
    inputToggle: Boolean,
    inputToggleFunction: Function
  }
};
</script>

<style>
.listNav {
  height: 30px;
  display: flex;
  background-color: black;
  justify-content: space-between;
}
.newListInput {
  display: none;
  margin-top: 10px;
  margin-left: 25%;
  width: 50%;
}
.searchInput {
  display: none;
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