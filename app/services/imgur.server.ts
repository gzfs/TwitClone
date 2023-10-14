export interface ImgurResponse {
  data: {
    id: string;
    title: string;
    description: string;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: string;
    favorite: boolean;
    nsfw: string;
    section: string;
    account_url: string;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  };
  success: boolean;
  status: number;
}

export async function uploadImage(formData: FormData) {
  /* Requires Imgur Setup */
  const headers = new Headers();
  headers.append("Authorization", `Client-ID 8691f5d980349f2`);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  const response = await fetch(
    "https://api.imgur.com/3/image",
    requestOptions
  );
  const result = await (response.json() as Promise<ImgurResponse>);
  return result;
}
