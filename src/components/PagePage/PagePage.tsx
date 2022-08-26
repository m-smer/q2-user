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

const PagePage: React.FC<Props> = ({quiz, pageObj}) => {
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
        console.log(123);
    };
    return (
        <div>
            <div>Страница: {pageObj.title}</div>
            <div>{pageObj.description}</div>

            <button className="border" onClick={onSubmit}>
                Далее
            </button>
        </div>
    );
};

PagePage.whyDidYouRender = true;
export default React.memo(PagePage);
