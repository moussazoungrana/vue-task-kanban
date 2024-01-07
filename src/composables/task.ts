import { useStorage } from '@vueuse/core'
import type { ITaskStatus } from '@/types/ITaskStatus'

export function useTask() {
  const defaultData: ITaskStatus[] = [
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

  const state = useStorage<{ statuses: ITaskStatus[] | [] }>('kanban', {
    statuses: []
  })
}
