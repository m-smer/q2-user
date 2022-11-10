import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const GoogleAnalytics: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (quiz.ga_id) {
            includeHeadScript();
        }
    }, [quiz]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = '//www.google-analytics.com/analytics.js';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML =
            '    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;\n' +
            '    ga("create", "' +
            quiz.ga_id +
            '", "auto");\n' +
            '    ga("send", "pageview");';
        document.head.appendChild(script2);
    };

    return null;
};

export default GoogleAnalytics;
