<template>
  <div class="taskPage">
    <nav class="taskNav">
      <button class="backToListButton" @click="back">Back</button>
      <button @click="clearCompletedTasks(listId)">ClearCompleted</button>
    </nav>
    {{listName}}
    <div class="taskContainer">
      <input
        :listId="listId"
        type="text"
        class="taskInput"
        placeholder="Enter New Task Name"
        v-model="updated"
        @keydown.enter="[createTask(listId,updated) , updated='']"
      />
      <div class="individualTask" v-for="task in tasks" :key="task.taskId">
        <individualTask
          :task="task"
          @update-task="$emit('update-task',task.taskId,listId)"
          @delete-task="$emit('delete-task',task.taskId,listId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import individualTask from "./individualTask";
export default {
  name: "task",
  components: {
    individualTask
  },
  props: {
    tasks: Array,
    back: Function,
    updated: String,
    createTask: Function,
    listId: String,
    listName: String,
    deleteTask: Function,
    updateTask: Function,
    clearCompletedTasks: Function
  }
};
</script>

<style>
.taskNav {
  display: flex;
  justify-content: space-between;
  background-color: black;
  height: 30px;
}
.taskContainer {
}
.taskInput {
  margin: 10px;
  width: 50%;
}

.individualTask {
  margin-top: 10px;
  margin-left: 20%;
  width: 60%;
  background-color: honeydew;
  /* background-color: brown; */
}
.task {
  display: flex;
}
.checkBox {
  margin: 2.5%;
}
.done {
  text-decoration: line-through;
}
.taskName {
  margin: 7.5px 0;
  min-width: 85%;
  max-width: 85%;
  overflow: hidden;
}
.hr {
  border: 2px solid yellow;
}
.c3 {
  border: 2px solid red;
}
.c2 {
  border: 2px solid darkorange;
}
.c1 {
  border: 2px solid green;
}
.taskFeatures {
  display: grid;
  margin: 20px;
  padding-bottom: 20px;
  grid-column-gap: 20px;
  background-color: honeydew;
}
.noShow {
  display: none;
}
.fas {
  margin-top: 2.5%;
}
.fas:hover {
  font-size: 150%;
}
.notes {
  grid-column: 1/2;
  grid-row: 1/2;
}
.dueDate {
  grid-column: 2/3;
  grid-row: 1/2;
}
.textNotes {
  grid-column: 1/2;
  grid-row: 2/10;
  resize: none;
}
.date {
  grid-column: 2/3;
  grid-row: 2/3;
}
.priority {
  grid-row: 3/4;
  grid-column: 2/3;
}
.prioritySelect {
  grid-row: 4/5;
  grid-column: 2/3;
}
.dltBtn {
  grid-row: 9/10;
  grid-column: 2/3;
  background-color: red;
  color: white;
  justify-self: center;
  margin: 10px;
}
</style>