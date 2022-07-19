import {useSelector} from 'react-redux';
import {selectSessions} from '../slices/sessionSlice';
import {useParams} from 'react-router-dom';

export const useSession = () => {
    const {quizUrlId} = useParams<{quizUrlId: string}>();
    const sessions = useSelector(selectSessions);
    if (quizUrlId === undefined) return undefined;
    return sessions[quizUrlId];
};
