import React from 'react';
import {
    apiValidationErrorResponse,
    Form,
    Quiz,
    FormData,
} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import moment from 'moment';
import Logotype from '../Blocks/Logotype';
import InputMask from 'react-input-mask';
import ErrorBlock from './ErrorBlock';
import {saveFormData} from '../../redux/slices/sessionSlice';
import ProgressBar from '../QuizPage/QuizBlock/ProgressBar';
import SingleImage from '../Blocks/SingleImage';
import {useValidateFormDataMutation} from '../../redux/services/passingDataApi';

type Props = {
    quiz: Quiz;
    formObj?: Form;
};

const FormPage: React.FC<Props> = ({quiz, formObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const [validate, result] = useValidateFormDataMutation();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormData>({
        shouldUseNativeValidation: false,
    });
    const dispatch = useAppDispatch();

    if (!formObj) return null;
    const onSubmit = async (data: Partial<FormData>) => {
        const forValidate = {
            ...data,
            form_id: formObj.id,
        };

        await validate(forValidate)
            .unwrap()
            .then(() => {
                dispatch(
                    saveFormData({
                        quiz: quiz,
                        formData: {
                            ...data,
                            extra_data: {
                                comagic: eval(
                                    "(typeof Comagic === 'function' ? Comagic?.getCredentials() : [])",
                                ),
                                calltouch: {
                                    sessionId: eval(
                                        "typeof window.ct === 'function' ? window.ct('calltracking_params','" +
                                            quiz.calltouch_mod_id +
                                            "')?.sessionId : null",
                                    ),
                                    requestUrl: eval('location.href'),
                                },
                            },
                            formId: formObj.id,
                            page_opened_at: page_opened_at,
                            received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        },
                    }),
                );
                eval(formObj.onsubmit_action);
            })
            .catch((response: apiValidationErrorResponse<FormData>) => {
                console.log(response);
                response.data.map(err =>
                    setError(err.field, {
                        type: 'manual',
                        message: err.message,
                    }),
                );
            });
    };

    return (
        <div className="m-auto px-[20px] section-6 pb-[30px]">
            <Logotype images={quiz.logotypes} />
            <div className="mb-8">
                <ProgressBar quiz={quiz} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-[4px]">
                <div className="lg:mb-[20px] lg:mr-[30%]">
                    <h3 className="text-[34px] text-[#19191A] font-bold">
                        {formObj.title}
                    </h3>
                    <SingleImage images={formObj.images} />
                    <p className="text-[22px] text-[#19191A] font-normal">
                        {formObj.description}
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formObj.show_name_field ? (
                            <>
                                <input
                                    placeholder="Имя"
                                    className="mb-[10px] py-[15px] px-[20px] w-full border border-[#C7DDF1] rounded-[5px] text-base outline-0 text_input"
                                    {...register('name', {
                                        required: 'Пожалуйста, введите имя',
                                    })}
                                />

                                <ErrorBlock message={errors.name?.message} />
                            </>
                        ) : null}

                        {formObj.show_surname_field ? (
                            <>
                                <input
                                    placeholder="Фамилия"
                                    className="mb-[10px] py-[15px] px-[20px] w-full border border-[#C7DDF1] rounded-[5px] text-base outline-0 text_input"
                                    {...register('surname', {
                                        required: 'Пожалуйста, введите фамилию',
                                    })}
                                />
                                <ErrorBlock message={errors.surname?.message} />
                            </>
                        ) : null}

                        {formObj.show_phone_field ? (
                            <>
                                <InputMask
                                    mask={'+7 (999) 999-99-99'}
                                    // alwaysShowMask={true}
                                    placeholder="Номер телефона"
                                    // onBlur={onBlur}
                                    {...register('phone', {
                                        setValueAs: value => {
                                            return value.replace(/\D/g, '');
                                        },
                                        required: 'Пожалуйста, введите телефон',
                                        minLength: {
                                            value: 11,
                                            message: 'Неверно введен телефон',
                                        },
                                        maxLength: {
                                            value: 11,
                                            message: 'Неверно введен телефон',
                                        },
                                    })}
                                    className="mb-[10px] py-[15px] px-[20px] w-full border border-[#C7DDF1] rounded-[5px] text-base outline-0 text_input"
                                />
                                <ErrorBlock message={errors.phone?.message} />
                            </>
                        ) : null}

                        {formObj.show_email_field ? (
                            <>
                                <input
                                    placeholder="Email"
                                    className="mb-[10px] py-[15px] px-[20px] w-full border border-[#C7DDF1] rounded-[5px] text-base outline-0 text_input"
                                    {...register('email', {
                                        required:
                                            'Пожалуйста, введите номер email',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Неверно введен email',
                                        },
                                    })}
                                />
                                <ErrorBlock message={errors.email?.message} />
                            </>
                        ) : null}
                        <label className="flex my-checkbox pl-[36px] pointer relative agreement">
                            <input
                                defaultChecked={true}
                                type="checkbox"
                                className="absolute opacity-0 pointer h-0 w-0"
                            />
                            <span className="checkmark" />
                            <span className="text-sm">
                                Я согласен на обработку персональных данных и
                                результатов тестирования.
                                <br />А также принимаю условия политики
                                конфиденциальности.
                            </span>
                        </label>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center mt-8 py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px] js-custom-btn-next-section-7">
                            отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

FormPage.whyDidYouRender = true;
export default React.memo(FormPage);
