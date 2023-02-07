import React from 'react';
import {Answer, Question, Quiz} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import {saveQuestionData} from '../../redux/slices/sessionSlice';
import Radiobutton from './AnswerBlocks/Radiobutton';
import Checkbox from './AnswerBlocks/Checkbox';
import Textarea from './AnswerBlocks/Textarea';
import Prompt from './Prompt';
import Slider from './Slider';
import Logotype from '../Blocks/Logotype';
import Booklet from './Booklet';
import ProgressBar from '../QuizPage/QuizBlock/ProgressBar';
import QuestionNumber from './QuestionNumber';

type Props = {
    quiz: Quiz;
    questionObj?: Question;
};

const QuestionPage: React.FC<Props> = ({quiz, questionObj}) => {
    const dispatch = useAppDispatch();
    if (!questionObj) return null;

    const setAnswer = async (answer: Answer) => {
        dispatch(
            saveQuestionData({
                quiz: quiz,
                question: questionObj,
                answer: answer,
            }),
        );
    };
    return (
        <div className="m-auto px-[20px] section-1">
            <Logotype images={quiz.logotypes} />
            <div className="mb-8">
                <QuestionNumber quiz={quiz} />
                <ProgressBar quiz={quiz} />
            </div>
            <div className="flex items-center">
                <div className="">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="8"
                            cy="8"
                            r="8"
                            fill="#1A3661"
                            className="prompt_icon"
                        />
                        <path
                            d="M6.92759 5.724H9.07559V12H6.92759V5.724ZM7.99559 5.124C7.65959 5.124 7.37959 5.02 7.15559 4.812C6.93159 4.604 6.81959 4.34 6.81959 4.02C6.81959 3.7 6.93159 3.436 7.15559 3.228C7.37959 3.012 7.65959 2.904 7.99559 2.904C8.33159 2.904 8.61159 3.012 8.83559 3.228C9.06759 3.436 9.18359 3.7 9.18359 4.02C9.18359 4.34 9.06759 4.604 8.83559 4.812C8.61159 5.02 8.33159 5.124 7.99559 5.124Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <Prompt questionObj={questionObj} />
            </div>
            <div className="grid lg:grid-cols-2 mt-[4px] grid-cols-1">
                <div>
                    <div className="text-[22px] mb-[20px] lg:mr-[10%] leading-[1.25] whitespace-pre-line mainTitle">
                        {questionObj.title}
                    </div>
                    <Booklet questionObj={questionObj} />
                </div>
                <div>
                    {questionObj.type === 'radiobutton' &&
                        questionObj.answerOptions && (
                            <Radiobutton
                                setAnswer={setAnswer}
                                questionObj={questionObj}
                            />
                        )}

                    {questionObj.type === 'checkbox' &&
                        questionObj.answerOptions && (
                            <Checkbox
                                setAnswer={setAnswer}
                                questionObj={questionObj}
                            />
                        )}

                    {questionObj.type === 'textarea' && (
                        <Textarea
                            setAnswer={setAnswer}
                            questionObj={questionObj}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
