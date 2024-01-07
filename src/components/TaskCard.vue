<script setup lang="ts">
import type { ITask } from '@/types/ITask'

const props = defineProps<{
  task: ITask
}>()
</script>

<template>
  <div class="kanban-card" :data-id="task.id">
    <div class="card-title">{{ task.name }}</div>
  </div>
</template>

<style scoped></style>
