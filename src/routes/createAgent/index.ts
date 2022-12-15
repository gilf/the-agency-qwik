import { RequestHandler } from "@builder.io/qwik-city";
import { deserializeData } from "~/utils/utils";
import { Agent } from "~/models";
import { agentRepository } from "~/services";

export const onPost: RequestHandler = async ({ request }) => {
  const agent = await deserializeData<Agent>(request);
  return agentRepository.create(agent);
};
