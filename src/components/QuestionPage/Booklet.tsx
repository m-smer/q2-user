import React from 'react';
import {Question} from '../../redux/types';
import BookletImages from '../Blocks/BookletImages';

type Props = {
    questionObj: Question;
};

const Booklet: React.FC<Props> = ({questionObj}) => {
    return (
        <>
            <div className="lg:pr-[10%]">
                <BookletImages
                    images={questionObj.images}
                    video_url={questionObj.video_url}
                />
            </div>

            {questionObj.subtitle || questionObj.description ? (
                <div className="px-[20px] mb-[10px] pb-[40px] lg:mr-[10%] bg-[#F8F8F8] rounded-b-md question-description">
                    {(questionObj.subtitle || questionObj.description) && (
                        <div className="h-[40px]" />
                    )}
                    {questionObj.subtitle && (
                        <h3 className="font-bold mb-[10px] text-[22px] leading-[1.25] whitespace-pre-line">
                            {questionObj.subtitle}
                        </h3>
                    )}
                    <div
                        className="mainText"
                        dangerouslySetInnerHTML={{
                            __html: questionObj.description,
                        }}
                    />
                </div>
            ) : null}
        </>
    );
};

export default Booklet;
