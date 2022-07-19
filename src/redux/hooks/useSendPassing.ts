import {useSession} from './useSession';
import {useSendPassingMutation} from '../services/passingDataApi';
import {useQuiz} from './useQuiz';

export const useSendPassing = () => {
    const session = useSession();
    const {data: quiz, isFetching, isLoading} = useQuiz();
    const [addSession, result] = useSendPassingMutation();

    return async () => {
        return (
            session?.id &&
            session?.passingData &&
            quiz?.id &&
            (await addSession({
                id: session.id,
                quiz_id: quiz.id,
                passingData: session.passingData,
            }))
        );
    };
};
