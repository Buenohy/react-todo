import useLocalStorageModule from 'use-local-storage';
import { TASK_KEY, TaskState } from '../models/task';
import type { Task } from '../models/task';
import React from 'react';
import { delay } from '../helpers/utils';

const useLocalStorage = useLocalStorageModule.default;

export default function useTasks() {
  const [tasksData] = useLocalStorage<Task[]>(TASK_KEY, []);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  async function fetchTasks() {
    if (isLoadingTasks) {
      await delay(2000);
      setIsLoadingTasks(false);
    }
    setTasks(tasksData);
  }

  React.useEffect(() => {
    fetchTasks();
  }, [tasksData]);

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created)
      .length,
    concludedTaskCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks,
  };
}
