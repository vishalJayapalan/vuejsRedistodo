<template>
  <div class="listPage">
    <nav class="listNav">
      <button class="newListButton">New List</button>
      <div class="buttonGroup">
        <button class="btnGroup">Lists</button>
        <button class="btnGroup">Scheduled</button>
        <button class="btnGroup">Today</button>
      </div>
      <button>Search</button>
    </nav>
    <input class="newListInput" type="text" placeholder="Please Enter New List Name" />
    <div class="listContainer">
      <div class="individualList" v-for="list of lists" :key="list.listId">
        <div :id="list.listId" class="tasksInside" @click="openTask"></div>
        <p>{{list.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: Array,
    openTask: Function
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
}
.tasksInside {
  margin: 20px;
  width: 150px;
  height: 150px;
  background-color: honeydew;
}
</style>