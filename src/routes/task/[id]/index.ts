import { RequestHandler } from "@builder.io/qwik-city";
import { Task } from "~/models";
import { taskRepository } from "~/services";

export const onPost: RequestHandler = async ({ params, request }) => {
  const formData = await request.formData();
  const task: Task = {
    taskID: '',
    description: formData.get('description') as string,
    isComplete: false
  };

  return taskRepository.addTaskToAgent(params.id, task);
};

export const onPut: RequestHandler = async ({ params, request }) => {
  const formData = await request.formData();
  const task: Task = {
    taskID: formData.get('taskID') as string,
    isComplete: formData.get('isComplete') === "true" ? true : false,
    description: formData.get('description') as string
  };

  return taskRepository.updateTaskForAgent(params.id, task);
};
