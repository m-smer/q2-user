import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const Vkontakte: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (quiz.vk_id) {
            includeHeadScript();
        }
    }, [quiz]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.innerHTML =
            '!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("' +
            quiz.vk_id +
            '"),VK.Retargeting.Hit()},document.head.appendChild(t)}();';
        document.head.appendChild(script1);
    };

    return null;
};

export default Vkontakte;
