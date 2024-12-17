import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ current }) => {
    return (
        <div className="flex gap-2 items-center">
            <Link to="/" className="hover:text-blue-800">
                Home
            </Link>
            <span>•</span>
            <Link to="/posts" className={`${!current ? 'text-blue-800' : 'hover:text-blue-800'}`}>
                Blogs and Articles
            </Link>
            {current && (
                <>
                    <span>•</span>
                    <span className="text-blue-800">{current}</span>
                </>
            )}
        </div>
    );
};

export default BreadCrumb;
