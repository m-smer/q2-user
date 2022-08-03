import React from 'react';
import {Form, Quiz} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import {saveFormData} from '../../redux/slices/sessionSlice';
import QuizPage from '../QuizPage';
import moment from 'moment';

type Props = {
    quiz: Quiz;
    formObj?: Form;
};

type Inputs = {
    phone: string;
};

const FormPage: React.FC<Props> = ({quiz, formObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const {register, handleSubmit} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });
    const dispatch = useAppDispatch();

    console.log('Рендер объекта формы');
    if (!formObj) return null;
    const onSubmit = async (data: Inputs) => {
        dispatch(
            saveFormData({
                quiz: quiz,
                formData: {
                    ...data,
                    formId: formObj.id,
                    page_opened_at: page_opened_at,
                    received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            }),
        );
    };
    return (
        <div>
            <div>Форма: {formObj.title}</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Номер телефона"
                    className="border border-dashed"
                    {...register('phone', {
                        required: 'Пожалуйста, введите номер телефона',
                    })}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

FormPage.whyDidYouRender = true;
export default React.memo(FormPage);
