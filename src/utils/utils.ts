import { RequestContext } from "@builder.io/qwik-city";

export const serializeData = (store: any) => {
  const data = new URLSearchParams();
  Object.keys(store).forEach((param) => {
    data.set(param, store[param]);
  });
  return data;
}

export async function deserializeData<T>(request: RequestContext) : Promise<T> {
  const formData = await request.json();
  const result: T | any = {};
  Object.keys(formData).forEach((key) => {
    if (key.indexOf('id') >= 0) {
      result[key] = parseInt(formData[key]);
    } else {
      result[key] = formData[key];
    }
  });
  return result;
}