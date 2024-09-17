import React from 'react';
import { Link } from 'react-router-dom';
import './css/SideMenu.css';

interface SideMenuProps {
  links: [string, string][];
}

const SideMenu: React.FC<SideMenuProps> = ({ links }) => {
  return (
    <div className="side-menu">      
      {links.map(([name, path]) => (
        <Link key={path} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;