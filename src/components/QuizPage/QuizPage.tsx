import React, {useEffect} from 'react';
import {useQuiz} from '../../redux/hooks/useQuiz';
import QuizBlock from './QuizBlock';
import ActivityIndicator from '../ActivityIndicator';
import {initSession} from '../../redux/slices/sessionSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useSession} from '../../redux/hooks/useSession';
import {useUtms} from '../../redux/hooks/useUtms';

const QuizPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {data: quiz, isFetching, isLoading} = useQuiz();
    const session = useSession();
    const {utms, areUtmsEmpty} = useUtms();

    useEffect(() => {
        quiz && (document.title = quiz.title);
    });

    useEffect(() => {
        if (quiz && session === undefined) {
            console.log('Инициализирую сессию');
            dispatch(initSession({quiz, utms}));
        }
    }, [session?.id, quiz?.id]);

    if (isFetching || isLoading || (quiz && !session?.actualPage?.obj))
        return <ActivityIndicator />;

    if (!quiz || !session) return <div>Квиз не найден</div>;

    return (
        <>
            <QuizBlock quizObj={quiz} session={session} />
        </>
    );
};

QuizPage.whyDidYouRender = true;
export default QuizPage;
