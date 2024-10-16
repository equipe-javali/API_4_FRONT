import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEllipsisV, FaRegUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa'; // Importando FaHome
import './css/SideMenu.css';
import { useNavigate } from 'react-router-dom';

import apiJWT from '../services/axiosJWT';

interface SideMenuProps {
  links: [string, string, string, React.ReactNode][];
}

const SideMenu: React.FC<SideMenuProps> = ({ links }) => {
  const [collMenu, setCollMenu] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const navigate = useNavigate();

  const handleExpandMenu = () => {
    const expand = document.getElementById('menu-expand');
    setExpandMenu(!expandMenu);

    if (expandMenu) {
      expand?.classList.add('expand-open');
      expand?.classList.remove('expand-hidden');
    } else {
      expand?.classList.remove('expand-open');
      expand?.classList.add('expand-hidden');
    }
  };

  const handleCollapseMenu = () => {
    const menu = document.getElementById('side-menu');
    setCollMenu(!collMenu);

    if (collMenu) {
      menu?.classList.add('sideMenu-open');
      menu?.classList.remove('sideMenu-close');
    } else {
      menu?.classList.remove('sideMenu-open');
      menu?.classList.add('sideMenu-close');
    }
  };

  const handleLogout = async () => {
    try {
      await apiJWT.post('/usuario/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioSenha');
      navigate('/login');
    }
  };

  return (
    <div id="side-menu" className='sideMenu-open'>
      {collMenu ? (
        <>
          <img className='collapse-pic' src='https://tecsus.com.br/wp-content/uploads/2020/11/cropped-ICONE-TECSUS-32x32.png' />

          {links.map(([name, pathCad, pathList, icon]) => (
            <div className='collapse-options' key={name}>
              <div className='collapse-icon'>{icon}</div>
              <div id='collapse-expand'>
                <p>{name}</p>
                {pathCad && (
                  <Link to={pathCad} className="menu-link">
                    <p className='link-text'>Cadastrar</p>
                  </Link>
                )}
                {pathList && (
                  <Link to={pathList} className='menu-link'>
                    <p>Listar</p>
                  </Link>
                )}
              </div>
            </div>
          ))}
          
          {/* Adicionando a opção Home */}
          <div className='collapse-options'>
            <div className='collapse-icon'><FaHome /></div>
            <div id='collapse-expand'>
              <p>Home</p>
              <Link to="home" className="menu-link">
                <p className='link-text'>Ir para Home</p>
              </Link>
            </div>
          </div>

          <div className='menu-bottom'>
            <div className='user-collapse'>
              <FaRegUserCircle color='white' size={35} />
              <div className='user-options'>
                <p>Detalhes do usuário</p>
                <button>Meu perfil</button>
                <button onClick={handleLogout}>Sair <FaSignOutAlt /></button>
              </div>
            </div>
            <button className='btn-collapse' onClick={handleCollapseMenu}>
              <FaAngleDoubleRight className='collapse-arrow' />
            </button>
          </div>
        </>
      ) : (
        <>
          <img className='menu-logo-horizontal' src='https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png ' />

          <details className='menu-details'>
            <summary><FaHome /> Home</summary>
            <Link to="home" className="menu-link">
              <p className='link-text'>Ir para Home</p>
            </Link>
          </details>

          {links.map(([name, pathCad, pathList, icon]) => (
            <details className='menu-details' key={name}>
              <summary>{icon} {name}</summary>
              {pathCad && (
                <Link to={pathCad} className="menu-link">
                  <p className='link-text'>Cadastrar</p>
                </Link>
              )}
              {pathList && (
                <Link to={pathList} className='menu-link'>
                  <p>Listar</p>
                </Link>
              )}
            </details>
          ))}

          <div className='menu-bottom'>
            <div className='user-profile'>
              <FaRegUserCircle color='white' size={30} />
              <div className='user-name'>
                <div id='menu-expand' className='expand-hidden'>
                  <Link to={'/perfil'} className='menu-link'>Meu perfil</Link>
                  <button onClick={handleLogout} className='menu-link'>Sair <FaSignOutAlt /></button>
                </div>
                <p>Detalhes do usuário</p>
                <FaEllipsisV onClick={handleExpandMenu} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideMenu;
