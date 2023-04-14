import React from 'react';
import {Question} from '../../redux/types';

type Props = {
    questionObj: Question;
};

const Prompt: React.FC<Props> = ({questionObj}) => {
    let text;
    switch (questionObj.type) {
        case 'checkbox':
            text = 'Выберите один или несколько вариантов';
            break;
        case 'radiobutton':
            text = 'Выберите один вариант ответа';
            break;
        case 'textarea':
            text = 'Введите ваш ответ в поле';
            break;
        default:
            text = 'Ответьте на вопрос';
    }
    return (
        <p className="ml-[20px] prompt-info-text" id="prompt-line">
            {text}
        </p>
    );
};

export default Prompt;
