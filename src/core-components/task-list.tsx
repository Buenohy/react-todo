import Button from '../components/button';
import PlusIcon from '../assets/icons/plus.svg?react';
import TaskItem from './task-item';
import useTasks from '../hooks/use-tasks';

export default function TaskList() {
  const { tasks, prepareTask } = useTasks();

  console.log(tasks);

  function handleNewTask() {
    prepareTask();
  }

  return (
    <>
      <section>
        <Button icon={PlusIcon} className="w-full" onClick={handleNewTask}>
          Nova tarefa
        </Button>
      </section>
      <section className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </section>
    </>
  );
}
