import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import './css/BaseLateralHeader.css';

const BaseLateralHeader = () => {
  return (
    <div id="app-content-lr">
      <SideMenu links={[
        ["Cadastro de Estação", "estacao"]
      ]} />
      <div id="app-content-tb">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLateralHeader;