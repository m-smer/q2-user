import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import ReactGA from 'react-ga';
import {useSession} from '../../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const GoogleAnalytics: React.FC<Props> = ({quiz}) => {
    const session = useSession();

    useEffect(() => {
        if (!quiz.ga_id) return;
        includeHeadScript();

        console.log('GA: include');
    }, [quiz]);

    useEffect(() => {
        if (!quiz.ga_id) return;
        ReactGA.pageview(window.location.pathname + window.location.search);

        console.log('GA: pageview');
    }, [session?.actualPage?.obj, quiz.ga_id]);

    const includeHeadScript = () => {
        if (!quiz.ga_id) return;
        ReactGA.initialize(quiz.ga_id);
    };

    return null;
};

export default GoogleAnalytics;
