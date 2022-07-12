import React, {useEffect} from 'react';
import ActivityIndicator from '../ActivityIndicator';
import {usePassing} from '../../redux/hooks/usePassing';
import {useQuiz} from '../../redux/hooks/useQuiz';
import {useAppDispatch} from '../../redux/hooks';
import {initSession} from '../../redux/slices/passingSlice';
import FormPage from '../FormPage';
import QuestionPage from '../QuestionPage';
import ResultPage from '../ResultPage';
import {Form, Question, Result} from '../../redux/types';

export default function Quiz() {
    const {data: quiz, isFetching, isLoading} = useQuiz();
    const passing = usePassing();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (quiz && passing === undefined) dispatch(initSession(quiz));
    }, [passing, quiz]);

    if (isFetching || isLoading || (quiz && !passing))
        return <ActivityIndicator />;
    if (!quiz || !passing) return <div>Квиз не найден</div>;

    console.log(passing);

    const showAction = () => {
        switch (passing.actualPage?.type) {
            case 'question':
                return (
                    <QuestionPage
                        quiz={quiz}
                        questionObj={passing.actualPage?.obj as Question}
                    />
                );
            case 'form':
                return (
                    <FormPage
                        quiz={quiz}
                        formObj={passing.actualPage?.obj as Form}
                    />
                );
            case 'result':
                return (
                    <ResultPage resultObj={passing.actualPage?.obj as Result} />
                );
        }
    };

    return (
        <>
            {quiz.title} - {passing?.sessionId} {showAction()}
        </>
    );
}
