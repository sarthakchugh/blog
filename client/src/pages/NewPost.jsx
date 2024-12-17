import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegImage, FaFileVideo } from 'react-icons/fa6';
import Upload from '../components/Upload';
import Image from '../components/Image';
import { MdDeleteOutline } from 'react-icons/md';

const NewPost = () => {
    const navigate = useNavigate();

    // For the editor
    const [content, setContent] = useState('');

    // For the cover image
    const [coverImage, setCoverImage] = useState('');
    const [progress, setProgress] = useState(0);

    // For other images and videos
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');

    // Get token for authorization
    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/new`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: (res) => {
            toast.success('Post created successfully');
            navigate(`/${res.data.post.slug}`);
        },
        onError: (err) => {
            if (err.response.status === 500) {
                toast.error('Something went wrong');
            } else if (err.response.status === 400) {
                toast.error("Please make sure you've filled Title, Category, Description, and Content");
            }
        },
    });

    useEffect(() => {
        image && setContent((prev) => prev + `<p><img src="${image.url}" /></p>`);
    }, [image]);

    useEffect(() => {
        video && setContent((prev) => prev + `<p><video src="${video.url}" /></p>`);
    }, [video]);

    // Check Authorization
    const { isLoaded, isSignedIn } = useUser();
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (isLoaded && !isSignedIn) {
        return <div>Sign in to create a post</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            cover_image: coverImage.filePath || '',
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            content,
        };

        mutation.mutate(data);
    };

    return (
        <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
            <h1 className="text-lg md:text-xl font-light">Create a new post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 pb-6">
                {!coverImage ? (
                    <Upload type="image" setData={setCoverImage} setProgress={setProgress}>
                        <button
                            type="button"
                            className="md:w-1/3 bg-white rounded-xl py-4 px-8 text-gray-500 hover:text-blue-500 shadow-md"
                            name="cover_image"
                        >
                            Add a cover image
                        </button>
                    </Upload>
                ) : (
                    <div className="relative">
                        <Image
                            src={coverImage.filePath}
                            alt="Cover Image"
                            className={'rounded-2xl object-cover'}
                            w="735"
                        />
                        <button
                            type="button"
                            className="absolute top-4 right-4 md:left-[680px] md:right-auto bg-white rounded-xl p-2 shadow-md"
                            name="cover_image"
                            onClick={() => setCoverImage('')}
                        >
                            <MdDeleteOutline className="w-6 h-6 text-red-500" />
                        </button>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Title"
                    className="font-semibold text-2xl md:text-3xl lg:text-4xl bg-transparent p-4 outline-none"
                    name="title"
                />
                <select
                    name="category"
                    id="category"
                    className="p-4 md:w-1/3 rounded-xl shadow-md outline-none"
                >
                    <option value="">Choose a category</option>
                    <option value="webdev">Web Development</option>
                    <option value="ai">AI Development</option>
                    <option value="cyber">Cyber Security</option>
                    <option value="tech">Technology</option>
                    <option value="others">Others</option>
                </select>
                <textarea
                    name="description"
                    placeholder="Description"
                    className="p-4 rounded-xl shadow-md outline-none"
                />
                <div className="flex flex-1 relative">
                    <div className="flex flex-col md:flex-row gap-4 mr-2 md:absolute md:top-3 md:right-2">
                        <Upload type="image" setData={setImage} setProgress={setProgress}>
                            <FaRegImage />
                        </Upload>
                        <Upload type="video" setData={setVideo} setProgress={setProgress}>
                            <FaFileVideo />
                        </Upload>
                    </div>
                    <ReactQuill
                        theme="snow"
                        className="flex-1 rounded-xl shadow-md bg-white min-h-[300px]"
                        value={content}
                        onChange={setContent}
                        readOnly={progress > 0 && progress < 100}
                    />
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending || (progress > 0 && progress < 100)}
                    className="bg-blue-800 hover:bg-blue-700 text-white p-4 rounded-xl shadow-md md:w-48 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? 'Publishing...' : 'Publish'}
                </button>
            </form>
        </div>
    );
};

export default NewPost;
