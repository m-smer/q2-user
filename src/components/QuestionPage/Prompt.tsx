import React from 'react';
import {Question} from '../../redux/types';

type Props = {
    questionObj: Question;
};

const Prompt: React.FC<Props> = ({questionObj}) => {
    let text;
    switch (questionObj.type) {
        case 'checkbox':
            text = 'выберите один или несколько вариантов';
            break;
        case 'radiobutton':
            text = 'выберите один вариант ответа';
            break;
        case 'textarea':
            text = 'введите ваш ответ в поле';
            break;
        default:
            text = 'ответьте на вопрос';
    }
    return <p className="ml-[10px] prompt-info-text">{text}</p>;
};

export default Prompt;
