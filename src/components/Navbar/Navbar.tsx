import { Menu, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/accounts",
      label: <Link to="/accounts">Account</Link>,
    },
    {
      key: "/transactions",
      label: <Link to="/transactions">Transaction</Link>,
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <div className="shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="text-xl font-bold">
          <Link to="/">Bank Simulation</Link>
        </div>

        <div className="flex-1 mx-10">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="!border-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="cursor-pointer"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
