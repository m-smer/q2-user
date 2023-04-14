import React, {useEffect} from 'react';
import FormPage from '../../FormPage';
import QuestionPage from '../../QuestionPage';
import ResultPage from '../../ResultPage';
import {
    Form,
    Page,
    Question,
    Quiz,
    Result,
    SessionState,
} from '../../../redux/types';
import PagePage from '../../PagePage';
import CoverPage from '../../CoverPage';
import ModalPage from '../../ModalPage';
import {scrollOnMobileToId} from '../../../utils';
import {replaceNonBreakingSpaces} from '../../../utils';

type Props = {
    quizObj: Quiz;
    session: SessionState;
};

const QuizBlock: React.FC<Props> = ({quizObj, session}) => {
    useEffect(() => {
        if (session.actualPage?.obj.id !== quizObj.first_element_id) {
            scrollOnMobileToId('mainTitle');
        }
        replaceNonBreakingSpaces();
    }, [session.actualPage?.obj.id]);

    const showAction = () => {
        if (quizObj.status !== 'on') return <CoverPage quiz={quizObj} />;

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
            case 'page':
                const page = session.actualPage?.obj as Page;

                return page.is_modal ? (
                    <ModalPage quiz={quizObj} pageObj={page} />
                ) : (
                    <PagePage quiz={quizObj} pageObj={page} />
                );
            case 'result':
                return (
                    <ResultPage
                        quiz={quizObj}
                        resultObj={session.actualPage?.obj as Result}
                    />
                );
        }
        return null;
    };
    return showAction();
};

QuizBlock.whyDidYouRender = true;
export default React.memo(QuizBlock);
