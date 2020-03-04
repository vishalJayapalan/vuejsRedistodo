<template>
  <div class="listContainer">
    <div class="individualList" v-for="list of lists" :key="list.listId">
      <div :id="list.listId">
        <div class="tasksInside" @click="openTask($event)"></div>
        <i class="fas fa-archive" @click="deleteList($event)"></i>

        <p class="listName" v-if="inputToggle" @click="inputToggler(list.listId)">{{list.listName}}</p>
        <input
          type="text"
          v-model.lazy="list.listName"
          @keyup.enter="updateList($event,list.listName)"
          v-if="!inputToggle && selectedKey === list.listId"
        />
      </div>
    </div>
  </div>
</template>

<script></script>