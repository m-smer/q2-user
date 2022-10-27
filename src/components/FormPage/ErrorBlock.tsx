import React from 'react';
import {Question} from '../../redux/types';

type Props = {
    message?: string;
};

const ErrorBlock: React.FC<Props> = ({message}) => {
    if (!message) return null;
    return <p className="text-sm pb-[10px] text-red-500">{message}</p>;
};

export default ErrorBlock;
