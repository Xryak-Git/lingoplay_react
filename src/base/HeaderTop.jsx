/** @format */

import { Affix, Dropdown, Form, Menu, Spin, Flex } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { LoginModal } from './LoginModal';

const { SubMenu } = Menu;

export default function HeaderTop() {
    // const CONTEXT = 'LOCAL';

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

    const [visibleModalLogin, setVisibleModalLogin] = useState(false);

    const onLogin = () => {
        setVisibleModalLogin(true);
    };

    const renderUserItems = () => (
        <>
            <a
                onClick={() => {
                    onLogout();
                }}
            >
                Выход
            </a>
        </>
    );

    const renderGuestItems = () => (
        <>
            <a onClick={() => onLogin()}>Войти</a>
        </>
    );

    const user = {
        // id: 10,
        pek: 20,
    };

    return (
        <>
            <Affix className="affixTop" offsetTop={0}>
                <Flex align="center" gap="16px" justify="space-around" wrap>
                    <SiteHeader>
                        {user?.id ? renderUserItems() : renderGuestItems()}
                    </SiteHeader>
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
