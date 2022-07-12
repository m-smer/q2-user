import React from 'react';
import {Form, Quiz} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import {saveFormData} from '../../redux/slices/passingSlice';

type Props = {
    quiz: Quiz;
    formObj?: Form;
};

type Inputs = {
    phone: string;
};

const FormPage: React.FC<Props> = ({quiz, formObj}) => {
    const {register, handleSubmit} = useForm<Inputs>({
        shouldUseNativeValidation: true,
    });
    const dispatch = useAppDispatch();

    if (!formObj) return null;
    const onSubmit = async (data: Inputs) => {
        dispatch(
            saveFormData({quiz: quiz, formData: {...data, formId: formObj.id}}),
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

export default FormPage;
