import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (location.pathname === '/posts') {
                setSearchParams({ ...Object.fromEntries(searchParams), search: query });
            } else {
                navigate(`/posts?search=${query}`);
            }
        }
    };

    return (
        <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 md:text-xs lg:text-sm">
            <IoSearch className="w-6 h-6" />
            <input
                className="bg-transparent outline-none"
                placeholder="Search a post..."
                onKeyDown={handleSearch}
            />
        </div>
    );
};

export default Search;
