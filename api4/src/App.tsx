import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLateralHeader from './components/BaseLateralHeader';
import { CadastroEstacao } from './pages/estacoes/CadastroEstacao';
import Home from './pages/Home';
import { CadastroParametro } from './pages/Parametros/CadastroParametros';
import { EditaEstacao } from './pages/estacoes/EditaEstacao';
import { ListaEstacoes } from './pages/estacoes/ListaEstacoes';
import { CadastroSensor } from './pages/Sensores/CadastroSensor';
import { ListaSensores } from './pages/Sensores/ListaSensores';
import { EditaSensor } from './pages/Sensores/EditaSensor';
import Login from './pages/estacoes/Login';
import Perfil from './pages/estacoes/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLateralHeader />}>
          <Route path="/cadastro/estacao" element={<CadastroEstacao />} />          
          <Route path="/edita/estacao/:id" element={<EditaEstacao />} />
          <Route path="/lista/estacoes" element={<ListaEstacoes />} />          

          {/* rotas parametros */}
          <Route path="/cadastro/parametro" element={<CadastroParametro />} />
          <Route path="/edita/parametro" element={<CadastroParametro />} />
          <Route path="/lista/parametros" element={<CadastroParametro />} />

          {/* rotas sensores */}
          <Route path="/cadastro/sensor" element={<CadastroSensor />} />
          <Route path="/edita/sensor/:id" element={<EditaSensor />} />
          <Route path="/lista/sensores" element={<ListaSensores />} />

          {/* rotas Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;