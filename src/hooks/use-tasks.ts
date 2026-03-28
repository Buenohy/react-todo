import useLocalStorageModule from 'use-local-storage';
import { TASK_KEY, TaskState } from '../models/task';
import type { Task } from '../models/task';

const useLocalStorage = useLocalStorageModule.default;

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);

  const currentTasks = tasks || [];

  function prepareTask() {
    setTasks([
      ...currentTasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: '',
        state: TaskState.Creating,
      },
    ]);
  }

  function updateTask(id: string, payload: { title: Task['title'] }) {
    setTasks(
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, state: TaskState.Created, ...payload }
          : task,
      ),
    );
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(
      currentTasks.map((task) =>
        task.id === id ? { ...task, concluded } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return {
    tasks: currentTasks,
    CreatedTasksCount: currentTasks.filter(
      (task) => task.state === TaskState.Created,
    ).length,
    concludedTasksCount: currentTasks.filter((task: Task) => task.concluded)
      .length,
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
}
