import React from 'react';
import { TASK_KEY, TaskState } from '../models/task';
import type { Task } from '../models/task';
import { delay } from '../helpers/utils';
import { useLocalStorage } from './use-local-storage';

export default function useTask() {
  const [tasksData, setTasksData] = useLocalStorage<Task[]>(TASK_KEY, []);
  const currentTasks = tasksData || [];

  const [isUpdatingTask, setIsUpdatingTask] = React.useState(false);
  const [isDelitingTask, setIsDelitingTask] = React.useState(false);

  function prepareTask() {
    setTasksData([
      ...currentTasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: '',
        state: TaskState.Creating,
      },
    ]);
  }

  async function updateTask(id: string, payload: { title: Task['title'] }) {
    setIsUpdatingTask(true);
    await delay(1000);
    setTasksData(
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, state: TaskState.Created, ...payload }
          : task,
      ),
    );
    setIsUpdatingTask(false);
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasksData(
      currentTasks.map((task) =>
        task.id === id ? { ...task, concluded } : task,
      ),
    );
  }

  async function deleteTask(id: string) {
    setIsDelitingTask(true);
    await delay(1000);
    setTasksData(currentTasks.filter((task) => task.id !== id));
    setIsDelitingTask(false);
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDelitingTask,
  };
}
