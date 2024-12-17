import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import Search from './Search';

const MainCategories = () => {
    return (
        <div className="hidden lg:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            {/* Links */}
            <div className="flex flex-1 items-center justify-between flex-wrap">
                <Link to="/posts" className="bg-blue-800 text-white px-4 py-2 rounded-full">
                    All Posts
                </Link>
                <Link to="/posts?category=webdev" className="hover:bg-blue-50 px-4 py-2 rounded-full">
                    Web Development
                </Link>
                <Link to="/posts?category=ai" className="hover:bg-blue-50 px-4 py-2 rounded-full">
                    Artificial Intelligence
                </Link>
                <Link to="/posts?category=cyber" className="hover:bg-blue-50 px-4 py-2 rounded-full">
                    Cyber Security
                </Link>
                <Link to="/posts?category=tech" className="hover:bg-blue-50 px-4 py-2 rounded-full">
                    Technology
                </Link>
                <Link to="/posts?category=others" className="hover:bg-blue-50 px-4 py-2 rounded-full">
                    Others
                </Link>
            </div>
            <span className="text-xl font-base">|</span>
            {/* Search */}
            <Search />
        </div>
    );
};

export default MainCategories;
