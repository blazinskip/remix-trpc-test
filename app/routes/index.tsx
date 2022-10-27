import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { trpc } from "~/utils/trpc/client";

export async function loader() {
  const users = await trpc.findAll.query();
  return json({ users });
}

export async function action(args: ActionArgs) {
  const formData = await args.request.formData();
  const name = formData.get("name") as string;
  await trpc.addUser.mutate({ name });

  return redirect("/");
}

export default function Index() {
  const users = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form method="post">
        <input name="name" />
        <button type="submit">Add user</button>
      </Form>
      <h3>Users</h3>
      <ul>
        {users.users &&
          users.users.map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>
    </div>
  );
}
