<script setup lang="ts">
import type { ITaskStatus } from '@/types/ITaskStatus'
import TaskCard from '@/components/TaskCard.vue'
import { ref, toRef, watch } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import Storage from '@/utils/Storage'
import type { ITask } from '@/types/ITask'

const props = defineProps<{
  status: ITaskStatus
}>()

const el = ref<HTMLElement | null>(null)
const tasks = toRef(props.status.tasks)

useSortable(el, props.status.tasks, {
  group: {
    name: 'status',
    pull: true,
    put: true
  },
  handle: '.kanban-card',
  animation: 200,
  onEnd: (e: any) => {
    const taskId: number = +e.clone.dataset.id
    const newIndex: number = +e.newIndex
    const newStatusId: number = +e.to.dataset.status

    let statuses: ITaskStatus[] = Storage.get('kanban').statuses
    if (props.status.id === newStatusId) return
    let task: ITask = props.status.tasks.find((item) => item.id === taskId) as ITask
    const taskOldIndex = props.status.tasks.findIndex((item) => item.id === taskId)
    const oldStatusIndex = statuses.findIndex((item: ITaskStatus) => item.id === props.status.id)
    const newStatusIndex = statuses.findIndex((item: ITaskStatus) => item.id === newStatusId)
    statuses[oldStatusIndex].tasks.splice(taskOldIndex, 1)
    statuses[newStatusIndex].tasks.splice(newIndex, 0, task)
    Storage.put('kanban', {
      statuses: statuses
    })
  }
})

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
    deep: true
  }
)
</script>

<template>
  <div class="kanban-status">
    <div class="status-header" :style="{ borderColor: props.status.color + '66' }">
      <span>{{ status.name }}</span>
    </div>
    <div
      class="status-container"
      :style="{ borderColor: props.status.color + '66' }"
      ref="el"
      :data-status="status.id"
    >
      <template v-for="task in tasks" :key="`task-${task.id}`">
        <task-card :task="task"></task-card>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
