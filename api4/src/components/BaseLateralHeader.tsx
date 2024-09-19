import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import './css/BaseLateralHeader.css';

const BaseLateralHeader = () => {
  return (
    <div id="app-content-lr">
      <SideMenu links={[
        ["Cadastro de Estação", "cadastro/estacao"],
        ["Edita Estação", "edita/estacao"],
        ["Lista de Estações", "lista/estacoes"],
        ["Cadastro de Parâmetro", "cadastro/parametro"]

      ]} />
      <div id="app-content-tb">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLateralHeader;