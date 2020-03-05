<template>
  <div :id="list.listId">
    <div class="tasksInside" @click="$emit('open-task',list.listId)"></div>
    <i class="fas fa-archive" @click="$emit('delete-list',list.listId)"></i>
    <p
      class="listName"
      v-if="list.inputToggle"
      @click="list.inputToggle = !list.inputToggle"
    >{{list.listName}}</p>
    <input
      type="text"
      v-model.lazy="list.listName"
      @keyup.enter="$emit('update-list',list.listId,list.listName)"
      v-else
    />
  </div>
</template>

<script>
export default {
  name: "individualList",
  props: {
    list: Object
  }
};
</script>