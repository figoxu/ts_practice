<template>
  <div>
    <h2 style="text-align: center;">Todo List</h2>
    <div class="todo-form" style="text-align: center;">
      <el-row :gutter="20">
        <el-col :span="16">
          <input v-model="newItem.name" class="todo-name" placeholder="Todo" type="text" style="width: 100%"/>
        </el-col>
        <el-col :span="4">
          <input v-model="newItem.deadline" class="todo-deadline" type="date"/>
        </el-col>
        <el-col :span="2">
          <button class="add-button" type="button" @click="addItem">Add</button>
        </el-col>
      </el-row>
    </div>
    <todotable :items="items" class="todo-table"/>
  </div>
</template>


<script lang="ts" setup>
import {reactive} from "vue";
import {Todo, saveItems, loadItems} from "./todo.store";
import todotable from "./todotable.vue"

const newItem = reactive<Todo>({name: '', deadline: ''})
const items = reactive<Todo[]>(loadItems())
const addItem = () => {
  if (newItem.name != '' && newItem.deadline != '') {
    items.push({name: newItem.name, deadline: newItem.deadline})
    newItem.name = ''
    saveItems(items)
  }
}
</script>