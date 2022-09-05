import React from 'react';
import {Quiz} from '../../redux/types';

type Props = {
    quiz: Quiz;
};

const CoverPage: React.FC<Props> = ({quiz}) => {
    return (
        <div>
            <h1 className="h1">{quiz.cover_title}</h1>
            <h4 className="h4">{quiz.cover_subtitle}</h4>
            <div>
                <p>{quiz.cover_text}</p>
            </div>
        </div>
    );
};

CoverPage.whyDidYouRender = true;
export default React.memo(CoverPage);
