import React, {useState} from 'react';
import {Image} from '../../../redux/types';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import VideoModal from './VideoModal';

type Props = {
    images?: Image[];
    video_url?: string;
};

const BookletImages: React.FC<Props> = ({images, video_url}) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    if (!images || images.length === 0) return null;

    const getImageType = (fileName: string) => {
        const arr = fileName.split('.');
        const ext = arr[arr.length - 1];
        switch (ext) {
            case 'webp':
                return 'image/webp';
            case 'png':
                return 'image/png';
            case 'jpg':
                return 'image/jpeg';
            case 'jpeg':
                return 'image/jpeg';
            default:
                return 'image/' + ext;
        }
    };

    return (
        <>
            <div className="w-full">
                <Swiper
                    modules={[Pagination, Navigation]}
                    navigation
                    pagination={{clickable: true}}>
                    {images.map((image, index) => {
                        if (!image.dataURL) return '';
                        const imgType = getImageType(image.dataURL);
                        return (
                            <SwiperSlide key={index}>
                                <picture>
                                    {imgType !== 'image/webp' &&
                                        image.hasWebpCopy && (
                                            <source
                                                type="image/webp"
                                                srcSet={image.dataURL + '.webp'}
                                            />
                                        )}
                                    <source
                                        type={imgType}
                                        srcSet={image.dataURL}
                                    />
                                    <img
                                        className="w-full rounded-md"
                                        src={image.dataURL}
                                        alt=""
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                    <div className="swiper-lazy-preloader" />
                                </picture>
                                {index === 0 && video_url ? (
                                    <img
                                        src="/assets/images/Subtract.png"
                                        alt=""
                                        className="absolute top-[33%] left-[40%]"
                                        id="video-modal"
                                        onClick={() => setVideoModalOpen(true)}
                                    />
                                ) : null}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            {video_url && (
                <VideoModal
                    setVideoModalOpen={setVideoModalOpen}
                    videoModalOpen={videoModalOpen}
                    video_url={video_url}
                />
            )}
        </>
    );
};

export default BookletImages;
