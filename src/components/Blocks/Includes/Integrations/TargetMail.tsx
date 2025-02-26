import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';
import {useSession} from '../../../../redux/hooks/useSession';
import {QUIZ_EVENTS} from '../../../../constants';

type Props = {
    quiz: Quiz;
};

const TargetMail: React.FC<Props> = ({quiz}) => {
    const session = useSession();

    const handleLead = (): void => {
        if (!quiz.tm_id) return;
        console.log('TM: получено событие: ' + QUIZ_EVENTS.formSent);

        // @ts-ignore
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({type: 'reachGoal', id: quiz.tm_id, goal: 'Lead'});
    };

    useEffect(() => {
        if (!quiz.tm_id) return;
        includeHeadScript();
        console.log('ТМ: include');

        document.addEventListener(QUIZ_EVENTS.formSent, handleLead);
        return () => {
            document.removeEventListener(QUIZ_EVENTS.formSent, handleLead);
        };
    }, [quiz]);

    useEffect(() => {
        if (!quiz.tm_id) return;
        //@todo переделать на custom Events
        // @ts-ignore
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({
            id: quiz.tm_id,
            type: 'pageView',
            start: new Date().getTime(),
            pid: 'USER_ID',
        });

        console.log('ТМ: pageView');
    }, [session?.actualPage?.obj?.id, quiz.tm_id]);

    const includeHeadScript = () => {
        const script1 = document.createElement('script');
        script1.innerHTML =
            '(function (d, w, id) {\n' +
            '  if (d.getElementById(id)) return;\n' +
            '  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;\n' +
            '  ts.src = "https://top-fwz1.mail.ru/js/code.js";\n' +
            '  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};\n' +
            '  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }\n' +
            '})(document, window, "tmr-code");';
        document.head.appendChild(script1);
    };

    return null;
};

export default TargetMail;
