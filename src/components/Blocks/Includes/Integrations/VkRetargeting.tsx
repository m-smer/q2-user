import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const VkRetargeting: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (!quiz.vk_id) return;
        includeHeadScript();

        console.log('VKRet: include');
    }, [quiz]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://vk.com/js/api/openapi.js?169';
        script1.onload = () => {
            // @ts-ignore
            VK.Retargeting.Init(quiz.vk_id);
            // @ts-ignore
            VK.Retargeting.Hit();
        };
        document.head.appendChild(script1);
    };

    return null;
};

export default VkRetargeting;
