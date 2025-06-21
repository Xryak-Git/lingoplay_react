/** @format */

import { Space, Flex } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Logo } from './Logo';
import React from 'react';

export const SiteHeader = ({ children }) => {
    const breakpoint = useBreakpoint();

    const containerStyle = {
        height: '80px',
        width: '100%',
        background: 'white',
        zIndex: 3,
    };

    const commonSpaceStyle = {
        width: '100%',
        alignItems: 'center',
    };

    return (
        <Flex style={containerStyle} justify="center" align="center">
            {breakpoint.sm ? (
                <Space
                    size={32}
                    style={{
                        ...commonSpaceStyle,
                        maxWidth: 1500,
                        justifyContent: 'space-between',
                        padding: '0 20px',
                    }}
                >
                    <Space size={32}>
                        <Logo />
                    </Space>
                    <Flex gap="large" align="center">
                        <Space size={28}>{children}</Space>
                    </Flex>
                </Space>
            ) : (
                <Space
                    size={32}
                    style={{
                        ...commonSpaceStyle,
                        justifyContent: 'space-evenly',
                    }}
                >
                    {children}
                </Space>
            )}
        </Flex>
    );
};
const HeaderItem = ({ children, ...props }) => {
    let styledChild = children;

    if (children?.type?.displayName === 'Button') {
        styledChild = React.cloneElement(children, {
            style: {
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
                fontSize: '24px',
                ...children.props.style,
            },
        });
    }

    return <div {...props}>{styledChild}</div>;
};

SiteHeader.Item = HeaderItem;
