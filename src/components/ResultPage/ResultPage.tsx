import React from 'react';
import {Question, Result} from '../../redux/types';

type Props = {
    resultObj?: Result;
};

const ResultPage: React.FC<Props> = ({resultObj}) => {
    if (!resultObj) return null;
    return <div>Результат: {resultObj.title}</div>;
};

export default ResultPage;
