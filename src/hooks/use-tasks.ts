import React from 'react';
import { TASK_KEY, TaskState } from '../models/task';
import type { Task } from '../models/task';
import { delay } from '../helpers/utils';
import { useLocalStorage } from './use-local-storage';

export default function useTasks() {
  const [tasksData] = useLocalStorage<Task[]>(TASK_KEY, []);

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  React.useEffect(() => {
    async function fetchTasks() {
      if (isLoadingTasks) {
        await delay(2000);
        setIsLoadingTasks(false);
      }
      setTasks(tasksData || []);
    }

    fetchTasks();
  }, [tasksData, isLoadingTasks]);

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created)
      .length,
    concludedTaskCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks,
  };
}
