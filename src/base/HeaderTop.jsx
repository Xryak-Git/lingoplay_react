/** @format */

import {
    Affix,
    Dropdown,
    Form,
    Menu,
    Spin,
    Flex,
    Skeleton,
    Button,
} from 'antd';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { LoginModal } from '../users/auth/LoginModal';
import { useUser, useLogout } from '../users/auth/api/api';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

export default function HeaderTop() {
    const { user, isLoading } = useUser();
    const { mutate } = useLogout();
    const [visibleModalLogin, setVisibleModalLogin] = useState(false);

    console.log('user', user);

    useLayoutEffect(() => {
        const links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (
                link.getAttribute('href') &&
                link.getAttribute('rel') === 'external'
            )
                link.target = '_blank';
        }
    });

    const onLogin = () => {
        setVisibleModalLogin(true);
    };

    const onLogout = () => {
        mutate();
    };

    const goToProfile = () => {};

    const onRegistrate = () => {};

    const renderUserItems = () => (
        <>
            <SiteHeader.Item>
                <Button
                    icon={<UserOutlined />}
                    onClick={goToProfile}
                    type="link"
                >
                    {user.username}
                </Button>
            </SiteHeader.Item>
            <SiteHeader.Item>
                <Button icon={<LoginOutlined />} onClick={onLogout}>
                    Выход
                </Button>
            </SiteHeader.Item>
        </>
    );

    const renderGuestItems = () => (
        <>
            <SiteHeader.Item>
                <Button icon={<UserOutlined />} onClick={onLogin} type="link">
                    Войти
                </Button>
            </SiteHeader.Item>
            <SiteHeader.Item>
                <Button icon={<LoginOutlined />} onClick={onRegistrate}>
                    Зарегистрироваться
                </Button>
            </SiteHeader.Item>
        </>
    );

    return (
        <>
            <Affix className="affixTop" offsetTop={0}>
                <Flex align="center" gap="16px" justify="space-around" wrap>
                    <Skeleton loading={isLoading}>
                        <SiteHeader>
                            {user?.id ? renderUserItems() : renderGuestItems()}
                        </SiteHeader>
                    </Skeleton>
                </Flex>
            </Affix>
            <LoginModal
                visibleModalLogin={visibleModalLogin}
                setVisibleModalLogin={setVisibleModalLogin}
            />
        </>
    );
}

const ProfileItem = ({ shortUserName }) => {
    const mainItems = [
        {
            key: 'user',
            label: 'Пользователь',
            children: [
                {
                    key: 'userInfo',
                    label: <Link to="/user">Профиль пользователя</Link>,
                },
            ],
        },
    ];

    const items = [...mainItems];

    return (
        <Dropdown trigger={['hover']} placement="bottom" menu={{ items }}>
            <span>{'Пользователь короткое имя'}</span>
        </Dropdown>
    );
};
