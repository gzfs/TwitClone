export default function Tweet() {
  return (
    <div className="rounded-[60px] bg-white">
      <div className="flex pt-8 px-8">
        <div className="flex">
          <div>
            <img src="/assets/images/GigaMurugan.png" alt="Profile" />
          </div>
          <p
            className="outline-none border-none rounded-xl font-Montserrat flex justify-start px-6 items-center"
            placeholder="Write..."
          >
            Denk Vishal
          </p>
        </div>
        <p className="font-Montserrat flex items-center flex-grow justify-end px-4 text-[#98a1a1]">
          69s
        </p>
      </div>
      <p className="px-7 pb-8 pt-4 text-[#3D534F] font-Montserrat text-sm">
        Javascript Sucks. Dart is the new thing. I need Monads in
        Javascript
      </p>
      <div className="px-7 pb-5">
        <img
          src="https://images.unsplash.com/photo-1685825631222-6bfdc760d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
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
            <div className="flex justify-between items-center w-2/12">
              <img
                src="/assets/images/messages2.png"
                alt="Comments"
              />
              <p className="text-[#98a1a1] font-Montserrat mt-1">
                420
              </p>
            </div>
            <div className="flex justify-between items-center w-2/12 ml-10">
              <img src="/assets/images/heart.png" alt="Likes" />
              <p className="text-[#98a1a1] font-Montserrat mt-1">
                420
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
