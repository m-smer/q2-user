import React from 'react';
import {Question, Quiz} from '../../redux/types';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/hooks';
import {Answer, saveQuestionData} from '../../redux/slices/passingSlice';
import Radiobutton from './AnswerBlocks/Radiobutton';
import Checkbox from './AnswerBlocks/Checkbox';

type Props = {
    quiz: Quiz;
    questionObj?: Question;
};

type Inputs = {
    // answer;
};

const QuestionPage: React.FC<Props> = ({quiz, questionObj}) => {
    const dispatch = useAppDispatch();
    if (!questionObj) return null;

    const setAnswer = async (answer: Answer) => {
        dispatch(
            saveQuestionData({
                quiz: quiz,
                question: questionObj,
                answer: answer,
            }),
        );
    };
    return (
        <div>
            <div>Вопрос: {questionObj.title}</div>

            {questionObj.type === 'radiobutton' &&
                questionObj.answerOptions && (
                    <Radiobutton
                        setAnswer={setAnswer}
                        questionObj={questionObj}
                    />
                )}

            {questionObj.type === 'checkbox' && questionObj.answerOptions && (
                <Checkbox setAnswer={setAnswer} questionObj={questionObj} />
            )}
        </div>
    );
};

export default QuestionPage;
