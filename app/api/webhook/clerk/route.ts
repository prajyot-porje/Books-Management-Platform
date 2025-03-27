import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser} from "@/lib/actions/users.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  console.log("WEBHOOK_SECRET:", process.env.WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing WEBHOOK_SECRET");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Missing required headers");
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { email_addresses, image_url, first_name, last_name } = evt.data;
      const user = {
        clerkId: id || "",
        email: email_addresses?.[0]?.email_address || "",
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
        username: email_addresses?.[0]?.email_address.split('@')[0] || "", // Generate a default username
      };

      const newUser = await createUser(user);
      if (newUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(id || "", {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name || "",
      lastName: last_name || "",
      username: username || "",
      photo: image_url || "",
    };

    const updatedUser = await updateUser(id || "", user);
    return NextResponse.json({ message: "User Updated", user: updatedUser });
  }

  if (eventType === "user.deleted") {
    const deletedUser = await deleteUser(id || "");
    return NextResponse.json({ message: "User Deleted", user: deletedUser });
  }

  return new Response("webhook recived succesfully", { status: 200 });
}
