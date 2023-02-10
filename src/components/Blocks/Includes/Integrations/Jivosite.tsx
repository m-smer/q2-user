import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const Jivosite: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (!quiz.jivosite_id) return;
        includeHeadScript();

        console.log('Jivosite: init');
    }, [quiz]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = '//code.jivo.ru/widget/' + quiz.jivosite_id;
        document.head.appendChild(script1);
    };

    return null;
};

export default Jivosite;
