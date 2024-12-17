import React from 'react';
import Image from './Image';
import { format } from 'timeago.js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Comment = ({ comment, postId }) => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const role = user?.publicMetadata?.role;

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-4">
            {/* userinfo */}
            <div className="flex items-center gap-4">
                {comment.user.image && (
                    <img src={comment.user.image} alt="Comment User" className={'w-8 h-8 rounded-full'} />
                )}
                <span className="font-semibold text-blue-800 text-sm md:text-base">
                    {comment.user.username}
                </span>
                <span className="text-gray-500 text-sm">
                    {comment.createdAt === 'Sending...' ? (
                        comment.createdAt
                    ) : deleteMutation.isPending ? (
                        <span className="text-red-500">Deleting...</span>
                    ) : (
                        format(comment.createdAt)
                    )}
                </span>
                {user && (user._id === comment.user._id || role === 'admin') && (
                    <button onClick={handleDelete} className="text-red-500 ml-auto cursor-pointer">
                        <MdDeleteOutline className="w-6 h-6" />
                    </button>
                )}
            </div>
            {/* text */}
            <p className="text-sm md:text-base text-justify">{comment.content}</p>
        </div>
    );
};

export default Comment;
