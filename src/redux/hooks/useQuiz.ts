import {useParams} from 'react-router-dom';
import {QuizIdArr, useGetQuizQuery} from '../services/quizApi';

export const useQuiz = () => {
    const {quizUrlId} = useParams<{quizUrlId: string}>();
    const domain = window.location.hostname;

    const quizIdArr: QuizIdArr = {
        url_id: quizUrlId,
        domain: domain
    };
    return useGetQuizQuery(quizIdArr);
};
