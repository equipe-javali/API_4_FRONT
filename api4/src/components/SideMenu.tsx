import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './css/SideMenu.css';

interface SideMenuProps {
  links: [string, string, string, React.ReactNode][];
}

const SideMenu: React.FC<SideMenuProps> = ({ links }) => {
  return (
    <div className="side-menu">
      <img className='menu-logo' src='https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png '/>

      {links.map(([name, pathCad, pathList, icon]) => (
        <details className='menu-details'>
          <summary>{icon} {name}</summary>
          <Link key={pathCad} to={pathCad} className="menu-link">
            <p className='link-text'>Cadastrar</p>
          </Link>
          <Link key={pathList} to={pathList} className='menu-link'>
            <p>Listar</p>
          </Link>
        </details>
      ))}

      <div className='menu-bottom'>
        <div className='user-profile'>
          <FaRegUserCircle color='white'/>
          <p>Nome do usuário</p>
          <FaSignOutAlt />
        </div>

        <div className='menu-collapse'>
          <p>Collapse menu</p>
          <FaAngleDoubleLeft className='collapse-arrow'/>
        </div>
      </div>
      
    </div>
  );
};

export default SideMenu;