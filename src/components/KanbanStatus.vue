<script setup lang="ts">
import type { ITaskStatus } from '@/types/ITaskStatus'
import TaskCard from '@/components/TaskCard.vue'
import { ref, toRef, watch } from 'vue'
import Storage from '@/utils/Storage'
import draggable from 'vuedraggable'

const props = defineProps<{
  status: ITaskStatus
}>()

const tasks = toRef(props.status.tasks)
const emit = defineEmits(['taskChanged'])

watch(
  tasks,
  () => {
    let statuses: ITaskStatus[] = Storage.get('kanban').statuses
    const currentStatusIndex = statuses.findIndex(
      (item: ITaskStatus) => item.id === props.status.id
    )
    if (currentStatusIndex === -1) return
    statuses[currentStatusIndex].tasks = tasks.value
    Storage.put('kanban', {
      statuses: statuses
    })
  },
  {
    immediate: true,
    deep: true
  }
)

const handleEnd = (e: any) => {
  emit('taskChanged')
}
</script>

<template>
  <div class="kanban-status">
    <div class="status-header" :style="{ borderColor: props.status.color + '66' }">
      <span>{{ status.name }}</span>
    </div>

    <draggable
      class="status-container"
      v-model="tasks"
      handle=".kanban-card"
      draggable=".kanban-card"
      animation="100"
      item-key="id"
      :group="{ name: 'status', pull: true, put: true }"
      :style="{ borderColor: props.status.color + '66' }"
      :data-status="status.id"
      @end="handleEnd"
    >
      <template #item="{ element, index }">
        <task-card :task="element"></task-card>
      </template>
    </draggable>
  </div>
</template>

<style scoped></style>
