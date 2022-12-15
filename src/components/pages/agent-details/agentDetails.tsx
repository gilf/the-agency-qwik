import { component$, useStore } from "@builder.io/qwik";
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
      <img class="whirl" src="/images/whirl.png" />
      <div class="flex-row">
        <div>
          <h2>Agent Details</h2>
          <div class="separatorDiv" />
          <fieldset>
            <legend>Agent</legend>
            <div class="flex-row">
              <div style={{ width: '35%'}}>
                <img src={agent.imagePath} alt="Agent Image" id="agentImage" />
              </div>
              <div class="flex-row" style={{ width: '65%', fontSize: '20px'}}>
                <div class="width-50">
                  <div style={{ fontWeight: 'bold' }}>
                    First Name: <br />
                    Last Name: <br />
                    Code Name: <br />
                    Description:
                  </div>
                </div>
                <div class="width-50">
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
        <div class="assignment-padding">
          <h2>Tasks</h2>
          <div class="separatorDiv" />
          <TaskTable agentID={store.agentID} tasks={tasks} />
        </div>
      </div>
      <div class="clear align-center">
        <input id="btnEditAgent" type="button" value="Edit" class="default" onClick$={() => location.href = `/edit/${agent.agentID}`} />
        <input id="btnDeleteAgent" type="button" value="Delete" class="default" onClick$={() => {
          fetch(`/details/${store.agentID}`, {
            method: "DELETE"
          }).then(() => {
            location.href = "/";
          });
        }} />
        <BackButton backUrl={`/`} />
      </div>
    </div>
  );
});