import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";

export default function Tweet({ tweetInformation }: { tweetInformation: any }) {
  const likeSubmit = useSubmit();
  const commentSubmit = useSubmit();

  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const isLiked = tweetInformation.Likes.find((tweetLikes: any) => {
    return tweetLikes.userID === tweetInformation.User.ID;
  });

  console.log(tweetInformation.Replies);

  return (
    <>
      <div className="rounded-[60px] bg-white">
        <div className="flex pt-8 px-8">
          <div className="flex">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={tweetInformation.User.Image}
                alt="Profile"
                className="w-[50px] "
              />
            </div>
            <p
              className="outline-none border-none rounded-xl font-Montserrat flex justify-start px-6 items-center"
              placeholder="Write..."
            >
              @{tweetInformation.User.Handle}
            </p>
          </div>
          <p className="font-Montserrat flex items-center flex-grow justify-end px-4 text-[#98a1a1]">
            69s
          </p>
        </div>
        <p className="px-7 pb-8 pt-4 text-[#3D534F] font-Montserrat text-sm">
          {tweetInformation.Content}
        </p>
        <div className="px-7 pb-5">
          <img
            src={tweetInformation.Image}
            alt="Sheesh"
            className="rounded-[60px]"
          />
        </div>
        <div className="h-1/2 w-full flex flex-col justify-center items-center">
          <div className="flex items-center w-full pb-8 px-12">
            <div className="flex justify-between items-center w-2/12">
              <img src="/assets/images/repeat.png" alt="Re-Tweet" />
              <p className="text-[#98a1a1] font-Montserrat mt-1">420</p>
            </div>
            <div className="flex justify-end items-center font-Montserrat flex-grow">
              <div
                className="flex justify-evenly items-center w-2/12 cursor-pointer"
                onClick={() => {
                  setIsReplyVisible(!isReplyVisible);
                }}
              >
                <img src="/assets/images/messages2.png" alt="Comments" />
                <p className="text-[#98a1a1] font-Montserrat mt-1">
                  {tweetInformation.Replies.length}
                </p>
              </div>
              <Form
                method="POST"
                action={isLiked ? "/tweet/unlike" : "/tweet/like"}
                className="w-2/12"
                onSubmit={(eV) => {
                  eV.preventDefault();
                  likeSubmit(
                    JSON.stringify({
                      tweetID: tweetInformation.ID,
                      userID: tweetInformation.User.ID,
                    }),
                    {
                      method: "POST",
                      action: isLiked ? "/tweet/unlike" : "/tweet/like",
                      encType: "application/json",
                    }
                  );
                }}
              >
                <button className="flex justify-evenly items-center w-full ml-10">
                  <img
                    src={
                      isLiked
                        ? "/assets/images/heart.png"
                        : "/assets/images/heart-outline.png"
                    }
                    className="w-[23px]"
                    alt="Likes"
                  />
                  <p className="text-[#98a1a1] font-Montserrat mt-1">
                    {tweetInformation.Likes.length}
                  </p>
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {isReplyVisible ? (
        <div className="rounded-[60px] bg-white w-full px-8 py-5">
          <Form
            method="POST"
            action="/comment/create"
            className="flex justify-between"
            onSubmit={(eV) => {
              eV.preventDefault();
              commentSubmit(
                JSON.stringify({
                  tweetID: tweetInformation.ID,
                  userID: tweetInformation.User.ID,
                  Content: commentValue,
                }),
                {
                  method: "POST",
                  action: "/comment/create",
                  encType: "application/json",
                }
              );
            }}
          >
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={tweetInformation.User.Image}
                alt="Profile"
                className="w-[50px] "
              />
            </div>
            <input
              type="text"
              className="outline-none border-[#333333] border flex-grow mx-4 rounded-3xl px-6"
              onChange={(eV) => {
                setCommentValue(eV.target.value);
              }}
            />
            <button className="text-xs bg-[#333333] px-5 text-white rounded-3xl">
              Comment
            </button>
          </Form>
          {tweetInformation.Replies.map((tweetReply: any) => {
            return (
              <div className="flex justify-between items-center my-4">
                <div className="overflow-hidden rounded-[20px]">
                  <img
                    src={tweetReply.User.Image}
                    alt="Profile"
                    className="w-[50px] "
                  />
                </div>
                <div className="flex-grow ml-4">{tweetReply.Content}</div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
