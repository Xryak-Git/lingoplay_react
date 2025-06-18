/** @format */

import { Space } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Logo } from './Logo';

const SiteHeader = ({ children }) => {
    const breakpoint = useBreakpoint();
    return (
        <div
            style={{
                height: '80px',
                width: '100%',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                zIndex: '3',
            }}
        >
            {breakpoint.sm ? (
                <Space
                    style={{
                        width: '100%',
                        maxWidth: '1500px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px 0 20px',
                    }}
                >
                    <Space size={32}>{breakpoint.sm && <Logo />}</Space>
                    <Space size={28}>{children}</Space>
                </Space>
            ) : (
                <Space
                    style={{
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {children}
                </Space>
            )}
        </div>
    );
};

export { SiteHeader };
