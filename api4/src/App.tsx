import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CadastroEstacao } from './pages/CadastroEstacao';
import BaseLateralHeader from './pages/BaseLateralHeader';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLateralHeader />}>
          <Route path="/estacao" element={<CadastroEstacao />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;