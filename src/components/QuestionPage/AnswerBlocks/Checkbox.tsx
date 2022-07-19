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
    answerOptionIds: string[];
};

const Checkbox: React.FC<Props> = ({setAnswer, questionObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const {register, handleSubmit} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });

    const onSubmit = (data: Inputs) => {
        return setAnswer({
            answerOptionsIds: data.answerOptionIds,
            points: calcPoints(data.answerOptionIds),
            page_opened_at: page_opened_at,
            received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    };

    const calcPoints = (answerOptionsIds: Inputs['answerOptionIds']) => {
        let remainingRightOptionsIds =
            questionObj.answerOptions
                ?.filter(ao => ao.is_right)
                .map(ao => ao.id) ?? [];
        let is_right = true;
        answerOptionsIds.map(aoid => {
            if (remainingRightOptionsIds.indexOf(aoid) === -1) {
                is_right = false;
                return false;
            } else {
                remainingRightOptionsIds = remainingRightOptionsIds.filter(
                    raoid => raoid !== aoid,
                );
            }
        });
        if (remainingRightOptionsIds.length !== 0) is_right = false;
        return is_right ? questionObj.correct_answer_points : 0;
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {questionObj.answerOptions?.map(ao => (
                    <p key={ao.id}>
                        <input
                            type={'checkbox'}
                            value={ao.id}
                            {...register('answerOptionIds')}
                        />
                        {ao.title}
                    </p>
                ))}
                <input type="submit" />
            </form>
        </div>
    );
};

export default Checkbox;
