import React from 'react';
import {Quiz} from '../../redux/types';

type Props = {
    quiz: Quiz;
};

const CoverPage: React.FC<Props> = ({quiz}) => {
    return (
        <div>
            {quiz.cover_images?.length > 0 && (
                <div className="max-w-sm">
                    <img src={quiz.cover_images[0].dataURL} />
                </div>
            )}
            <h1 className="h1 mainTitle non-breaking-spaces">
                {quiz.cover_title}
            </h1>
            <h4 className="h4 non-breaking-spaces">{quiz.cover_subtitle}</h4>
            <div>
                <p className="mainText non-breaking-spaces">
                    {quiz.cover_text}
                </p>
            </div>
        </div>
    );
};

CoverPage.whyDidYouRender = true;
export default React.memo(CoverPage);
