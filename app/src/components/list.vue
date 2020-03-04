<template>
  <div class="listPage">
    <nav class="listNav">
      <button class="newListButton" @click="createListBtn">New List</button>
      <div class="buttonGroup">
        <button class="btnGroup">Lists</button>
        <button class="btnGroup">Scheduled</button>
        <button class="btnGroup">Today</button>
      </div>
      <button>Search</button>
    </nav>
    <input
      class="newListInput"
      type="text"
      placeholder="Please Enter New List Name"
      v-model="updated"
      v-on:keyup.enter="createList(updated)"
    />
    <div class="listContainer">
      <div class="individualList" v-for="list of lists" :key="list.listId">
        <div :id="list.listId">
          <div class="tasksInside" @click="openTask($event)"></div>
          <i class="fas fa-archive" @click="deleteList($event)"></i>

          <p class="listName" v-if="inputToggle" @click="inputToggler()">{{list.listName}}</p>
          <input
            type="text"
            v-model="list.listName"
            @keyup.enter="updateList($event,list.listName)"
            v-if="!inputToggle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: Array,
    createList: Function,
    openTask: Function,
    updated: String,
    createListBtn: Function,
    deleteList: Function,
    updateList: Function,
    inputToggle: Boolean,
    inputToggleFunction: Function
  },
  data() {
    return {
      selectedKey: null
    };
  },
  methods: {
    inputToggler() {
      // this.selectedKey = key;
      this.inputToggle = false;
    }
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