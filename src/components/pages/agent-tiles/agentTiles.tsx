import { component$ } from "@builder.io/qwik";
import { Agent } from "~/models";
import AgentTile from "./components/agent-tile/agentTile";

interface IProps {
  agents: Array<Agent>;
}

export default component$(({ agents }: IProps) => {
  return (
    <>
      {agents.map((agent) => <AgentTile agent={agent} />)}
    </>
  );
});