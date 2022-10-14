import { component$, Resource, } from "@builder.io/qwik";
import { DocumentHead, RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import EditAgent from "~/components/pages/edit-agent/editAgent";
import { Agent } from "~/models";
import { agentRepository } from "~/services";
import { deserializeData } from "~/utils/utils";

export const onGet: RequestHandler<Agent> = async ({ params }) => {
  return agentRepository.get(params.id);
};

export const onPut: RequestHandler = async ({ request }) => {
  const agent = await deserializeData<Agent>(request);
  return agentRepository.update(agent);
};

export default component$(() => {
  const agent = useEndpoint<Agent>();

  return (
    <Resource
      value={agent}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(agent) => (
        <>
          <EditAgent agent={agent} />
        </>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: 'Edit agent',
};
