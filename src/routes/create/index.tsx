import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import CreateAgent from "~/components/pages/create-agent/createAgent";
import { agentRepository } from "~/services";
import { deserializeData } from "~/utils/utils";
import { Agent } from "~/models";

export const onPost: RequestHandler = async ({ request }) => {
  const agent = await deserializeData<Agent>(request);
  return agentRepository.create(agent);
};

export default component$(() => {
  return (
    <>
      <CreateAgent />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Create agent',
};
