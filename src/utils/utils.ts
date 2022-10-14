import { RequestContext } from "@builder.io/qwik-city";

export const serializeData = (store: any) => {
  const data = new URLSearchParams();
  Object.keys(store).forEach((param) => {
    data.set(param, store[param]);
  });
  return data;
}

export async function deserializeData<T>(request: RequestContext) : Promise<T> {
  const formData = await request.formData();
  const result: T | any = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}