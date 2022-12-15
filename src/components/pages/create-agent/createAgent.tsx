import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import BackButton from "~/components/shared/back-button/backButton";
import FieldControl from "~/components/shared/field-control/FieldControl";
import { txtId } from "~/types";

export default component$(() => {
  const store = useStore( {
      firstName: '',
      lastName: '',
      codeName: '',
      description: '',
      imagePath: ''
  });
  const validationErrorStore = useSignal('');
  const imgInput = useSignal<HTMLInputElement>();

  const handleSave$ = $(async () => {
    const handleImageFile = (callback: Function) => {
      if (!imgInput.value || !imgInput.value.files ) {
        return;
      }
      const file = imgInput.value.files[0];
      const reader  = new FileReader();

      if (file) {
        reader.onloadend = (read) => {
          callback(read.target?.result);
        }
        reader.readAsDataURL(file);
      }
      else {
        callback();
      }
    };

    if (!store.firstName || !store.lastName) {
      validationErrorStore.value = 'Please fill first name and last name!';
    } else {
      validationErrorStore.value = '';
      handleImageFile((file: string) => {
        store.imagePath = file;
        console.log(JSON.stringify(store));
        fetch('/createAgent', {
          method: 'POST',
          body: JSON.stringify(store)
        }).then(() => {
          location.href = '/';
        });
      });
    }
  });

  const onChange$ = $(async (label: string, value: string) => {
    store[label as txtId] = value;
  });

  return (
    <div>
      <img class="whirl" src="/images/whirl.png" />
      <div class="float-left">
        <h2>Create Agent</h2>
        <div class="separatorDiv" />
        <fieldset>
          <legend>Agent Details</legend>
          <div>
            <div class="validation-error">{validationErrorStore.value}</div>
            <div>
              <form>
                <FieldControl id="firstName" label="First Name: " onChange={onChange$} />
                <FieldControl id="lastName" label="Last Name: " onChange={onChange$} />
                <FieldControl id="codeName" label="Code Name: " onChange={onChange$} />
                <FieldControl id="description" label="Description: " onChange={onChange$} />
                <label for="txtImage">Image Path: </label>
                <input ref={imgInput} id="txtImage" type="file" />
              </form>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="clear align-center">
        <input id="saveEditButton" type="button" value="Save" class="default" onClick$={handleSave$} />
        <BackButton backUrl={`/`} />
      </div>
    </div>
  );
});