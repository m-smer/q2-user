import React from 'react';

type Props = {
    setVideoModalOpen: (open: boolean) => void;
    videoModalOpen: boolean;
    video_url: string;
};

const VideoModal: React.FC<Props> = ({
    video_url,
    videoModalOpen,
    setVideoModalOpen,
}) => {
    return (
        <div
            className={
                'iframe-video-content-modal fixed inset-0  items-center justify-center bg-[#00000070] ' +
                (videoModalOpen ? 'flex' : 'hidden')
            }>
            <div className="relative bg-[#1A3661] ">
                <div
                    onClick={() => setVideoModalOpen(false)}
                    className="close-modal-btn absolute w-[38px] h-[38px] flex items-center justify-center bg-[#000] cursor-pointer"
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: video_url,
                    }}
                />
            </div>
        </div>
    );
};

export default VideoModal;
