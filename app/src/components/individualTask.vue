<template>
  <div>
    <div class="task" :id="task.taskId" :class="{'done':task.checked}">
      <input
        type="checkbox"
        class="checkBox"
        v-model="task.checked"
        @change="updateTask(task.taskId)"
      />
      <p
        v-if="!taskNameToggle"
        @click="taskNameToggle=!taskNameToggle"
        class="taskName"
      >{{task.tname}}</p>
      <input
        type="text"
        v-else
        v-model.lazy="task.tname"
        @keydown.enter="[updateTask(task.taskId), taskNameToggle = !taskNameToggle ]"
      />
      <i class="fas fa-angle-down" @click="show = !show"></i>
    </div>
    <hr :class="'c'+task.priority" :id="task.taskId" />
    <div class="taskFeatures" :class="{'noShow':!show}" :id="task.taskId">
      <p class="notes">Notes</p>
      <p class="dueDate">Due Date</p>
      <textarea
        class="textNotes"
        cols="30"
        rows="10"
        v-model="task.notes"
        @change="updateTask(task.taskId)"
      ></textarea>
      <input type="date" class="date" v-model="task.date" @change="updateTask(task.taskId)" />
      <p class="priority">priority</p>
      <select
        name="priority"
        class="prioritySelect"
        v-model="task.priority"
        @change="updateTask(task.taskId)"
      >
        <option value="0">None</option>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <button class="dltBtn" @click="deleteTask(task.taskId,listId)">DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "individualTask",
  props: {
    task: Object,
    deleteTask: Function,
    updateTask: Function,
    listId: String
  },
  data() {
    return {
      show: false,
      taskNameToggle: false
    };
  }
};
</script>
