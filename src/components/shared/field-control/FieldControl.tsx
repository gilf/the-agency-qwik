import { $, component$, PropFunction, useSignal } from "@builder.io/qwik";

interface IProps {
  label: string;
  id: string;
  value?: string;
  onChange: PropFunction<(label: string, value: string) => void>;
}

export default component$(({ id, label, value = '', onChange }: IProps) => {
  const typed = useSignal(value);

  const onInput$ = $(async (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    typed.value = input.value;
    if (onChange) {
      await onChange(id, input.value);
    }
  });

  return (
    <>
      <label for={`txt${id}`}>{label}</label>
      <input id={`txt${id}`} type="text" value={typed.value} onInput$={onInput$} /><br />
    </>
  );
});