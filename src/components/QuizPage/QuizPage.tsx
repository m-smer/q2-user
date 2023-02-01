import React, {useEffect, useState} from 'react';
import {useQuiz} from '../../redux/hooks/useQuiz';
import QuizBlock from './QuizBlock';
import ActivityIndicator from '../ActivityIndicator';
import {initSession, setUtms} from '../../redux/slices/sessionSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useSession} from '../../redux/hooks/useSession';
import {useUtms} from '../../redux/hooks/useUtms';
import {Quiz} from '../../redux/types';
import Includes from '../Blocks/Includes';

const QuizPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {data: quiz, isFetching, isLoading} = useQuiz();
    const session = useSession();
    const {utms} = useUtms();
    const [pageUpdated, setPageUpdated] = useState(true);

    useEffect(() => {
        const needInitSession =
            quiz && ((pageUpdated && !quiz.tenacious_sessions) || !session?.id);

        if (needInitSession) {
            console.log('Инициализирую сессию');
            setPageUpdated(false);
            dispatch(initSession({quiz}));
        }
    }, [quiz?.id]);

    useEffect(() => {
        if (quiz) {
            console.log('Записываю utm метки');
            dispatch(setUtms({quiz, utms}));
        }
    }, [
        quiz,
        utms.utm_campaign,
        utms.utm_medium,
        utms.utm_term,
        utms.utm_source,
        utms.utm_content,
    ]);

    if (isFetching || isLoading || (quiz && !session?.actualPage?.obj))
        return <ActivityIndicator />;

    if (!quiz || !session) return <div>Квиз не найден</div>;

    return (
        <>
            <Includes quiz={quiz} />
            <QuizBlock quizObj={quiz} session={session} />
        </>
    );
};

QuizPage.whyDidYouRender = true;
export default QuizPage;
