import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilePen } from 'react-icons/fa6';
import MainCategories from '../components/MainCategories';
import FeaturedPosts from '../components/FeaturedPosts';
import HomePostList from '../components/HomePostList';
import BreadCrumb from '../components/BreadCrumb';

const Homepage = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Bread Crumbs */}
            <BreadCrumb />
            {/* Introduction */}
            <div className="flex items-center justify-between">
                {/* Titles */}
                <div className="">
                    <h1 className="text-grey-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                        Welcome to my blog!
                    </h1>
                    <p className="mt-4 text-base md:text-xl">
                        Feel free to write and share articles and blogs related to technology around the
                        world.
                    </p>
                </div>
                {/* Animated Button */}
                <Link to="/new" className="hidden md:block relative">
                    <svg
                        viewBox="0 0 200 200"
                        width="150"
                        height="150"
                        className="text-lg tracking-widest animate-spin animatedButton"
                    >
                        <path
                            id="circlePath"
                            fill="none"
                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        />
                        <text>
                            <textPath href="#circlePath" startOffset="0%">
                                Write a post •
                            </textPath>
                            <textPath href="#circlePath" startOffset="50%">
                                Share your idea •
                            </textPath>
                        </text>
                    </svg>
                    <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
                        <FaFilePen className="absolute top-[50%] left-[50%] translate-x-[-39%] translate-y-[-50%] text-white w-8 h-8" />
                    </button>
                </Link>
            </div>
            {/* Categories */}
            <MainCategories />
            {/* Featured Posts */}
            <FeaturedPosts />
            {/* Post List */}
            <div className="">
                <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
                <HomePostList />
            </div>
        </div>
    );
};

export default Homepage;
