import React from "react";
import { Button, Menu } from 'antd';
import { Link } from "react-router-dom";

function Header(){
    return (
        <div className="logo">
            <Button><Link to="/showmagic">ShowMagic </Link></Button>
            <Button><Link to="/posts">All Posts </Link></Button>
            <Button><Link to="/login">Login Form </Link></Button>
            <Button><Link to="/signup">Registration Form </Link></Button>
        </div>
    );
}

export default Header;


/*
function Header(){
    <div>
        <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {new Array(15).fill(null).map((_, index) => {
                    const key = index + 1;
                    return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                })}
            </Menu>
    </div>
}
*/