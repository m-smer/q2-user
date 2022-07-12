import {useParams} from 'react-router-dom';
import {useGetQuizQuery} from '../services/quizApi';

export const useQuiz = () => {
    const {quizUrlId} = useParams<{quizUrlId: string}>();
    //@ts-ignore
    return useGetQuizQuery(quizUrlId);
};
