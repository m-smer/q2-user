import React from 'react';
import {Audio} from 'react-loader-spinner';

const ActivityIndicator: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <Audio
                    color="grey"
                    height={80}
                    width={80}
                    ariaLabel="loading-indicator"
                />
            </div>
        </div>
    );
};

export default ActivityIndicator;
