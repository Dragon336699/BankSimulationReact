import { Menu, Dropdown, Avatar, Button } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, BankOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/accounts",
      label: <Link to="/accounts">Accounts</Link>,
    },
    {
      key: "/transactions",
      label: <Link to="/transactions">Transactions</Link>,
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <BankOutlined className="text-2xl" />
          <span>BankSim</span>
        </Link>

        <div className="flex-1 mx-8">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="bg-transparent !border-none min-w-[200px]"
          />
        </div>

        <div className="flex items-center gap-4">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors">
              <Avatar
                size="middle"
                icon={<UserOutlined />}
                className="bg-primary"
              />
              <span className="hidden sm:inline font-medium text-gray-700">John Doe</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

