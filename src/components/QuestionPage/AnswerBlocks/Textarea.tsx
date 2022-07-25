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
    const {register, handleSubmit} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });

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
                <input
                    className="border"
                    type={'text'}
                    {...register('answerText', {
                        required: 'Пожалуйста, введите ответ',
                    })}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Textarea;
