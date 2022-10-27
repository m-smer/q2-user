import React, {useEffect, useState} from 'react';
import {Question} from '../../redux/types';
// import Swiper from 'swiper';
// import 'swiper/css';

type Props = {
    questionObj: Question;
};

const Slider: React.FC<Props> = ({questionObj}) => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    useEffect(() => {
        // @ts-ignore
        const swiper = new Swiper('.swiper', {
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }, [questionObj.id]);

    if (questionObj.images === undefined) return null;
    // const slides = questionObj.images?.map((img, index) => )

    return (
        <>
            <div className="custom-slider lg:mr-[30%] bg-[#F8F8F8] rounded-t-md">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {questionObj.images?.map((img, index) => (
                            <div className="swiper-slide" key={index}>
                                <div className="relative w-full iframe-video-content-modal-show">
                                    <img
                                        src={img.dataURL}
                                        alt=""
                                        className="w-full h-full"
                                    />
                                    {questionObj.video_url ? (
                                        <img
                                            src="/assets/images/Subtract.png"
                                            alt=""
                                            className="absolute top-[33%] left-[40%]"
                                            id="video-modal"
                                            onClick={() =>
                                                setVideoModalOpen(true)
                                            }
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>

                    {questionObj.images.length > 0 ? (
                        <>
                            <div className="swiper-pagination"></div>

                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </>
                    ) : null}
                </div>
            </div>
            {questionObj.video_url ? (
                <div
                    className={
                        'iframe-video-content-modal fixed inset-0  items-center justify-center bg-[#00000070] ' +
                        (videoModalOpen ? 'flex' : 'hidden')
                    }>
                    <div className="relative bg-[#1A3661] w-[60%] h-[50%]">
                        <div
                            onClick={() => setVideoModalOpen(false)}
                            className="close-modal-btn absolute w-[38px] h-[38px] flex items-center justify-center bg-[#000]"></div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Slider;
