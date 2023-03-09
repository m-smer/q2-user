import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import {useSession} from '../../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const YandexMetrika: React.FC<Props> = ({quiz}) => {
    const session = useSession();
    const globalYMId = Number(process.env.REACT_APP_YMETRICA_GLOBAL_ID);

    useEffect(() => {
        includeHeadScript();

        // Подключение глобального счетчика метрики
        // @ts-ignore
        ym(globalYMId, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
        });

        if (!quiz.ym_id) {
            // @ts-ignore
            ym(quiz.ym_id, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
            });
        }
        console.log('Метрика: init');
    }, [quiz]);

    useEffect(() => {
        // @ts-ignore
        ym(globalYMId, 'hit', document.location.href);
        if (!quiz.ym_id) {
            // @ts-ignore
            ym(quiz.ym_id, 'hit', document.location.href);
        }
        console.log('Метрика: hit');
    }, [session?.actualPage?.obj?.id, quiz.ym_id]);

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

export default React.memo(YandexMetrika);
