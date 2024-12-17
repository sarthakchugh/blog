import React from 'react';
import { MdBookmarkAdd, MdDeleteOutline, MdBookmarkAdded } from 'react-icons/md';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md';

const PostActions = ({ post }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        isPending,
        error,
        data: savedPosts,
    } = useQuery({
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

    const isAdmin = user?.publicMetadata?.role === 'admin';
    const isSaved = savedPosts?.data.savedPosts.some((savedPost) => savedPost._id === post._id) || false;

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            toast.success('Post deleted successfully');
            navigate('/');
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleDeletePost = () => {
        deleteMutation.mutate();
    };

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.patch(
                `${import.meta.env.VITE_API_URL}/api/users/save`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['savedPosts']);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleSavePost = () => {
        if (!user) {
            return navigate('/login');
        }
        saveMutation.mutate();
    };

    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.patch(
                `${import.meta.env.VITE_API_URL}/api/posts/feature`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['post', post.slug]);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleFeaturePost = () => {
        featureMutation.mutate();
    };

    return (
        <div>
            <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
            {isPending ? (
                'Loading...'
            ) : error ? (
                'Saved post fetching failed'
            ) : isSaved ? (
                <div className="flex items-center gap-2 text-sm cursor-pointer pb-2" onClick={handleSavePost}>
                    {/* icon */}
                    <MdBookmarkAdded className="w-6 h-6" />
                    <span>{saveMutation.isPending ? 'Removing...' : 'Post Saved'}</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm cursor-pointer pb-2" onClick={handleSavePost}>
                    {/* icon */}
                    <MdBookmarkAdd className="w-6 h-6" />
                    <span>{saveMutation.isPending ? 'Saving...' : 'Save this post'}</span>
                </div>
            )}
            {isAdmin ? (
                post.isFeatured ? (
                    <div
                        className="flex items-center gap-2 text-sm cursor-pointer pb-2"
                        onClick={handleFeaturePost}
                    >
                        {/* icon */}
                        <MdOutlineStar className="w-6 h-6 text-yellow-500" />
                        <span>{featureMutation.isPending ? 'Removing...' : 'Featured Post'}</span>
                    </div>
                ) : (
                    <div
                        className="flex items-center gap-2 text-sm cursor-pointer pb-2"
                        onClick={handleFeaturePost}
                    >
                        {/* icon */}
                        <MdOutlineStarBorder className="w-6 h-6" />
                        <span>{featureMutation.isPending ? 'Adding...' : 'Feature this post'}</span>
                    </div>
                )
            ) : null}
            {user && (post.user.username === user.username || isAdmin) && (
                <div
                    className="flex items-center gap-2 text-sm cursor-pointer pb-2"
                    onClick={handleDeletePost}
                >
                    {/* icon */}
                    <MdDeleteOutline className="w-6 h-6" color="red" />
                    <span>{deleteMutation.isPending ? 'Deleting...' : 'Delete this post'}</span>
                </div>
            )}
        </div>
    );
};

export default PostActions;
