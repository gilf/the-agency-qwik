import { component$, Resource } from "@builder.io/qwik";
import { DocumentHead, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Agent, Task } from "~/models";
import AgentDetails from "~/components/pages/agent-details/agentDetails";
import { agentRepository, taskRepository } from "~/services";
import { deserializeData } from "~/utils/utils";

interface ResponseData {
  agent: Agent;
  tasks: Array<Task>;
}

export const onGet: RequestHandler<ResponseData> = async ({ params }) => {
  const agentID = params.id;
  const agent = agentRepository.get(agentID);
  const tasks = taskRepository.getTasksByAgent(agentID);
  return { agent, tasks };
};

export const onPut: RequestHandler = async ({ request }) => {
  const agent = await deserializeData<Agent>(request);
  return agentRepository.update(agent);
};

export const onDelete: RequestHandler = async ({ params }) => {
  const agentID = params.id;
  agentRepository.delete(agentID);
  taskRepository.removeAllTasksForDeletedAgent(agentID);
};

export default component$(() => {
  const data = useEndpoint<ResponseData>();

  return (
    <Resource
      value={data}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={({ agent, tasks }) => (
        <>
          <AgentDetails agent={agent} tasks={tasks} />
        </>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: 'Agent details',
};
