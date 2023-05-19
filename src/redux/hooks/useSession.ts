import {useSelector} from 'react-redux';
import {selectSessions} from '../slices/sessionSlice';
import {useQuiz} from './useQuiz';

export const useSession = () => {
    const {data: quiz} = useQuiz();
    const sessions = useSelector(selectSessions);
    if (quiz === undefined) return undefined;
    return sessions[quiz.id];
};
