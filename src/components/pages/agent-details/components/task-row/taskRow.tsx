import { component$, PropFunction } from "@builder.io/qwik";
import { Task } from "~/models";

interface IProps {
  task: Task;
  onToggle$:  PropFunction<() => void>;
}

export default component$(({ task, onToggle$ }: IProps) => {
  return (
    <tr>
      <td onClick$={async () => await onToggle$()}>{task.description}</td>
      <td>
        { task.isComplete ? <img src="/images/Completed.png" alt="completed" /> : <img src="/images/NotCompleted.png" alt="in progress" />}
      </td>
    </tr>
  );
});