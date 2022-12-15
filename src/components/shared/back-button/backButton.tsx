import { component$ } from "@builder.io/qwik";

interface IProps {
  backUrl: string;
}

export default component$(({ backUrl }: IProps) => {
  return (
    <input id="btnBack" type="button" value="Back" class="default" onClick$={() => {
      location.href = backUrl;
    }} />
  );
});