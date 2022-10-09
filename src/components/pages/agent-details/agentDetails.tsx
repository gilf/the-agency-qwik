import { $, component$, useStore } from "@builder.io/qwik";
import { Agent, Task } from "~/models";
import TaskTable from "~/components/pages/agent-details/components/task-table/taskTable";
import BackButton from "~/components/shared/back-button/backButton";

interface IProps {
  agent: Agent;
  tasks: Array<Task>;
}

export default component$(({ agent, tasks }: IProps) => {
  const store = useStore({
    ...agent
  });

  return (
    <div>
      <img className="whirl" src="/images/whirl.png" />
      <div className="flex-row">
        <div>
          <h2>Agent Details</h2>
          <div className="separatorDiv" />
          <fieldset>
            <legend>Agent</legend>
            <div className="flex-row">
              <div style={{ width: '35%'}}>
                <img src={agent.imagePath} alt="Agent Image" id="agentImage" />
              </div>
              <div className="flex-row" style={{ width: '65%', fontSize: '20px'}}>
                <div className="width-50">
                  <div style={{ fontWeight: 'bold' }}>
                    First Name: <br />
                    Last Name: <br />
                    Code Name: <br />
                    Description:
                  </div>
                </div>
                <div className="width-50">
                  <div id="agentDetails">
                    {store.firstName}<br />
                    {store.lastName}<br />
                    {store.codeName}<br />
                    <div style={{ wordWrap: 'break-word' }}>{store.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="assignment-padding">
          <h2>Tasks</h2>
          <div className="separatorDiv" />
          <TaskTable agentID={store.agentID} tasks={tasks} />
        </div>
      </div>
      <div className="clear align-center">
        <input id="btnEditAgent" type="button" value="Edit" className="default" onClick$={() => location.href = `/edit/${agent.agentID}`} />
        <input id="btnDeleteAgent" type="button" value="Delete" className="default" onClick$={() => {
          fetch(`/details/${store.agentID}`, {
            method: "DELETE"
          });
          location.href = "/";
        }} />
        <BackButton backUrl={`/`} />
      </div>
    </div>
  );
});