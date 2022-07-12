import React from 'react';
import {AnswerOption, Question, Quiz} from '../../../redux/types';
import {useForm} from 'react-hook-form';
import {Answer} from '../../../redux/slices/passingSlice';
import {Simulate} from 'react-dom/test-utils';

type Props = {
    questionObj: Question;
    setAnswer: (answer: Answer) => void;
};

type Inputs = {
    answerOptionId: string;
};

const Radiobutton: React.FC<Props> = ({setAnswer, questionObj}) => {
    const {register, handleSubmit} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });

    const onSubmit = (data: Inputs) => {
        const ao = questionObj.answerOptions?.find(
            a => a.id === data.answerOptionId,
        );
        return (
            ao &&
            setAnswer({
                answerOptionsIds: [ao.id],
                points: ao.points,
            })
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {questionObj.answerOptions?.map(ao => (
                    <p key={ao.id}>
                        <input
                            type={'radio'}
                            value={ao.id}
                            {...register('answerOptionId')}
                        />
                        {ao.title}
                    </p>
                ))}
                <input type="submit" />
            </form>
        </div>
    );
};

export default Radiobutton;
