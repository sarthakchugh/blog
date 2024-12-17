import React from 'react';
import Comment from './Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const fetchComments = async (postId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${postId}`);
    return response.data;
};

const Comments = ({ postId }) => {
    const { getToken } = useAuth();
    const { user } = useUser();

    const { isPending, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();
            return await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
        },
        onError: (err) => {
            if (err.response.status === 401) {
                toast.error('You must be logged in to comment');
            } else {
                toast.error(err.response.data.message);
            }
        },
    });

    const handleComment = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            content: formData.get('comment'),
        };
        mutation.mutate(data);
        e.target.comment.value = '';
    };

    return (
        <div className="flex flex-col gap-8 md:w-3/4">
            <h1 className="underline text-lg md:text-xl lg:text-2xl text-gray-500">Comments</h1>
            <form onSubmit={handleComment} className="flex items-center justify-between gap-8">
                <textarea
                    disabled={!user}
                    name="comment"
                    id="comment"
                    placeholder={user ? 'Write a comment...' : 'You must be logged in to comment'}
                    className="w-full p-4 rounded-xl shadow-lg"
                />
                <button
                    disabled={!user}
                    className="bg-blue-800 text-white px-4 py-3 font-medium rounded-xl shadow-lg"
                >
                    Send
                </button>
            </form>
            {isPending ? (
                'Loading comments...'
            ) : error ? (
                'Error loading comments'
            ) : (
                <>
                    {user && mutation.isPending && (
                        <Comment
                            comment={{
                                content: `${mutation.variables.content}`,
                                createdAt: 'Sending...',
                                user: {
                                    username: user.username,
                                    image: user.imageUrl,
                                },
                            }}
                        />
                    )}
                    {data.comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} postId={postId} />
                    ))}
                </>
            )}
        </div>
    );
};

export default Comments;
