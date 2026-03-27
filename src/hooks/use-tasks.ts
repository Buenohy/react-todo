import useLocalStorageModule from 'use-local-storage';
import { TASK_KEY } from '../models/task';
import type { Task } from '../models/task';

const useLocalStorage = useLocalStorageModule.default;

export default function useTasks() {
  const [tasks] = useLocalStorage<Task[]>(TASK_KEY, []);
  return {
    tasks,
    tasksCount: tasks.length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
  };
}
