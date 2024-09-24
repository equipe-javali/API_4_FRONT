import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLateralHeader from './components/BaseLateralHeader';
import { CadastroEstacao } from './pages/estacoes/CadastroEstacao';
import Home from './pages/Home';
import { CadastroParametro } from './pages/Parametros/CadastroParametros';
import { EditaEstacao } from './pages/estacoes/EditaEstacao';
import { ListaEstacoes } from './pages/estacoes/ListaEstacoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLateralHeader />}>
          <Route path="/cadastro/estacao" element={<CadastroEstacao />} />
          <Route path="/edita/estacao" element={<EditaEstacao/>} />
          <Route path="/lista/estacoes" element={<ListaEstacoes />} />
          

          {/* rotas parametros */}
          <Route path="/cadastro/parametro" element={<CadastroParametro />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;