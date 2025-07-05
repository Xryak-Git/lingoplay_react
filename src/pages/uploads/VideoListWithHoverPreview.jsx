/** @format */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Flex, Card, Spin, Skeleton } from 'antd';

const { Text } = Typography;

export const VideoListWithHoverPreview = ({
    videos,
    openVideo,
    previewHeight = 300,
    loading,
}) => {
    if (loading) {
        return <Skeleton></Skeleton>;
    }

    return (
        <Flex wrap="wrap" gap={16} justify="flex-start">
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => openVideo(video)}
                    previewHeight={previewHeight}
                />
            ))}
        </Flex>
    );
};

const VideoCard = ({ video, onClick, previewHeight }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

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
        height: previewHeight,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
        display: 'block',
    };

    const mediaContent = isHovered ? (
        <video
            ref={videoRef}
            src={video.path}
            muted
            loop
            playsInline
            style={mediaStyle}
        />
    ) : video?.thumblnail_path ? (
        <img src={video.thumblnail_path} alt="Превью" style={mediaStyle} />
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
            style={{
                width: 'calc(25% - 12px)',
                minWidth: 160,
                flexShrink: 0,
                userSelect: 'none',
            }}
            styles={{ body: { padding: '8px' } }}
            cover={mediaContent}
        >
            <Text ellipsis style={{ width: '100%' }}>
                {video.title}
            </Text>
        </Card>
    );
};
