import React, {useEffect, useState} from 'react';
import {useQuiz} from '../../redux/hooks/useQuiz';
import QuizBlock from './QuizBlock';
import ActivityIndicator from '../ActivityIndicator';
import {initSession} from '../../redux/slices/sessionSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useSession} from '../../redux/hooks/useSession';
import Includes from '../Blocks/Includes';

const QuizPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {data: quiz, isFetching, isLoading} = useQuiz();
    const session = useSession();
    const [pageUpdated, setPageUpdated] = useState(true);

    useEffect(() => {
        const needInitSession =
            quiz && ((pageUpdated && !quiz.tenacious_sessions) || !session?.id);
        //@todo разобраться и переделать
        if (needInitSession) {
            console.log('Инициализирую сессию');
            setPageUpdated(false);
            dispatch(initSession({quiz}));
        }
    }, [quiz?.id]);

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
