import Button from '../components/button';
import PlusIcon from '../assets/icons/plus.svg?react';
import TaskItem from './task-item';
import useTasks from '../hooks/use-tasks';
import { TaskState } from '../models/task';

export default function TaskList() {
  const { tasks, prepareTask, updateTask, updateTaskStatus } = useTasks();

  console.log(tasks);

  function handleNewTask() {
    prepareTask();
  }

  return (
    <>
      <section>
        <Button
          type="button"
          icon={PlusIcon}
          className="w-full"
          onClick={handleNewTask}
          disabled={tasks.some((task) => task.state === TaskState.Creating)}
        >
          Nova tarefa
        </Button>
      </section>
      <section className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={updateTask}
            updateTaskStatus={updateTaskStatus}
          />
        ))}
      </section>
    </>
  );
}
