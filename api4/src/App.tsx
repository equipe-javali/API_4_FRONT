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
import Home from './pages/homeAdm/Home';
import Login from './pages/login/Login';
import CadastrarAdministrador from './pages/cadastroAdm/CadastroAdm'
import Perfil from './pages/perfil/Perfil';
import { CadastroAlerta } from './pages/alertas/CadastroAlerta';
import { EditaAlerta } from './pages/alertas/EditaAlerta';
import { ListaAlertas } from './pages/alertas/ListaAlerta';
import PrivateRoute from './components/PrivateRoute';
import HomePub from './pages/home/HomePub';
import BaseSuperior from './components/BaseSuperior';
import { Relatorios } from './pages/relatorios/relatorios';
import Parametros from './pages/institucional/institucionalParametro';
import Sensores from './pages/institucional/institucionalSensor';
import Estacoes from './pages/institucional/institucionalEstacao';
import Ajuda from './pages/Ajuda/Manual'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas Login */}
        <Route element={ <BaseSuperior /> }>
          <Route path="/" element={<HomePub />} />
          <Route path="/home" element={<HomePub />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastrarAdministrador />} />

        </Route>

        <Route element={<BaseLateralHeader />}>
          {/* ROTAS PROTEGIDAS */}
          <Route element={<PrivateRoute />}>
            {/* rotas Usuário */}
            <Route path="/perfil" element={<Perfil />} />

            {/* rotas sensores */}
            <Route path="/cadastro/sensor" element={<CadastroSensor />} />
            <Route path="/edita/sensor/:id" element={<EditaSensor />} />
            <Route path="/lista/sensores" element={<ListaSensores />} />

            {/* rotas estacao */}
            <Route path="/cadastro/estacao" element={<CadastroEstacao />} />
            <Route path="/edita/estacao/:id" element={<EditaEstacao />} />
            <Route path="/lista/estacoes" element={<ListaEstacoes />} />

            {/* rotas parametros */}
            <Route path="/cadastro/parametro" element={<CadastroParametro />} />
            <Route path="/edita/parametro/:id" element={<EditarParametro />} />
            <Route path="/lista/parametros" element={<ListaParametros />} />

            {/* rotas alertas */}
            <Route path="/cadastro/alerta" element={<CadastroAlerta />} />  
            <Route path="/edita/alerta/:id" element={<EditaAlerta />} />                
            <Route path="/lista/alertas" element={<ListaAlertas />} />  

            {/* rotas institucional */}
            <Route path="/institucional/parametros" element={<Parametros />} />   
            <Route path="/institucional/sensores" element={<Sensores />} />
            <Route path="/institucional/estacoes" element={<Estacoes />} />   


            {/* rotas relatorios */} 
            <Route path="/relatorios" element={<Relatorios />} /> 

            {/* rotas Manual */} 
            <Route path="/ajuda/manual" element={<Ajuda />} /> 
            
          </Route>

          {/* ROTAS PÚBLICAS */}
            <Route path="/homeAdm" element={<Home />} />
   
        </Route>
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;