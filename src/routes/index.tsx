import { component$, Resource } from '@builder.io/qwik';
import { useEndpoint } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import AgentTiles from "~/components/pages/agent-tiles/agentTiles";
import { Agent } from "~/models";
import { agentRepository } from "~/services";

export const onGet: RequestHandler<Array<Agent>> = async () => {
  return agentRepository.getAll();
};

export default component$(() => {
  const agents = useEndpoint<Array<Agent>>();

  return (
    <Resource
      value={agents}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(agents) => (
        <>
          <input type="button" value="Create Agent" class="default" id="btnCreateAgent" onClick$={() => {
            location.href = "/create";
          }}/>
          <AgentTiles agents={agents} />
        </>
      )}
    />
  );
});

export const head: DocumentHead = {
  title: 'Welcome to TheAgency',
};
