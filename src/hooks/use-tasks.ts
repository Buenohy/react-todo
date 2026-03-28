import useLocalStorageModule from 'use-local-storage';
import { TASK_KEY, TaskState } from '../models/task';
import type { Task } from '../models/task';

const useLocalStorage = useLocalStorageModule.default;

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: '',
        state: TaskState.Creating,
      },
    ]);
  }

  return {
    tasks,
    tasksCount: tasks.length,
    concludedTasksCount: tasks.filter((task: Task) => task.concluded).length,
    prepareTask,
  };
}
