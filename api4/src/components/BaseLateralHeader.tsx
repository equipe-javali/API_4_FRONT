import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FaHome, FaList, FaPlus, FaCogs, FaThermometerHalf, FaClipboardList, FaRegUserCircle } from 'react-icons/fa';
import './css/BaseLateralHeader.css';

const BaseLateralHeader = () => {
  return (
    <div id="app-content-lr">
      <SideMenu links={[
        ["Estação", "cadastro/estacao", "lista/estacoes", <FaCogs />],
        ["Parâmetro", "cadastro/parametro", "lista/parametros", <FaPlus />],
        ["Sensor", "cadastro/sensor", "lista/sensores", <FaThermometerHalf />]
      ]} />
      <div id="app-content-tb">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLateralHeader;