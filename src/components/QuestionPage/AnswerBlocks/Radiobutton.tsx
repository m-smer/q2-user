import React from 'react';
import {Answer, Question} from '../../../redux/types';
import {useForm} from 'react-hook-form';
import moment from 'moment';

type Props = {
    questionObj: Question;
    setAnswer: (answer: Answer) => void;
};

type Inputs = {
    answerOptionId: string;
};

const Radiobutton: React.FC<Props> = ({setAnswer, questionObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
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
                page_opened_at: page_opened_at,
                received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
        );
    };

    return (
        <div>
            <form onChange={handleSubmit(onSubmit)}>
                {questionObj.answerOptions?.map(ao => (
                    <label
                        key={ao.id}
                        className="px-[13px] py-[35px] flex text-base group w-full custom-btn-time cursor-pointer checkbox_label">
                        <span className="mr-[20px] rounded-[50%] w-[22px] h-[22px] border-[3px] border-[#1A3661] ease-out duration-300 transition custom-btn-select-active-section-2" />
                        <input
                            type="radio"
                            className="w-0 h-0"
                            value={ao.id}
                            {...register('answerOptionId')}
                        />
                        {ao.title}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default Radiobutton;
