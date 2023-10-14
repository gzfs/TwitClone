export default function Trending() {
  return (
    <div className="rounded-[50px] px-6 w-full bg-white font-Montserrat text-[#78A79E] py-6 mt-8">
      <div className="p-5 py-3 flex text-sm flex-col">
        <div className="flex justify-between w-full">
          <p># ElonMuskAnnaThamass</p>
          <p className="ml-6">420k</p>
        </div>
        <p className="text-xs w-3/4 mt-4">
          Lorem ipsum dolor sit amet consectetur adipiscing
        </p>
      </div>
      {[1, 2].map((uniqueIndex) => {
        return (
          <div
            className="p-5 py-3 flex text-sm justify-between"
            key={uniqueIndex}
          >
            <p># ElonMuskAnnaMass</p>
            <p className="ml-6">420k</p>
          </div>
        );
      })}
    </div>
  );
}
