import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import ReactGA from 'react-ga4';

type Props = {
    quiz: Quiz;
};

const GoogleAnalytics: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (!quiz.ga_id) return;
        includeHeadScript();

        console.log('GA: include');
    }, [quiz]);

    const includeHeadScript = () => {
        if (!quiz.ga_id) return;
        ReactGA.initialize(quiz.ga_id);
    };

    return null;
};

export default GoogleAnalytics;
