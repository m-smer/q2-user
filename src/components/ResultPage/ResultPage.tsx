import React, {useEffect} from 'react';
import {Quiz, Result} from '../../redux/types';
import Logotype from '../Blocks/Logotype';
import ProgressBar from '../QuizPage/QuizBlock/ProgressBar';
import {replaceMacrosToUtms} from '../../utils';
import {useSession} from '../../redux/hooks/useSession';
import {initSession} from '../../redux/slices/sessionSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useNavigate} from 'react-router-dom';
import BookletImages from '../Blocks/BookletImages';

type Props = {
    quiz: Quiz;
    resultObj?: Result;
};

const ResultPage: React.FC<Props> = ({quiz, resultObj}) => {
    const dispatch = useAppDispatch();
    const session = useSession();
    const navigate = useNavigate();

    const recreateSession = () => {
        dispatch(initSession({quiz}));
    };

    useEffect(() => {
        if (resultObj?.type === 'redirect' && session) {
            recreateSession();
            navigate('/redirect');
            window.location.href = replaceMacrosToUtms(
                resultObj.redirect_url,
                session,
            );
        }
    }, [resultObj?.type]);

    if (!resultObj) return null;

    return (
        <div className="m-auto px-[20px] section-7 pb-[30px]">
            <Logotype images={quiz.logotypes} />
            <div className="mb-8 progress-bar-line">
                <ProgressBar quiz={quiz} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-[4px]">
                <div className="mb-[20px] lg:mb-0 lg:border-r border-[#ccc] result_left">
                    <h3 className="text-[28px] text-dark font-bold">
                        {resultObj.title}
                    </h3>
                </div>
                <div className="lg:pl-[30px]">
                    <BookletImages images={resultObj.images} />

                    <div className="p-[20px]">
                        <h3 className="text-xl">{resultObj.subtitle}</h3>
                        {resultObj.description}
                    </div>

                    {quiz.tenacious_sessions ? (
                        <button
                            onClick={recreateSession}
                            className="w-full flex items-center justify-center mt-[10px] py-[22px] bg-[#1A3661] uppercase text-white rounded-[5px]">
                            Пройти квиз заново
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
