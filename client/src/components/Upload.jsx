import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { IKContext, IKUpload } from 'imagekitio-react';

const authenticator = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({ setData, type, setProgress, children }) => {
    const ref = useRef(null);

    const onError = (err) => {
        console.log(err);
        toast.error('Image upload failed!');
    };

    const onSuccess = (res) => {
        setData(res);
    };

    const onUploadProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    };

    return (
        <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ref}
                useUniqueFileName
                onUploadProgress={onUploadProgress}
                onError={onError}
                onSuccess={onSuccess}
                className="hidden"
                accept={`${type}/*`}
            />
            <div className="cursor-pointer" onClick={() => ref.current.click()}>
                {children}
            </div>
        </IKContext>
    );
};

export default Upload;
