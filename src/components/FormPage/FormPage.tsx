import React, {useEffect} from 'react';
import {
    apiValidationErrorResponse,
    Form,
    Quiz,
    FormData,
} from '../../redux/types';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import moment from 'moment-timezone';
import Logotype from '../Blocks/Logotype';
import ErrorBlock from './ErrorBlock';
import {saveFormData} from '../../redux/slices/sessionSlice';
import ProgressBar from '../QuizPage/QuizBlock/ProgressBar';
import {useValidateFormDataMutation} from '../../redux/services/passingDataApi';
import BookletImages from '../Blocks/BookletImages';
import {replaceNBSP} from '../../utils';
import PhoneInput from './PhoneInput';
import {QUIZ_EVENTS} from '../../constants';

type Props = {
    quiz: Quiz;
    formObj?: Form;
};

const FormPage: React.FC<Props> = ({quiz, formObj}) => {
    const page_opened_at = moment()
        .tz('Europe/Moscow')
        .format('YYYY-MM-DD HH:mm:ss');
    const [validate, result] = useValidateFormDataMutation();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        control,
    } = useForm<FormData>({
        shouldUseNativeValidation: false,
    });
    const dispatch = useAppDispatch();

    const errorFields = Object.keys(errors);
    useEffect(() => {
        // @ts-ignore
        const firstErrorKey = errorFields.find(key => errors[key]);
        if (firstErrorKey) {
            (
                document.querySelector(
                    `input[name="${firstErrorKey}"]`,
                ) as HTMLInputElement | null
            )?.focus();
        }
    }, [errorFields]);

    useEffect(() => {
        function handleResize() {
            document.getElementById('mainText')?.scrollIntoView();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                            received_at: moment()
                                .tz('Europe/Moscow')
                                .format('YYYY-MM-DD HH:mm:ss'),
                        },
                    }),
                );

                document.dispatchEvent(new CustomEvent(QUIZ_EVENTS.formSent));

                // раскомментировать для включения onsubmit_action
                // eval(formObj.onsubmit_action);
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
            <div className="mb-8 progress-bar-line">
                <ProgressBar quiz={quiz} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-[4px]">
                <div className="lg:mb-[20px] lg:mr-[10%]">
                    <h3 className="text-[22px] mb-[30px] text-[#19191A] font-black leading-[1.25] whitespace-pre-line mainTitle">
                        {replaceNBSP(formObj.title)}
                    </h3>
                    <BookletImages images={formObj.images} />
                    <p
                        className="text-[16px] text-[#19191A] font-normal leading-[1.5] mt-[30px] whitespace-pre-line mainText"
                        id="mainText">
                        {replaceNBSP(formObj.description)}
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
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Введите номер телефона',
                                        },
                                        minLength: {
                                            value: 11,
                                            message:
                                                'Недостаточно цифр в номере',
                                        },
                                        maxLength: {
                                            value: 11,
                                            message: 'Многовато цифр в номере',
                                        },
                                    }}
                                    render={({field}) => (
                                        <PhoneInput
                                            field_value={field.value}
                                            name={field.name}
                                            onChange={field.onChange}
                                        />
                                    )}
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
                                        required: 'Пожалуйста, введите email',
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
                            <span className="text-sm mainText">
                                Я согласен на обработку персональных данных и
                                результатов тестирования. А также принимаю
                                условия{' '}
                                <a href="/legal.html" target="_blank">
                                    политики конфиденциальности
                                </a>
                                .
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
