import React, {useEffect} from 'react';
import {Quiz} from '../../../../redux/types';

type Props = {
    quiz: Quiz;
};

const GoogleTagManager: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (quiz.gtm_id) {
            includeHeadScript();
        }
    }, [quiz]);

    const includeHeadScript = () => {
        const script = document.createElement('script');
        script.innerHTML =
            '    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":\n' +
            '            new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],\n' +
            '        j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=\n' +
            '        "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);\n' +
            '    })(window,document,"script","dataLayer","' +
            quiz.gtm_id +
            '");';
        document.head.appendChild(script);
    };

    return null;
};

export default GoogleTagManager;
