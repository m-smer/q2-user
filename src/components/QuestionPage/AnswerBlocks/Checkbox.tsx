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
    const {register, handleSubmit, watch} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });
    const checkedOptions = watch('answerOptionIds', []);

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
                    <label
                        key={ao.id}
                        htmlFor={'i' + ao.id}
                        className="px-[13px] py-[35px] flex text-base group w-full custom-btn-select-js-section-2 cursor-pointer checkbox_label">
                        <span className="mr-[20px] w-[22px] h-[22px] border-[3px] border-[#1A3661] ease-out duration-300 transition custom-btn-select-active-section-2" />
                        <input
                            onClick={() => eval(ao.onclick_action)}
                            type="checkbox"
                            value={ao.id}
                            id={'i' + ao.id}
                            className="w-0 h-0 custom-checkbox-select-js-section-2 hidden"
                            {...register('answerOptionIds')}
                        />
                        <span className="labelText">{ao.title}</span>
                    </label>
                ))}
                <input
                    disabled={checkedOptions.length === 0}
                    type="submit"
                    className="w-full flex items-center justify-center mt-8 py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px] custom-btn-next-section-3"
                />
            </form>
        </div>
    );
};

export default Checkbox;
