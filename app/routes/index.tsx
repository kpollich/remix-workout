import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/exercises");
};
