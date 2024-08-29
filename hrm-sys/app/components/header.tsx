export const Header = async () => {
  return (
    <div className="flex  justify-between px-6 py-6 rounded-lg shadow-lg ">
      <div className="flex space-x-8">
        <h1 className="text-xl font-bold">{`Welcome`}</h1>
        <p className="text-xl">{`Jesse`}</p>
      </div>
      <div>{`profile`}</div>
    </div>
  );
};
