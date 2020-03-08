<template>
  <div :id="list.listId">
    <div class="tasksInside" @click="$emit('open-task',list.listId)"></div>
    <i class="fas fa-archive" @click="deleteList(list.listId)"></i>
    <p
      class="listName"
      v-if="list.inputToggle"
      @click="list.inputToggle = !list.inputToggle"
    >{{list.listName}}</p>
    <input
      class="nameInput"
      type="text"
      v-model="list.listName"
      @keyup.enter="[updateList(list.listId,list.listName),list.inputToggle = !list.inputToggle]"
      @blur="list.inputToggle = true"
      v-else
    />
  </div>
</template>

<script>
export default {
  name: "individualList",
  props: {
    list: Object,
    deleteList: Function,
    updateList: Function
  }
};
</script>

<style>
.nameInput {
  background-color: lightslategray;
}
</style>