import { json, type ActionFunctionArgs } from "@remix-run/node";
import {
  type ImgurResponse,
  uploadImage,
} from "~/services/imgur.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const imageUrl: ImgurResponse = await uploadImage(formData);
  return json({ imageUrl });
}
