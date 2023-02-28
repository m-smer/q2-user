import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import {useSession} from '../../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const VkAds: React.FC<Props> = ({quiz}) => {
    const session = useSession();

    useEffect(() => {
        if (!quiz.vk_ads_id) return;
        includeHeadScript();

        console.log('VKAds: include');
    }, [quiz]);

    useEffect(() => {
        if (!quiz.vk_ads_id) return;

        // @ts-ignore
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({
            id: quiz.vk_ads_id,
            type: 'pageView',
            start: new Date().getTime(),
            pid: 'USER_ID',
        });

        _tmr.push({
            type: 'reachGoal',
            id: quiz.vk_ads_id,
            value: 'VALUE',
            goal: 'Page_View',
            params: {product_id: 'PRODUCT_ID'},
        });

        console.log('VKAds: pageView');
    }, [session?.actualPage?.obj?.id, quiz.vk_ads_id]);

    const includeHeadScript = () => {
        if (quiz.vk_ads_id) {
            const script = document.createElement('script');
            script.innerHTML =
                '(function (d, w, id) {\n' +
                '  if (d.getElementById(id)) return;\n' +
                '  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;\n' +
                '  ts.src = "https://top-fwz1.mail.ru/js/code.js";\n' +
                '  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};\n' +
                '  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }\n' +
                '})(document, window, "tmr-code");\n';
            document.head.appendChild(script);
        }
    };

    return null;
};

export default VkAds;
