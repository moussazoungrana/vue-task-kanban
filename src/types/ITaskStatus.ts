import type { ITask } from '@/types/ITask'

export interface ITaskStatus {
  id: number
  name: string
  color: string
  order?: number
  tasks: ITask[] | []
}
