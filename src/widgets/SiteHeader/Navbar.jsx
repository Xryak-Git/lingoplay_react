/** @format */

import { useEffect, useState } from 'react';
import { HomeTwoTone, MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Affix, Button, Drawer, Menu } from 'antd';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const [service, setService] = useState(null);
    const [serviceImage, setServiceImage] = useState(null);

    useEffect(() => {
        setVisible(false);
    }, [location.pathname]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Affix className="affixMenu" offsetTop={80}>
            <nav className="menuBar">
                <div className="menuCon">
                    <div className="mainMenu" style={{ boxShadow: 'none' }}>
                        <Button
                            className="barsMenu burgerMenu"
                            onClick={showDrawer}
                            icon={<MenuOutlined />}
                        />
                        <Drawer
                            rootClassName="drawerServices navBarDrawerServices"
                            width="94%"
                            title={'Pekks'}
                            placement="left"
                            onClose={onClose}
                            open={visible}
                        >
                            <Menu mode="inline" className="phoneMenu">
                                <Menu.Item key="1">
                                    <Link to="/">
                                        <HomeTwoTone />
                                        Главная
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Drawer>
                    </div>
                </div>
            </nav>
        </Affix>
    );
}

export default Navbar;
