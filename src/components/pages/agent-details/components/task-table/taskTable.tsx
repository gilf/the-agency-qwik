import { $, component$, QwikKeyboardEvent, useStore, useWatch$ } from "@builder.io/qwik";
import TaskRow from "~/components/pages/agent-details/components/task-row/taskRow";
import { Task } from "~/models";

interface IProps {
  tasks: Array<Task>;
  agentID: string;
}

export default component$(({ agentID, tasks }: IProps) => {
  const store = useStore({
    tasks
  });

  useWatch$(({ track }) => {
    track(store, 'tasks');
  });

  const handleKeyPress$ = $(async (evt: QwikKeyboardEvent) => {
    if (evt.which !== 13 || !evt.target?.value) {
      return;
    }
    const data = new URLSearchParams();
    data.set('description', evt.target?.value);
    fetch(`/task/${agentID}`, {
      method: 'POST',
      body: data
    }).then(async (res) => {
      const task = await res.json();
      store.tasks = [...store.tasks, task];
      evt.target.value = '';
    });
  });

  const handleToggle$ = $((task: Task) => {
    const data = new URLSearchParams();
    data.set('taskID', task.taskID);
    data.set('description', task.description);
    data.set('isComplete', (!task.isComplete).toString());
    fetch(`/task/${agentID}`, {
      method: 'PUT',
      body: data
    }).then(async (res) => {
      const task = await res.json();
      const index = store.tasks.findIndex((t) => t.taskID === task.taskID);
      store.tasks = [
        ...store.tasks.slice(0, index),
        task,
        ...store.tasks.slice(index + 1)
      ];
    });
  });

  return (
    <table id="taskTable">
      <tr>
        <td colSpan={2}>
          <input id="txtNewTask" type="text" autoFocus={true} onKeyPress$={handleKeyPress$} />
        </td>
      </tr>
      {store.tasks.map((task) => <TaskRow key={task.taskID} task={task} onToggle$={() => handleToggle$(task)} />)}
    </table>
  );
});