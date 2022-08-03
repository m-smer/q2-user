import React from 'react';
import FormPage from '../../FormPage';
import QuestionPage from '../../QuestionPage';
import ResultPage from '../../ResultPage';
import {Form, Question, Quiz, Result, SessionState} from '../../../redux/types';

type Props = {
    quizObj: Quiz;
    session: SessionState;
};

const QuizBlock: React.FC<Props> = ({quizObj, session}) => {
    const showAction = () => {
        switch (session.actualPage?.type) {
            case 'question':
                return (
                    <QuestionPage
                        quiz={quizObj}
                        questionObj={session.actualPage?.obj as Question}
                    />
                );
            case 'form':
                return (
                    <FormPage
                        quiz={quizObj}
                        formObj={session.actualPage?.obj as Form}
                    />
                );
            case 'result':
                return (
                    <ResultPage resultObj={session.actualPage?.obj as Result} />
                );
        }
        return null;
    };

    // console.log(session.passingData);
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                {quizObj.title} - {session?.id} {showAction()}
            </div>
        </div>
    );
};

QuizBlock.whyDidYouRender = true;
export default React.memo(QuizBlock);
