import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CadastroEstacao } from './pages/CadastroEstacao';

const estacoesData = [
  { id: 1, nome: 'Estação 1', foto: 'https://via.placeholder.com/150' },
  { id: 2, nome: 'Estação 2', foto: 'https://via.placeholder.com/150' },
  // ... mais estações
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<CadastroEstacao />);