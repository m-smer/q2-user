import React, {useEffect} from 'react';
import {Question} from '../../redux/types';
// import Swiper from 'swiper';
// import 'swiper/css';

type Props = {
    questionObj: Question;
};

const Slider: React.FC<Props> = ({questionObj}) => {
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
    );
};

export default Slider;
