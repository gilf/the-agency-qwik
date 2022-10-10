import { $, component$, useStore } from "@builder.io/qwik";
import { Agent } from "~/models";
import BackButton from "~/components/shared/back-button/backButton";
import FieldControl from "~/components/shared/field-control/FieldControl";
import { txtId } from "~/types";

interface IProps {
  agent: Agent;
}

export default component$(({ agent }: IProps) => {
  const store = useStore({
    ...agent
  });
  const validationErrorStore = useStore({
    error: ''
  });

  const onChange$ = $(async (label: string, value: string) => {
    store[label as txtId] = value;
  });

  const handleSave$ = $(async () => {
    if (!store.firstName || !store.lastName) {
      validationErrorStore.error = 'Please fill first name and last name!';
    } else {
      validationErrorStore.error = '';
      const data = new URLSearchParams();
      Object.keys(store).forEach((param) => {
        data.set(param, store[param as txtId]);
      });
      fetch(`/edit/${store.agentID}`, {
        method: 'PUT',
        body: data
      }).then(() => {
        location.href = `/details/${store.agentID}`;
      });
    }
  });

  return (
    <>
      <img className="whirl" src="/images/whirl.png" />
      <div className="float-left">
        <h2>Edit Agent</h2>
        <div className="separatorDiv" />
        <fieldset>
          <legend>Agent Details</legend>
          <div>
            <div className="validation-error">{validationErrorStore.error}</div>
            <div>
              <form>
                <FieldControl id="firstName" label="First Name: " onChange={onChange$} value={store.firstName} />
                <FieldControl id="lastName" label="Last Name: " onChange={onChange$} value={store.lastName} />
                <FieldControl id="codeName" label="Code Name: " onChange={onChange$} value={store.codeName}/>
                <FieldControl id="description" label="Description: " onChange={onChange$} value={store.description} />
              </form>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="clear align-center">
        <input id="saveEditButton" type="button" value="Save" className="default" onClick$={handleSave$} />
        <BackButton backUrl={`/details/${agent.agentID}`} />
      </div>
    </>
  );
});