import React from 'react';
import {Quiz} from '../../../redux/types';
import {useSession} from '../../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const ProgressBar: React.FC<Props> = ({quiz}) => {
    const session = useSession();
    const num = session?.passingData?.answers
        ? Object.keys(session.passingData.answers).length
        : undefined;

    const getPercents = (): number => {
        if (session?.actualPage?.type === 'result') return 100;
        return num ? (num / quiz.questions.length) * 100 : 0;
    };

    return (
        <div className="w-full h-[16px] bg-[#C7DDF1] mt-[3px] rounded-[3px] relative progress-bar-bg">
            <div
                className="absolute top-0 left-0 rounded-[3px] h-full bg-[#1A3661] progress-bar"
                style={{width: getPercents() + '%'}}
            />
        </div>
    );
};

export default ProgressBar;
