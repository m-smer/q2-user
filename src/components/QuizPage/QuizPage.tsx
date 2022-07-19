import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {useQuiz} from '../../redux/hooks/useQuiz';
import {useGetQuizQuery} from '../../redux/services/quizApi';
import QuizBlock from './QuizBlock';
import ActivityIndicator from '../ActivityIndicator';
import {useSelector} from 'react-redux';
import {
    initSession,
    selectSessions,
    setUTMs,
} from '../../redux/slices/sessionSlice';
import {useAppDispatch} from '../../redux/hooks';
import {useSendPassingMutation} from '../../redux/services/passingDataApi';
import {Result} from '../../redux/types';

const QuizPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {quizUrlId} = useParams<{quizUrlId: string}>();
    const {
        data: quiz,
        isFetching,
        isLoading,
    } = useGetQuizQuery(quizUrlId ?? '');
    const [searchParams, setSearchParams] = useSearchParams();
    const sessions = useSelector(selectSessions);
    const session = quizUrlId ? sessions[quizUrlId] : undefined;

    const utm_source = searchParams.get('utm_source');
    const utm_campaign = searchParams.get('utm_campaign');
    const utm_term = searchParams.get('utm_term');
    const utm_content = searchParams.get('utm_content');
    const utm_medium = searchParams.get('utm_medium');
    const utms = {
        utm_source: utm_source,
        utm_campaign: utm_campaign,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_medium: utm_medium,
    };
    const utmValues = Object.values(utms).reduce((str, current) => {
        return (str ?? '').concat(current ?? '');
    }, '');

    useEffect(() => {
        if (quiz && session) {
            console.log('setUTMs');
            dispatch(
                setUTMs({
                    quiz: quiz,
                    utms: utms,
                }),
            );
            setSearchParams([]);
        }
    }, [utmValues, quiz, session?.id]);

    useEffect(() => {
        if (quiz && session === undefined) {
            dispatch(initSession(quiz));
            console.log('Инициализирую сессию');
        }
    }, [session?.id, quiz?.id]);

    const [sendPassing, result] = useSendPassingMutation();

    const sendPassingToBackend = async () => {
        return (
            session?.id &&
            session?.passingData &&
            quiz?.id &&
            (await sendPassing({
                id: session.id,
                quiz_id: quiz.id,
                passingData: session.passingData,
            }))
        );
    };

    useEffect(() => {
        console.log('useEffect');
        if (!session?.actualPage || !session?.setUtms) return;
        sendPassingToBackend().then(() => {
            console.log('Отправка прохождения');
            const resultObj = session?.actualPage?.obj as Result;
            if (
                session?.actualPage?.type === 'result' &&
                resultObj.type === 'redirect'
            ) {
                window.location.href = resultObj.redirect_url;
            }
        });
    }, [session?.actualPage?.obj.id, session?.setUtms]);

    if (isFetching || isLoading || (quiz && !session?.actualPage?.obj))
        return <ActivityIndicator />;

    if (!quiz || !session) return <div>Квиз не найден</div>;

    return (
        <>
            <button onClick={sendPassingToBackend}>
                Отправить данные на сервер
            </button>

            <QuizBlock quizObj={quiz} session={session} />
        </>
    );
};

QuizPage.whyDidYouRender = true;
export default QuizPage;
