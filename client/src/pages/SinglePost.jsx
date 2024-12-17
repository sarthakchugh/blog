import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Image from '../components/Image';
import { ImFacebook2 } from 'react-icons/im';
import { SiInstagram } from 'react-icons/si';
import PostActions from '../components/PostActions';
import Search from '../components/Search';
import Comments from '../components/Comments';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'timeago.js';
import categoryMapper from '../util/categoryMapper';
import DOMPurify from 'dompurify';

const fetchPost = async (slug) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`);
    return response.data;
};

const SinglePost = () => {
    const { slug } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    if (!data.post) return 'Post not found!';

    return (
        <div className="flex flex-col gap-8 my-8">
            {/* heading */}
            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="w-full lg:w-3/5">
                    {/* heading */}
                    <h1 className="font-bold text-2xl md:text-4xl xl:text-5xl">{data.post.title}</h1>
                    {/* details */}
                    <div className="flex gap-2 text-gray-500 my-6 flex-wrap leading-tight text-sm md:text-base">
                        <span>Written by</span>
                        <Link to={`/posts?author=${data.post.user.username}`} className="text-blue-800">
                            {data.post.user.username}
                        </Link>
                        <span>on</span>
                        <Link to={`/posts?category=${data.post.category}`} className="text-blue-800">
                            {categoryMapper(data.post.category)}
                        </Link>
                        <span>{format(data.post.createdAt)}</span>
                    </div>
                    {/* description */}
                    <p className="text-justify md:text-lg lg:text-xl">{data.post.description}</p>
                </div>
                <div className="w-full lg:w-2/5">
                    {/* image */}
                    {data.post.cover_image && (
                        <Image
                            src={data.post.cover_image}
                            alt="Single Post"
                            className={'rounded-3xl object-cover'}
                            w="895"
                        />
                    )}
                </div>
            </div>
            {/* content */}
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                {/* text */}
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.post.content) }}
                    className="flex flex-col lg:text-lg text-justify"
                />
                {/* menu */}
                <div className="px-4 top-8 h-max sticky md:w-1/4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-medium">Author</h1>
                        <div className="flex items-center gap-4">
                            {data.post.user.image && (
                                <img
                                    src={data.post.user.image}
                                    alt="Author"
                                    className={'rounded-full w-10 h-10 object-cover'}
                                />
                            )}
                            <Link to={`/posts?author=${data.post.user.username}`} className="text-blue-800">
                                {data.post.user.username}
                            </Link>
                        </div>
                        {/* <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur</p>
                        <div className="flex gap-2">
                            <Link to="/">
                                <ImFacebook2 className="w-4 h-4" />
                            </Link>
                            <Link to="/">
                                <SiInstagram className="w-4 h-4" />
                            </Link>
                        </div> */}
                    </div>
                    <PostActions post={data.post} />
                    <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link to="/posts?category=webdev" className="underline">
                            Web Development
                        </Link>
                        <Link to="/posts?category=ai" className="underline">
                            AI Development
                        </Link>
                        <Link to="/posts?category=cyber" className="underline">
                            Cyber Security
                        </Link>
                        <Link to="/posts?category=tech" className="underline">
                            Technology
                        </Link>
                        <Link to="/posts?category=others" className="underline">
                            Others
                        </Link>
                    </div>
                    <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
                    <Search />
                </div>
            </div>
            {/* comments */}
            <Comments postId={data.post._id} />
        </div>
    );
};

export default SinglePost;
