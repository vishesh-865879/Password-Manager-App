import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center bg-zinc-800 rounded-xl px-4 py-3 mx-4 my-3">
      <FiSearch className="text-gray-400 mr-3 text-xl flex-shrink-0" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className="bg-transparent text-white w-full outline-none placeholder-gray-400"
      />
    </div>
  )
}
export default SearchBar