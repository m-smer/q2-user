import React, {useEffect} from 'react';
import {Quiz} from '../../../redux/types';

type Props = {
    quiz: Quiz;
};

const Includes: React.FC<Props> = ({quiz}) => {
    useEffect(() => {
        if (quiz) {
            document.title = quiz.title;
            includeCssFile();
            includeJsFiles();
            includeFavicon();
        }
    }, [quiz]);

    const includeFavicon = () => {
        if (!quiz.favicons[0].dataURL) return;
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

    const includeJsFiles = () => {
        const resDir = process.env.REACT_APP_QUIZ_RESOURCE_DIR;

        const script_head = document.createElement('script');
        script_head.src = resDir + '/' + quiz.id + '/f_head.js';
        script_head.async = true;
        document.head.appendChild(script_head);

        const script_body = document.createElement('script');
        script_body.src = resDir + '/' + quiz.id + '/f_body.js';
        script_body.async = true;
        document.body.appendChild(script_body);
    };

    return null;
};

export default Includes;
