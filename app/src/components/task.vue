<template>
  <div class="taskPage">
    <nav class="taskNav">
      <button class="backToListButton" @click="back">Back</button>
      <button>ClearCompleted</button>
    </nav>
    <div class="taskContainer">
      <input
        type="text"
        class="taskInput"
        placeholder="Enter New Task Name"
        v-model="newName"
        @keydown.enter="createTask"
      />
      <div class="individualTask" v-for="task in tasks" :key="task.taskName">
        <div class="task" :id="task.taskId">
          <input type="checkbox" class="checkBox" />
          <p class="taskName">{{task.tname}}</p>
          <i class="fas fa-angle-down"></i>
        </div>
        <hr class="hr" :id="task.taskId" />
        <div class="taskFeatures" :id="task.taskId">
          <p class="notes">Notes</p>
          <p class="dueDate">Due Date</p>
          <textarea class="textNotes" cols="30" rows="10"></textarea>
          <input type="date" class="date" />
          <p class="priority">priority</p>
          <select name="priority" class="prioritySelect" id>
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
          <button class="dltBtn">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: Array,
    back: Function,
    newName: String
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
.taskName {
  margin: 7.5px 0;
  min-width: 85%;
  max-width: 85%;
  overflow: hidden;
}
.hr {
  border: 1px solid yellow;
}
.taskFeatures {
  display: grid;
  margin: 20px;
  padding-bottom: 20px;
  grid-column-gap: 20px;
  background-color: honeydew;
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