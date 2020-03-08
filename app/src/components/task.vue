<template>
  <div class="taskPage">
    <nav class="taskNav">
      <button class="backToListButton" @click="back">Back</button>
      <button @click="clearCompletedTasks(listId)">ClearCompleted</button>
    </nav>
    <strong class="listNameInTask">{{listName | upperCase}}</strong>
    <div class="taskContainer">
      <input
        :listId="listId"
        type="text"
        class="taskInput"
        placeholder="Enter New Task Name"
        v-model="updated"
        @keydown.enter="[createTask(listId,updated) , updated='']"
        autofocus
      />
      <div class="individualTask" v-for="task in tasks" :key="task.taskId">
        <individualTask
          :task="task"
          :updateTask="updateTask"
          :deleteTask="deleteTask"
          :listId="listId"
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
  data() {
    return {
      updated: ""
    };
  },
  props: {
    tasks: Array,
    back: Function,
    createTask: Function,
    listId: String,
    listName: String,
    deleteTask: Function,
    clearCompletedTasks: Function
  },
  methods: {
    updateTask(taskId) {
      let array = this.tasks;
      // dateSorting
      array.sort(function(a, b) {
        a = new Date(a.date).getTime();
        b = new Date(b.date).getTime();
        if ((a === b) === new Date(false).getTime()) return 0;
        if (b === new Date(false).getTime()) return -1;
        return a - b;
      });

      // prioritySorting
      array.sort((a, b) => b.priority - a.priority);

      // doneSorting
      array.sort((a, b) => {
        a = a.checked;
        b = b.checked;
        if (a === b) return 0;
        if (a === false) return -1;
        if (b === false) return 1;
      });
      window.fetch(
        `http://localhost:3000/tasks/${this.listId}/task/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify({ tasks: this.tasks }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase();
    }
  }
};
</script>

<style>
.listNameInTask {
  font-size: 200%;
}
.taskNav {
  display: flex;
  justify-content: space-between;
  background-color: black;
  height: 30px;
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