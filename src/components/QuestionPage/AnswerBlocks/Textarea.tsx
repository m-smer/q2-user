import React from 'react';
import {Answer, AnswerOption, Question, Quiz} from '../../../redux/types';
import {useForm} from 'react-hook-form';
import {Simulate} from 'react-dom/test-utils';
import moment from 'moment';

type Props = {
    questionObj: Question;
    setAnswer: (answer: Answer) => void;
};

type Inputs = {
    answerText: string;
};

const Textarea: React.FC<Props> = ({setAnswer, questionObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const {register, handleSubmit, watch} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });
    const answerText = watch('answerText', '');

    const onSubmit = (data: Inputs) => {
        return setAnswer({
            answerOptionsIds: [],
            answerText: data.answerText,
            points: 0,
            page_opened_at: page_opened_at,
            received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-[15px] px-[20px] w-full h-[190px] border border-[#C7DDF1] rounded-[5px] text-base">
                    <textarea
                        {...register('answerText', {
                            required: 'Пожалуйста, введите ответ',
                        })}
                        className="outline-0 resize-none w-full h-full"
                    />
                </div>

                <input
                    disabled={answerText.length === 0}
                    type="submit"
                    className="w-full flex items-center justify-center mt-8 py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px] custom-btn-next-section-3"
                />
            </form>
        </div>
    );
};

export default Textarea;
