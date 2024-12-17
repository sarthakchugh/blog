import React, { useState } from 'react';
import HomePostList from '../components/HomePostList';
import SideMenu from '../components/SideMenu';
import BreadCrumb from '../components/BreadCrumb';
import { useSearchParams } from 'react-router-dom';
import categoryMapper from '../util/categoryMapper';

const PostList = () => {
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get('category');

    return (
        <div className="flex flex-col gap-8">
            <BreadCrumb current={categoryMapper(category)} />
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">{categoryMapper(category)}</h1>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="md:hidden bg-blue-800 text-white px-4 py-2 rounded-xl w-48 shadow-md"
            >
                {open ? 'Close' : 'Filter or Search'}
            </button>
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="flex-1">
                    <HomePostList />
                </div>
                <div className={`${open ? 'block' : 'hidden'} md:block`}>
                    <SideMenu />
                </div>
            </div>
        </div>
    );
};

export default PostList;
