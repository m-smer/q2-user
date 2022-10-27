import React from 'react';
import {Image, Question} from '../../redux/types';

type Props = {
    images?: Image[];
};

const SingleImage: React.FC<Props> = ({images}) => {
    if (!images || images.length === 0) return null;
    const image = images[0];

    return (
        <div>
            <img src={image.dataURL} className="w-full" alt="" />
        </div>
    );
};

export default SingleImage;
