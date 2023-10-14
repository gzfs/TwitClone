import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Form, useSubmit } from "@remix-run/react";

export default function PostTweet() {
  const [uploadUrl, setUploadUrl] = useState<string | undefined>();
  const [postText, setPostText] = useState("");
  const formSubmit = useSubmit();
  const [imageBoxVisible, setImageBoxVisible] = useState(false);
  return (
    <div className="rounded-[60px] shadow-2xl mb-10 text-sm font-Montserrat bg-white flex flex-col justify-between">
      <div className="flex py-8 px-8">
        <div>
          <img src="/assets/images/GigaMurugan.png" alt="Profile" />
        </div>
        <input
          type="text"
          className="outline-none border-none rounded-xl px-4 flex-grow text-[#98a1a1]"
          placeholder="Write..."
          onChange={(eV) => {
            setPostText(eV.target.value);
          }}
        />
      </div>
      {imageBoxVisible ? (
        <div className="px-12">
          <ImageUpload setImageImgurUrl={setUploadUrl} />
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-3 w-fit py-5 px-10 place-content-center place-self-end">
        <div className="cursor-pointer">
          <img
            src="/assets/images/attachcircle.svg"
            width="25px"
            alt="Attachment"
            onClick={() => {
              setImageBoxVisible(!imageBoxVisible);
            }}
          />
        </div>
        <div>
          <img
            src="/assets/images/Emoji.svg"
            width="25px"
            alt="Mood"
          />
        </div>
        <Form
          onSubmit={(eV) => {
            eV.preventDefault();
            if (uploadUrl || postText) {
              formSubmit(
                JSON.stringify({
                  imageUrl: uploadUrl,
                  postText,
                }),
                {
                  method: "POST",
                  action: "",
                  encType: "application/json",
                }
              );
            }
          }}
        >
          <button className="bg-[#ff546c] font-Montserrat text-xs shadow-xl px-3 py-2 text-white rounded-xl">
            Tweet
          </button>
        </Form>
      </div>
    </div>
  );
}
