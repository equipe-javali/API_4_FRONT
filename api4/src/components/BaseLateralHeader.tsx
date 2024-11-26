import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FaPlus, FaCogs, FaThermometerHalf, FaClipboardList } from 'react-icons/fa';
import './css/BaseLateralHeader.css';

const BaseLateralHeader = () => {
  return (
    <div id="app-content-lr">
      <SideMenu links={[
        ["Estação", "cadastro/estacao", "lista/estacoes", <FaCogs />],
        ["Parâmetro", "cadastro/parametro", "lista/parametros", <FaPlus />],
        ["Sensor", "cadastro/sensor", "lista/sensores", <FaThermometerHalf />],
        ["Alerta", "cadastro/alerta", "lista/alertas", <FaClipboardList />]        
      ]} />
      <div id="app-content-tb">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLateralHeader;