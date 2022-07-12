import React from 'react';
import {Question, Result} from '../../redux/types';

type Props = {
    resultObj?: Result;
};

const ResultPage: React.FC<Props> = ({resultObj}) => {
    if (!resultObj) return null;
    if (resultObj.type === 'redirect') {
        window.location.href = resultObj.redirect_url;
        return null;
    }
    return <div>Результат: {resultObj.title}</div>;
};

export default ResultPage;
