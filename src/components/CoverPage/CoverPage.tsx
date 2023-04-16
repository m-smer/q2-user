import React from 'react';
import {Quiz} from '../../redux/types';
import {replaceNBSP} from '../../utils';

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
            {quiz.cover_title && (
                <h1 className="h1 mainTitle">
                    {replaceNBSP(quiz.cover_title)}
                </h1>
            )}
            {quiz.cover_subtitle && (
                <h4 className="h4">{replaceNBSP(quiz.cover_subtitle)}</h4>
            )}
            {quiz.cover_subtitle && (
                <div>
                    <p className="mainText">{replaceNBSP(quiz.cover_text)}</p>
                </div>
            )}
        </div>
    );
};

CoverPage.whyDidYouRender = true;
export default React.memo(CoverPage);
