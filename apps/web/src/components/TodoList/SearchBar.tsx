import Search from "../Icons/Search";

interface Props {
  searchBarItem: (i: string) => void;
}
function SearchBar({ searchBarItem }: Props) {
  return (
    <form className="max-w-md mx-auto ">
      <label>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="search"
            className="block w-full placeholder:text-right text-right py-[0.38rem] px-[0.75rem] pe-10  max-w-[20rem] text-sm text-gray-900 border rounded-[0.375rem] border-blue-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="البحث"
            onChange={(e) => searchBarItem(e.currentTarget.value)}
          />
        </div>
      </label>
    </form>
  );
}

export default SearchBar;
