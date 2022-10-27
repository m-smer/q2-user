import React from 'react';
import {Question, Quiz, Result} from '../../redux/types';
import SingleImage from '../Blocks/SingleImage';
import Logotype from '../Blocks/Logotype';
import QuestionNumber from '../QuestionPage/QuestionNumber';
import ProgressBar from '../QuizPage/QuizBlock/ProgressBar';

type Props = {
    quiz: Quiz;
    resultObj?: Result;
};

const ResultPage: React.FC<Props> = ({quiz, resultObj}) => {
    if (!resultObj) return null;
    if (resultObj.type === 'redirect') {
        window.location.href = resultObj.redirect_url;
        return null;
    }
    return (
        <div className="m-auto px-[20px] section-7 pb-[30px]">
            <Logotype images={quiz.logotypes} />
            <div className="mb-8">
                <ProgressBar quiz={quiz} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-[4px]">
                <div className="mb-[20px] lg:mb-0 lg:border-r border-[#ccc]">
                    <h3 className="text-[28px] text-dark font-bold">
                        {resultObj.title}
                    </h3>
                </div>
                <div className="lg:pl-[30px]">
                    <SingleImage images={resultObj.images} />

                    <div className="p-[20px]">
                        <h3 className="text-xl">{resultObj.subtitle}</h3>
                        {resultObj.description}
                    </div>
                    {/*<button className="w-full flex items-center justify-center mt-[10px] py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px]">*/}
                    {/*    Посмотреть на сайте*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
