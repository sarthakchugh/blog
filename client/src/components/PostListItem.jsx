import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import categoryMapper from '../util/categoryMapper';

const PostListItem = ({ post }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Image */}
            <div className="md:hidden lg:block lg:w-1/3">
                {post.cover_image && (
                    <Image
                        src={post.cover_image}
                        alt="Post List Image"
                        className={'rounded-2xl object-cover'}
                        w="735"
                    />
                )}
            </div>
            {/* Details */}
            <div className=" flex flex-col gap-4 lg:w-2/3">
                {/* Title */}
                <Link to={`/${post.slug}`} className="text-2xl md:text-4xl lg:text-3xl font-semibold">
                    {post.title}
                </Link>
                <div className="flex flex-wrap gap-2 text-gray-500 items-center leading-none text-sm ">
                    <span>Written by</span>
                    <Link to={`/posts?author=${post.user.username}`} className="text-blue-800">
                        {post.user.username}
                    </Link>
                    <span>on</span>
                    <Link to={`/posts?category=${post.category}`} className="text-blue-800">
                        {categoryMapper(post.category)}
                    </Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                <p className="md:text-lg lg:text-xl">{post.description.substring(0, 100)}...</p>
                <Link to={`/${post.slug}`} className="text-blue-800 underline">
                    Read more...
                </Link>
            </div>
        </div>
    );
};

export default PostListItem;
