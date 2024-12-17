import { IKImage } from 'imagekitio-react';

const Image = ({ src, className, w, h, alt }) => {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            path={src || '/default.jpg'}
            className={className}
            width={w}
            height={h}
            alt={alt}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            transformation={[{ width: w, height: h }]}
        />
    );
};

export default Image;
