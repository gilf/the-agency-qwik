import { $, component$, useStore, useSignal } from "@builder.io/qwik";
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
  const validationErrorStore = useSignal('');

  const onChange$ = $(async (label: string, value: string) => {
    store[label as txtId] = value;
  });

  const handleSave$ = $(async () => {
    if (!store.firstName || !store.lastName) {
      validationErrorStore.value = 'Please fill first name and last name!';
    } else {
      validationErrorStore.value = '';
      fetch(`/edit/${store.agentID}`, {
        method: 'PUT',
        body: JSON.stringify(store)
      }).then(() => {
        location.href = `/details/${store.agentID}`;
      });
    }
  });

  return (
    <>
      <img class="whirl" src="/images/whirl.png" />
      <div class="float-left">
        <h2>Edit Agent</h2>
        <div class="separatorDiv" />
        <fieldset>
          <legend>Agent Details</legend>
          <div>
            <div class="validation-error">{validationErrorStore.value}</div>
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
      <div class="clear align-center">
        <input id="saveEditButton" type="button" value="Save" class="default" onClick$={handleSave$} />
        <BackButton backUrl={`/details/${agent.agentID}`} />
      </div>
    </>
  );
});