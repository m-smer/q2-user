import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import {useSession} from '../../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const YandexMetrika: React.FC<Props> = ({quiz}) => {
    const session = useSession();

    useEffect(() => {
        if (!quiz.ym_id) return;
        includeHeadScript();

        // @ts-ignore
        ym(quiz.ym_id, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
        });
        console.log('Метрика: init');
    }, [quiz]);

    useEffect(() => {
        if (!quiz.ym_id) return;

        // @ts-ignore
        ym(quiz.ym_id, 'hit', document.location.href);
        console.log('Метрика: hit');
    }, [session?.actualPage?.obj, quiz.ym_id]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.innerHTML =
            '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
            'm[i].l=1*new Date();\n' +
            'for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
            'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
            '(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");';
        document.head.appendChild(script1);
    };

    return null;
};

export default YandexMetrika;
