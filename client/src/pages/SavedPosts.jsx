import { useAuth, useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import PostListItem from '../components/PostListItem';

const SavedPosts = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const { isPending, error, data } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: async () => {
            if (user) {
                const token = await getToken();
                return axios.get(`${import.meta.env.VITE_API_URL}/api/users/saved`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                return { data: { savedPosts: [] } };
            }
        },
    });

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">Saved Posts</h1>
            {isPending && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data?.data?.savedPosts?.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {data?.data?.savedPosts?.map((post) => (
                        <PostListItem key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No saved posts found.</p>
            )}
        </div>
    );
};

export default SavedPosts;
