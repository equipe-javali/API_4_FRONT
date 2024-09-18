import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CadastroEstacao } from './pages/CadastroEstacao';
import BaseLateralHeader from './components/BaseLateralHeader';
import Home from './pages/Home';
import { CadastroParametro } from './pages/Parametros/CadastroParametros';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLateralHeader />}>
          <Route path="/estacao" element={<CadastroEstacao />} />

          {/* rotas parametros */}
          <Route path="/cadastro/parametro" element={<CadastroParametro />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;