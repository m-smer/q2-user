import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
// @ts-ignore
import TagManager from 'react-gtm-module-custom-domain';

type Props = {
    quiz: Quiz;
};

const GoogleTagManager: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (!quiz.gtm_id) return;
        includeHeadScript();

        console.log('GTM: include');
    }, [quiz]);

    const includeHeadScript = () => {
        const tagManagerArgs = {
            gtmId: quiz.gtm_id,
        };

        TagManager.initialize(tagManagerArgs);
    };

    return null;
};

export default GoogleTagManager;
