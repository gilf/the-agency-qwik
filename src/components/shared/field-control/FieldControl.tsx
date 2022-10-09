import { $, component$, PropFunction, useStore } from "@builder.io/qwik";

interface IProps {
  label: string;
  id: string;
  value?: string;
  onChange: PropFunction<(label: string, value: string) => void>;
}

export default component$(({ id, label, value = '', onChange }: IProps) => {
  const store = useStore({
    value
  });

  const onInput$ = $(async (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    store.value = input.value;
    if (onChange) {
      onChange(id, input.value);
    }
  });

  return (
    <>
      <label htmlFor={`txt${id}`}>{label}</label>
      <input id={`txt${id}`} type="text" value={store.value} onInput$={onInput$} /><br />
    </>
  );
});