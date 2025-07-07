const Header = () => {
  return (
    <div className="bg-[#1c1c4E] text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <span className="bg-green-600 px-2 py-1 rounded mr-2">S</span>WIFT
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-white text-[#1C1C4E] rounded-full font-bold">
            EH
          </div>
          <span className="hidden sm:inline">Ervin Howell</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
