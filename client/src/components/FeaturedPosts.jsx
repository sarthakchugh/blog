import React from 'react';
import Image from '../components/Image';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';
import categoryMapper from '../util/categoryMapper';

const fetchPost = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts?featured=true&limit=4&sort=newest`
    );
    return response.data;
};

const FeaturedPosts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['featuredPosts'],
        queryFn: () => fetchPost(),
    });

    if (isPending) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    const posts = data.posts;
    if (!posts || posts.length === 0) return;

    return (
        <div className="lg:mt-8 flex flex-col lg:flex-row gap-8">
            {/* First Post */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 ">
                {/* Image */}
                {posts[0].cover_image && (
                    <Image
                        src={posts[0].cover_image}
                        alt="Featured Post"
                        className={'rounded-3xl object-cover'}
                        w="895"
                    />
                )}
                {/* Details */}
                <div className="flex items-center gap-2">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link to={`/posts?category=${posts[0].category}`} className="text-blue-800 lg:text-lg">
                        {categoryMapper(posts[0].category)}
                    </Link>
                    <span className="text-gray-500">{format(posts[0].createdAt)}</span>
                </div>
                {/* Title */}
                <Link
                    to={`/${posts[0].slug}`}
                    className="text-xl md:text-2xl font-semibold lg:text-3xl lg:font-bold"
                >
                    {posts[0].title}
                </Link>
            </div>
            {/* Other Posts */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* Second Post */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <div className="w-1/3 aspect-video">
                        {posts[1].cover_image && (
                            <Image
                                src={posts[1].cover_image}
                                alt="Featured Post"
                                className={'rounded-xl md:rounded-3xl object-cover'}
                                w="298"
                            />
                        )}
                    </div>
                    <div className="w-2/3">
                        <div className="flex items-center gap-2 text-sm lg:text-base">
                            <h1 className="font-semibold">02.</h1>
                            <Link to={`/posts?category=${posts[1].category}`} className="text-blue-800">
                                {categoryMapper(posts[1].category)}
                            </Link>
                            <span className="text-gray-500 lg:text-sm hidden md:block">
                                {format(posts[1].createdAt)}
                            </span>
                        </div>
                        <Link
                            to={`/${posts[1].slug}`}
                            className="text-base sm:text-lg md:text-2xl font-semibold lg:font-bold"
                        >
                            {posts[1].title}
                        </Link>
                    </div>
                </div>
                {/* Third Post */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <div className="w-1/3 aspect-video">
                        {posts[2].cover_image && (
                            <Image
                                src={posts[2].cover_image}
                                alt="Featured Post"
                                className={'rounded-xl md:rounded-3xl object-cover'}
                                w="298"
                            />
                        )}
                    </div>
                    <div className="w-2/3">
                        <div className="flex items-center gap-2 text-sm lg:text-base">
                            <h1 className="font-semibold">03.</h1>
                            <Link to={`/posts?category=${posts[2].category}`} className="text-blue-800">
                                {categoryMapper(posts[2].category)}
                            </Link>
                            <span className="text-gray-500 lg:text-sm hidden md:block">
                                {format(posts[2].createdAt)}
                            </span>
                        </div>
                        <Link
                            to={`/${posts[2].slug}`}
                            className="text-base sm:text-lg md:text-2xl font-semibold lg:font-bold"
                        >
                            {posts[2].title}
                        </Link>
                    </div>
                </div>
                {/* Fourth Post */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <div className="w-1/3 aspect-video">
                        {posts[3].cover_image && (
                            <Image
                                src={posts[3].cover_image}
                                alt="Featured Post"
                                className={'rounded-xl md:rounded-3xl object-cover'}
                                w="298"
                            />
                        )}
                    </div>
                    <div className="w-2/3">
                        <div className="flex items-center gap-2 text-sm lg:text-base">
                            <h1 className="font-semibold">04.</h1>
                            <Link to={`/posts?category=${posts[3].category}`} className="text-blue-800">
                                {categoryMapper(posts[3].category)}
                            </Link>
                            <span className="text-gray-500 lg:text-sm hidden md:block">
                                {format(posts[3].createdAt)}
                            </span>
                        </div>
                        <Link
                            to={`/${posts[3].slug}`}
                            className="text-base sm:text-lg md:text-2xl font-semibold lg:font-bold"
                        >
                            {posts[3].title}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPosts;
