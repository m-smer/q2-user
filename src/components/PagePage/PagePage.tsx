import React from 'react';
import {Page, Quiz} from '../../redux/types';
import {useAppDispatch} from '../../redux/hooks';
import {savePageData} from '../../redux/slices/sessionSlice';
import moment from 'moment-timezone';
import Logotype from '../Blocks/Logotype';
import BookletImages from '../Blocks/BookletImages';

type Props = {
    quiz: Quiz;
    pageObj?: Page;
};

const PagePage: React.FC<Props> = ({quiz, pageObj}) => {
    const page_opened_at = moment()
        .tz('Europe/Moscow')
        .format('YYYY-MM-DD HH:mm:ss');
    const dispatch = useAppDispatch();

    if (!pageObj) return null;
    const onSubmit = async () => {
        dispatch(
            savePageData({
                quiz: quiz,
                pageData: {
                    page_id: pageObj.id,
                    page_opened_at: page_opened_at,
                    received_at: moment()
                        .tz('Europe/Moscow')
                        .format('YYYY-MM-DD HH:mm:ss'),
                },
            }),
        );
    };
    return (
        <div className="m-auto flex flex-col container px-[20px] items-center">
            <Logotype images={quiz.logotypes} />
            <div className="mb-8 overflow-hidden max-w-[350px]">
                <BookletImages images={pageObj.images} />
            </div>
            <div className="sm:text-5xl  max-w-[640px] sm:w-full text-center text-[32px] mb-10 text-dark text-[#000000] whitespace-pre-line mainTitle non-breaking-spaces">
                {pageObj.title}
            </div>
            {pageObj.description && (
                <div className="mb-8  text-[18px] whitespace-pre-line text-center max-w-[640px] mainText non-breaking-spaces">
                    {pageObj.description}
                </div>
            )}
            <button
                onClick={onSubmit}
                className="bg-[#1A3661] text-white sm:px-36 py-5 w-full sm:w-auto text-sm rounded-md custom-btn-1">
                {pageObj.button_text ? pageObj.button_text : 'Далее'}
            </button>
        </div>
    );
};

PagePage.whyDidYouRender = true;
export default React.memo(PagePage);
