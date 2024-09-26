import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaPlus, FaCogs, FaThermometerHalf, FaClipboardList } from 'react-icons/fa';
import './css/SideMenu.css';

interface SideMenuProps {
  links: [string, string, React.ReactNode][];
}

const SideMenu: React.FC<SideMenuProps> = ({ links }) => {
  return (
    <div className="side-menu">
      {links.map(([name, path, icon]) => (
        <Link key={path} to={path} className="menu-link">
          {icon}
          <span className="link-text">{name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;