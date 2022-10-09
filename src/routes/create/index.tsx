import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import CreateAgent from "~/components/pages/create-agent/createAgent";
import { agentRepository } from "~/services";

export const onPost: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const agent: any = {};
  formData.forEach((value, key) => {
    agent[key] = value;
  });
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
