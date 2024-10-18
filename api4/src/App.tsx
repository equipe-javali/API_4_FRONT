import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLateralHeader from './components/BaseLateralHeader';
import { CadastroEstacao } from './pages/estacoes/CadastroEstacao';
import { CadastroParametro } from './pages/Parametros/CadastroParametros';
import { ListaParametros } from './pages/Parametros/ListaParametro';
import { EditarParametro } from './pages/Parametros/EditarParametro';
import { EditaEstacao } from './pages/estacoes/EditaEstacao';
import { ListaEstacoes } from './pages/estacoes/ListaEstacoes';
import { CadastroSensor } from './pages/Sensores/CadastroSensor';
import { ListaSensores } from './pages/Sensores/ListaSensores';
import { EditaSensor } from './pages/Sensores/EditaSensor';
import Home from './pages/Home';
import Login from './pages/estacoes/Login';
import CadastrarAdministrador from './pages/estacoes/CadastroAdm'
import Perfil from './pages/estacoes/Perfil';
import { CadastroAlerta } from './pages/alertas/CadastroAlerta';
import { EditaAlerta } from './pages/alertas/EditaAlerta';
import { ListaAlertas } from './pages/alertas/ListaAlerta';
import PrivateRoute from './components/PrivateRoute';
import HomePub from './pages/home/HomePub';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas Login */}
        <Route path="/home" element={<HomePub />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastrarAdministrador />} />

        <Route element={<BaseLateralHeader />}>
          {/* ROTAS PROTEGIDAS */}
          <Route element={<PrivateRoute />}>
            {/* rotas Usuário */}
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          {/* ROTAS PÚBLICAS */}
            <Route path="/homeAdm" element={<Home />} />

            {/* rotas estacao */}
            <Route path="/cadastro/estacao" element={<CadastroEstacao />} />
            <Route path="/edita/estacao/:id" element={<EditaEstacao />} />
            <Route path="/lista/estacoes" element={<ListaEstacoes />} />

            {/* rotas parametros */}
            <Route path="/cadastro/parametro" element={<CadastroParametro />} />
            <Route path="/edita/parametro/:id" element={<EditarParametro />} />
            <Route path="/lista/parametros" element={<ListaParametros />} />

            {/* rotas sensores */}
            <Route path="/cadastro/sensor" element={<CadastroSensor />} />
            <Route path="/edita/sensor/:id" element={<EditaSensor />} />
            <Route path="/lista/sensores" element={<ListaSensores />} />

            {/* rotas alertas */}
            <Route path="/cadastro/alerta" element={<CadastroAlerta />} />  
            <Route path="/edita/alerta/:id" element={<EditaAlerta />} />                
            <Route path="/lista/alertas" element={<ListaAlertas />} />       
        </Route>
          <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;