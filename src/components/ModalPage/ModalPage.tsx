import React from 'react';
import {Form, Page, Quiz} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import {saveFormData, savePageData} from '../../redux/slices/sessionSlice';
import QuizPage from '../QuizPage';
import moment from 'moment';
import {data} from 'autoprefixer';

type Props = {
    quiz: Quiz;
    pageObj?: Page;
};

const ModalPage: React.FC<Props> = ({quiz, pageObj}) => {
    const page_opened_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const dispatch = useAppDispatch();

    if (!pageObj) return null;
    const onSubmit = async () => {
        dispatch(
            savePageData({
                quiz: quiz,
                pageData: {
                    page_id: pageObj.id,
                    page_opened_at: page_opened_at,
                    received_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            }),
        );
    };
    return (
        <div className="bg-[#303030] fixed inset-0 flex items-center justify-center custom-modal-window">
            <div className="py-[50px] px-[40px] bg-white rounded-md">
                <p className="lg:w-[394px] w-full">
                    {pageObj.title}
                    <span className="js-text-content" />
                </p>
                <button
                    onClick={onSubmit}
                    className="w-full flex items-center justify-center mt-8 py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px] js-custom-btn-next-section-2">
                    {pageObj.button_text}
                </button>
            </div>
        </div>
    );
};

ModalPage.whyDidYouRender = true;
export default React.memo(ModalPage);
