import React from 'react';
import {Quiz} from '../../redux/types';
import {useSession} from '../../redux/hooks/useSession';

type Props = {
    quiz: Quiz;
};

const ProgressBar: React.FC<Props> = ({quiz}) => {
    const session = useSession();
    const num = session?.passingData?.answers
        ? Object.keys(session.passingData.answers).length + 1
        : undefined;
    return <p className="text-[#1A3661] font-medium">{num ? '№' + num : ''}</p>;
};

export default ProgressBar;
