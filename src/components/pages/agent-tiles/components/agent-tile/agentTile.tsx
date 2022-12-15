import { component$ } from '@builder.io/qwik';
import { Agent } from "~/models";

interface IProps {
  agent: Agent;
}

export default component$(({ agent } : IProps) => {
  return (
    <div id="tilecontainer">
      <div class="tile double bg-color-gray">
        <div class="tile-content">
          <div class="image">
            <img src={agent.imagePath} class="place-left" id="agentImage" alt="Agent Image" />
          </div>
          <a href={`/details/${agent.agentID}`} class="moreDetails" />
          <div class="agentDetails">
            <span class="agentDetailsHeaders">Name:</span>
            {`${agent.firstName} ${agent.lastName}`}
          </div>
          <div class="agentDetails">
            <span class="agentDetailsHeaders">Code Name:</span>
            {agent.codeName}
          </div>
          <div class="agentDetails">
            <span class="agentDetailsHeaders">Description:</span>
            {agent.description}
          </div>
        </div>
      </div>
    </div>
  );
});