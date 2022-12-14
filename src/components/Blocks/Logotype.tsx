import React from 'react';
import {Image, Question} from '../../redux/types';

type Props = {
    images?: Image[];
};

const Logotype: React.FC<Props> = ({images}) => {
    if (!images || images.length === 0) return null;
    const image = images[0];

    return (
        <div className="logo my-6 flex items-center justify-center">
            <img className="max-h-[100px]" src={image.dataURL} alt="logo" />
        </div>
    );
};

export default Logotype;
