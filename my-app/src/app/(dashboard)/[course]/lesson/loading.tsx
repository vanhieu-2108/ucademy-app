const loading = () => {
  return (
    <div className="grid min-h-screen gap-10 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div>
        <div className="skeleton mb-5 aspect-video rounded-lg"></div>
        <div className="mb-5 flex gap-3">
          <div className="skeleton size-10 rounded-lg"></div>
          <div className="skeleton size-10 rounded-lg"></div>
        </div>
        <div className="skeleton mb-10 h-9 w-full"></div>
      </div>
      <div>
        <div className="skeleton mb-2 h-3 w-full gap-4 rounded-full"></div>
        <div className="flex flex-col gap-5">
          <div className="skeleton h-14 w-full rounded-lg"></div>
          <div className="skeleton h-14 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
