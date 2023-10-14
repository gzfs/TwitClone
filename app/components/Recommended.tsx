export default function Recommended() {
  return (
    <div className="rounded-[50px] px-8 w-full bg-white font-Montserrat text-[#78A79E] py-8 mt-8 shadow-2xl">
      {[1, 2, 3].map((iVal) => {
        return (
          <div
            className="flex w-full justify-between items-center mt-4 first:mt-0"
            key={iVal}
          >
            <div className="flex items-center flex-grow">
              <img
                src="/assets/images/GigaMurugan.png"
                alt="Profile"
              />
              <div className="flex flex-col text-xs ml-4">
                <p className="text-[#3D534F]">Giga Murugan</p>
                <p>@gzfs</p>
              </div>
            </div>
            <p className="text-2xl">+</p>
          </div>
        );
      })}
    </div>
  );
}
