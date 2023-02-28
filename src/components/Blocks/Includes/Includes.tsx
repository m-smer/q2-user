import React, {useEffect} from 'react';
import {Quiz} from '../../../redux/types';
import Calltouch from './Integrations/Calltouch';
import YandexMetrika from './Integrations/YandexMetrika';
import VkRetargeting from './Integrations/VkRetargeting';
import TargetMail from './Integrations/TargetMail';
import GoogleAnalytics from './Integrations/GoogleAnalytics';
import GoogleTagManager from './Integrations/GoogleTagManager';
import VkAds from './Integrations/VkAds';
import Jivosite from './Integrations/Jivosite';
import {useSession} from '../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const Includes: React.FC<Props> = ({quiz}) => {
    const session = useSession();

    useEffect(() => {
        includeCssFile();
        includeFavicon();
    }, [quiz]);

    useEffect(() => {
        document.title = session?.actualPage?.obj?.title
            ? session?.actualPage?.obj?.title + ' - ' + quiz.title
            : quiz.title;
    }, [session?.actualPage?.obj]);

    const includeFavicon = () => {
        if (!quiz.favicons[0]?.dataURL) return;
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = quiz.favicons[0].dataURL;
        document.head.appendChild(link);
    };

    const includeCssFile = () => {
        const resDir = process.env.REACT_APP_QUIZ_RESOURCE_DIR;
        const css = document.createElement('link');
        css.href = resDir + '/' + quiz.id + '/f.css';
        css.rel = 'stylesheet';
        document.head.appendChild(css);
    };

    return (
        <>
            <Calltouch quiz={quiz} />
            <YandexMetrika quiz={quiz} />
            <VkRetargeting quiz={quiz} />
            <VkAds quiz={quiz} />
            <TargetMail quiz={quiz} />
            <GoogleAnalytics quiz={quiz} />
            <GoogleTagManager quiz={quiz} />
            <Jivosite quiz={quiz} />
        </>
    );
};

export default React.memo(Includes);
