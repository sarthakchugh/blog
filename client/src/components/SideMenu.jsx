import React from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterChange = (e) => {
        const filter = e.target.value;
        setSearchParams({ ...Object.fromEntries(searchParams), sort: filter });
    };

    return (
        <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search />
            <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="newest" className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="newest"
                        name="filter"
                        value="newest"
                        onChange={handleFilterChange}
                        className="appearance-none w-4 h-4 border-[1.5px] border-white rounded-full bg-white checked:bg-blue-800"
                    />
                    Newest
                </label>
                <label htmlFor="trending" className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="trending"
                        name="filter"
                        value="trending"
                        onChange={handleFilterChange}
                        className="appearance-none w-4 h-4 border-[1.5px] border-white rounded-full bg-white checked:bg-blue-800"
                    />
                    Trending
                </label>
                <label htmlFor="popular" className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="popular"
                        name="filter"
                        value="popular"
                        onChange={handleFilterChange}
                        className="appearance-none w-4 h-4 border-[1.5px] border-white rounded-full bg-white checked:bg-blue-800"
                    />
                    Most Popular
                </label>
                <label htmlFor="oldest" className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        id="oldest"
                        name="filter"
                        value="oldest"
                        onChange={handleFilterChange}
                        className="appearance-none w-4 h-4 border-[1.5px] border-white rounded-full bg-white checked:bg-blue-800"
                    />
                    Oldest
                </label>
            </div>
            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2">
                <Link to="/posts" className="text-sm underline">
                    All
                </Link>
                <Link to="/posts?category=webdev" className="text-sm underline">
                    Web Development
                </Link>
                <Link to="/posts?category=ai" className="text-sm underline">
                    AI Development
                </Link>
                <Link to="/posts?category=cyber" className="text-sm underline">
                    Cyber Security
                </Link>
                <Link to="/posts?category=tech" className="text-sm underline">
                    Technology
                </Link>
                <Link to="/posts?category=others" className="text-sm underline">
                    Others
                </Link>
            </div>
        </div>
    );
};

export default SideMenu;
