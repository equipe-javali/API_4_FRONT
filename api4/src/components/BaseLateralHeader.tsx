import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FaHome, FaList, FaPlus, FaCogs, FaThermometerHalf, FaClipboardList } from 'react-icons/fa';
import './css/BaseLateralHeader.css';

const BaseLateralHeader = () => {
  return (
    <div id="app-content-lr">
      <SideMenu links={[
        ["Cadastro de Estação", "cadastro/estacao", <FaPlus />],
        ["Lista de Estações", "lista/estacoes", <FaList />],
        ["Cadastro de Parâmetro", "cadastro/parametro", <FaPlus />],
        ["Lista de Parâmetros", "lista/parametros", <FaClipboardList />],
        ["Cadastro de Sensor", "cadastro/sensor", <FaPlus />],
        ["Lista de Sensores", "lista/sensores", <FaThermometerHalf />],
      ]} />
      <div id="app-content-tb">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLateralHeader;