import { component$, useRef, useStore, $ } from "@builder.io/qwik";
import BackButton from "~/components/shared/back-button/backButton";
import FieldControl from "~/components/shared/field-control/FieldControl";
import { txtId } from "~/types";
import { serializeData } from '~/utils/utils';

export default component$(() => {
  const store = useStore( {
      firstName: '',
      lastName: '',
      codeName: '',
      description: ''
  });
  const validationErrorStore = useStore({
    error: ''
  });
  const imgInput = useRef<HTMLInputElement>();

  const handleSave$ = $(async () => {
    const handleImageFile = (callback: Function) => {
      if (!imgInput.current || !imgInput.current.files ) {
        return;
      }
      const file = imgInput.current.files[0];
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
      validationErrorStore.error = 'Please fill first name and last name!';
    } else {
      validationErrorStore.error = '';
      handleImageFile((file: string) => {
        const data = serializeData(store);
        data.set('imagePath', file);
        fetch('/create', {
          method: 'POST',
          body: data
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
      <img className="whirl" src="/images/whirl.png" />
      <div className="float-left">
        <h2>Create Agent</h2>
        <div className="separatorDiv" />
        <fieldset>
          <legend>Agent Details</legend>
          <div>
            <div className="validation-error">{validationErrorStore.error}</div>
            <div>
              <form>
                <FieldControl id="firstName" label="First Name: " onChange={onChange$} />
                <FieldControl id="lastName" label="Last Name: " onChange={onChange$} />
                <FieldControl id="codeName" label="Code Name: " onChange={onChange$} />
                <FieldControl id="description" label="Description: " onChange={onChange$} />
                <label htmlFor="txtImage">Image Path: </label>
                <input ref={imgInput} id="txtImage" type="file" value={store.imagePath} />
              </form>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="clear align-center">
        <input id="saveEditButton" type="button" value="Save" className="default" onClick$={handleSave$} />
        <BackButton backUrl={`/`} />
      </div>
    </div>
  );
});