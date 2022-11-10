import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const Comagic: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (quiz.comagic_site_key) {
            includeHeadScript();
        }
    }, [quiz]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.innerHTML =
            'var __cs = __cs || [];\n' +
            '__cs.push(["setCsAccount", "' +
            quiz.comagic_site_key +
            '"]);';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.async = true;
        script2.src = 'https://app.uiscom.ru/static/cs.min.js';
        document.head.appendChild(script2);
    };

    return null;
};

export default Comagic;
