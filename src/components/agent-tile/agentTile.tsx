import { component$ } from '@builder.io/qwik';
import { Agent } from "~/models";

interface IProps {
  agent: Agent;
}

export default component$(({ agent } : IProps) => {
  return (
    <div id="tilecontainer">
      <div className="tile double bg-color-gray">
        <div className="tile-content">
          <div className="image">
            <img src={agent.imagePath} className="place-left" id="agentImage" alt="Agent Image" />
          </div>
          <a href={`/details/${agent.agentID}`} class="moreDetails" />
          <div className="agentDetails">
            <span className="agentDetailsHeaders">Name:</span>
            {`${agent.firstName} ${agent.lastName}`}
          </div>
          <div className="agentDetails">
            <span className="agentDetailsHeaders">Code Name:</span>
            {agent.codeName}
          </div>
          <div className="agentDetails">
            <span className="agentDetailsHeaders">Description:</span>
            {agent.description}
          </div>
        </div>
      </div>
    </div>
  );
});