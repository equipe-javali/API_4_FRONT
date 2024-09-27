import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEllipsisV, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './css/SideMenu.css';

interface SideMenuProps {
  links: [string, string, string, React.ReactNode][];
}

const SideMenu: React.FC<SideMenuProps> = ({ links }) => {
  const [collMenu, setCollMenu] = useState(false)
  const [expandMenu, setExpandMenu] = useState(false)

  const handleExpandMenu = () => {
    const expand = document.getElementById('menu-expand')
    setExpandMenu(!expandMenu);

    if (expandMenu == true) {
      expand?.classList.add('expand-open')
    } else {
      expand?.classList.remove('expand-open')
    }
  }

  return (
    <div className="side-menu">
      {collMenu ?
        <>
          <img className='menu-logo' src='https://tecsus.com.br/wp-content/uploads/2020/11/cropped-ICONE-TECSUS-32x32.png' />

          <div className='menu-bottom'>
            <div className='user-profile'>
              <FaRegUserCircle color='white' />
            </div>

            <button className='menu-collapse' onClick={() => setCollMenu(!collMenu)}>
              <FaAngleDoubleRight className='collapse-arrow' />
            </button>
          </div>

        </>
        :
        <>
          <img className='menu-logo-horizontal' src='https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png ' />

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
              <FaRegUserCircle color='white' size={30}/>
              <div className='user-name'>
                <div id='menu-expand'>
                  <button>Perfil</button>
                </div>
                <p>Nome do usuário</p>
                <FaEllipsisV onClick={handleExpandMenu}/>
              </div>
            </div>

            <button className='menu-collapse' onClick={() => setCollMenu(!collMenu)}>
              <p>Collapse menu</p>
              <FaAngleDoubleLeft className='collapse-arrow' />
            </button>
          </div>
        </>
      }
    </div>
  );
};

export default SideMenu;