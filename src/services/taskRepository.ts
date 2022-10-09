import { Task } from "~/models";
import { v4 as uuidv4 } from "uuid";

let tasks: Array<any>;

function generateInitialData() {
  tasks = [
    { agentID: '1', tasks: [{ taskID: '1', description: "Kill Goldfinger", isComplete: true }, { taskID: '2', description: "Kill Renard", isComplete: true }]},
    { agentID: '2', tasks: [{ taskID: '3', description: "Create a new James Bond car", isComplete: false }, { taskID: '4', description: "Create a missile launcher pen", isComplete: false }]},
    { agentID: '3', tasks: [{ taskID: '5', description: "Seduce James Bond", isComplete: true }]},
    { agentID: '4', tasks: [{ taskID: '6', description: "Rule the world", isComplete: true }]}
  ];
}

function getTaskFromCache() {
  if (!tasks) {
    generateInitialData();
  }
  return tasks;
}

class TaskRepository {
  private tasks: Map<string, Array<Task>> = new Map<string, Array<Task>>();

  constructor() {
    const tasksMapping = getTaskFromCache();
    tasksMapping.forEach((mapping) => {
      this.tasks.set(mapping.agentID, mapping.tasks);
    });
  }

  getTasksByAgent(agentID: string) {
    const tasks = this.tasks.get(agentID);
    if (!tasks) {
      return [];
    }
    return tasks;
  }

  addTaskToAgent(agentID: string, task: Task) {
    let allTasks = this.tasks.get(agentID);
    if (allTasks) {
      task.taskID = uuidv4();
      allTasks = [...allTasks, task];
    } else {
      allTasks = [task];
    }

    this.tasks.set(agentID, allTasks);
    return task;
  }

  removeAllTasksForDeletedAgent(agentID: string) {
    this.tasks.delete(agentID);
  }

  updateTaskForAgent(agentID: string, task: Task) {
    const allTasks = this.tasks.get(agentID);
    if (allTasks) {
      const index = allTasks.findIndex((t) => t.taskID == task.taskID);
      this.tasks.set(agentID, [
        ...allTasks.slice(0, index),
        task,
        ...allTasks.slice(index + 1)
      ]);
    }
    return task;
  }
}

const taskRepository = new TaskRepository();
export { taskRepository };
