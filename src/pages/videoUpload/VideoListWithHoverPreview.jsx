/** @format */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Flex, Card, Spin } from 'antd';

const { Text } = Typography;

export const VideoListWithHoverPreview = ({ videos, openVideo }) => (
    <Flex wrap gap={16} justify="flex-start">
        {videos.map((video) => (
            <VideoCard
                key={video.id}
                video={video}
                onClick={() => openVideo(video)}
            />
        ))}
    </Flex>
);

// TODO: можно попробовать react-hover-video-player когда tumblnail будет в ответе приходить
const VideoCard = ({ video, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        getVideoThumbnail(video.url)
            .then(setThumbnail)
            .catch(() => setThumbnail(null));
    }, [video.url]);

    useEffect(() => {
        const ref = videoRef.current;
        if (!ref) return;

        if (isHovered) {
            ref.play();
        } else {
            ref.pause();
            ref.currentTime = 0;
        }
    }, [isHovered]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const mediaStyle = {
        height: 120,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
        display: 'block',
    };

    const mediaContent = isHovered ? (
        <video
            ref={videoRef}
            src={video.url}
            muted
            loop
            playsInline
            style={mediaStyle}
        />
    ) : thumbnail ? (
        <img src={thumbnail} alt="Превью" style={mediaStyle} />
    ) : (
        <div
            style={{
                ...mediaStyle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
            }}
        >
            <Spin size="small" />
        </div>
    );

    return (
        <Card
            hoverable
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ width: 200, flexShrink: 0, userSelect: 'none' }}
            cover={mediaContent}
            bodyStyle={{ padding: '8px' }}
        >
            <Text ellipsis style={{ width: '100%' }}>
                {video.title}
            </Text>
        </Card>
    );
};

const getVideoThumbnail = (videoUrl, seekTo = 2) =>
    new Promise((resolve, reject) => {
        const video = document.createElement('video');
        Object.assign(video, {
            crossOrigin: 'anonymous',
            src: videoUrl,
            muted: true,
            playsInline: true,
            preload: 'metadata',
        });

        video.addEventListener('loadedmetadata', () => {
            video.currentTime = video.duration < seekTo ? 0 : seekTo;
        });

        video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            canvas
                .getContext('2d')
                .drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/png'));
            video.remove();
        });

        video.addEventListener('error', () => reject('Ошибка загрузки видео'));
    });
