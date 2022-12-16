import React from 'react';
import {Question} from '../../redux/types';
import Slider from './Slider';

type Props = {
    questionObj: Question;
};

const Booklet: React.FC<Props> = ({questionObj}) => {
    return (
        <>
            <Slider questionObj={questionObj} />

            {questionObj.subtitle || questionObj.description ? (
                <div className="px-[20px] pb-[70px] lg:mr-[10%] bg-[#F8F8F8] rounded-b-md">
                    {questionObj.subtitle && (
                        <h3 className="text-2xl font-bold mb-[10px]">
                            {questionObj.subtitle}
                        </h3>
                    )}
                    <div
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
