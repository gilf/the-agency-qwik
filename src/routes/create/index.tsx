import { component$ } from '@builder.io/qwik';
import { DocumentHead } from "@builder.io/qwik-city";
import CreateAgent from "~/components/pages/create-agent/createAgent";

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
