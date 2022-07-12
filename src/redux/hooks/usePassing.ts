import {useSelector} from 'react-redux';
import {selectPassings} from '../slices/passingSlice';
import {useParams} from 'react-router-dom';

export const usePassing = () => {
    const {quizUrlId} = useParams<{quizUrlId: string}>();
    const passings = useSelector(selectPassings);
    if (quizUrlId === undefined) return undefined;
    return passings[quizUrlId];
};
