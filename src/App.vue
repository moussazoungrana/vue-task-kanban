<script setup lang="ts">
import type { ITaskStatus } from '@/types/ITaskStatus'
import { ref, type Ref, watch } from 'vue'
import KanbanStatus from '@/components/KanbanStatus.vue'
import Storage from '@/utils/Storage'
import draggable from 'vuedraggable'

const statuses: Ref<ITaskStatus[]> = ref([])

const defaultStatuses: ITaskStatus[] = [
  {
    id: 1,
    name: 'Todo',
    color: '#cecece',
    order: 1,
    tasks: [
      {
        id: 1,
        name: 'Task One',
        order: 1
      },
      {
        id: 2,
        name: 'Task 2',
        order: 2
      },
      {
        id: 3,
        name: 'Task 3',
        order: 3
      }
    ]
  },
  {
    id: 2,
    name: 'In Progress',
    color: '#ff7f00',
    order: 1,
    tasks: []
  },
  {
    id: 3,
    name: 'Done',
    color: '#008000',
    order: 3,
    tasks: [
      {
        id: 4,
        name: 'Task 4',
        order: 5
      },
      {
        id: 5,
        name: 'Task 5',
        order: 5
      }
    ]
  },
  {
    id: 4,
    name: 'Archived',
    color: '#ff0000',
    order: 4,
    tasks: [
      {
        id: 6,
        name: 'Task 6',
        order: 6
      },
      {
        id: 7,
        name: 'Task 7',
        order: 7
      }
    ]
  }
]

if (!Storage.has('kanban')) {
  Storage.put('kanban', {
    statuses: defaultStatuses
  })
}

if (Storage.has('kanban')) {
  statuses.value = Storage.get('kanban').statuses
}

const refreshStatuses = () => {
  if (Storage.has('kanban')) {
    statuses.value = Storage.get('kanban').statuses
  }
}

watch(
  statuses,
  () => {
    if (Storage.has('kanban')) {
      Storage.put('kanban', {
        statuses: statuses.value
      })
    }
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="main-container">
    <h1 class="section-title">Task Kanban</h1>
    <br />

    <draggable
      class="kanban-container"
      v-model="statuses"
      handle=".kanban-status"
      draggable=".kanban-status"
      animation="100"
      item-key="id"
    >
      <template #item="{ element, index }">
        <kanban-status @taskChanged="refreshStatuses" :status="element"></kanban-status>
      </template>
    </draggable>
  </div>
</template>

<style scoped></style>
