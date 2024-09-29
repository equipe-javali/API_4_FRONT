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
      expand?.classList.remove('expand-hidden')
    } else {
      expand?.classList.remove('expand-open')
      expand?.classList.add('expand-hidden')
    }
  }

  const handleCollapseMenu = () => {
    const menu = document.getElementById('side-menu');
    setCollMenu(!collMenu);

    if (collMenu == true) {
      menu?.classList.add('sideMenu-open')
      menu?.classList.remove('sideMenu-close')
    } else {
      menu?.classList.remove('sideMenu-open')
      menu?.classList.add('sideMenu-close')
    }
  }

  return (
    <div id="side-menu" className='sideMenu-open'>
      {collMenu ?
        <>
          <img className='collapse-pic' src='https://tecsus.com.br/wp-content/uploads/2020/11/cropped-ICONE-TECSUS-32x32.png' />

          {links.map(([name, pathCad, pathList, icon]) => (
            <div className='collapse-options'>
                <div className='collapse-icon'>
                  {icon}
                </div>

                <div id='collapse-expand'>
                  <p>{name}</p>
                  <Link key={pathCad} to={pathCad} className="menu-link">
                    <p className='link-text'>Cadastrar</p>
                  </Link>
                  <Link key={pathList} to={pathList} className='menu-link'>
                    <p>Listar</p>
                  </Link>
                </div>
            </div>
          ))}

          <div className='menu-bottom'>
            <div className='user-collapse'>
              <FaRegUserCircle color='white' size={35}/>
              <div className='user-options'>
                  <p>Detalhes do usuário</p>
                  <button>Meu perfil</button>
                  <button>Sair <FaSignOutAlt /> </button>
              </div>
            </div>

            <button className='btn-collapse' onClick={handleCollapseMenu}>
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
                <div id='menu-expand' className='expand-hidden'>
                  <Link to={'/perfil'} className='menu-link'>Meu perfil</Link>
                  <Link to={'/'} className='menu-link'>Sair <FaSignOutAlt /> </Link>
                </div>
                <p>Detalhes do usuário</p>
                <FaEllipsisV onClick={handleExpandMenu}/>
              </div>
            </div>

            {/* <button className='btn-collapse' onClick={handleCollapseMenu}>
              <p>Collapse menu</p>
              <FaAngleDoubleLeft className='collapse-arrow' />
            </button> */}
          </div>
        </>
      }
    </div>
  );
};

export default SideMenu;