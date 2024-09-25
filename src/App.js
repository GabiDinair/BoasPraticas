import React, { useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState({
    'Segunda-feira': { manha: '', tarde: '', noite: '' },
    'Terça-feira': { manha: '', tarde: '', noite: '' },
    'Quarta-feira': { manha: '', tarde: '', noite: '' },
    'Quinta-feira': { manha: '', tarde: '', noite: '' },
    'Sexta-feira': { manha: '', tarde: '', noite: '' },
    'Sábado': { manha: '', tarde: '', noite: '' },
    'Domingo': { manha: '', tarde: '', noite: '' },
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');

  // Estado para armazenar as atividades concluídas
  const [atividadesConcluidas, setAtividadesConcluidas] = useState({});

  // Função para adicionar atividade
  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade,
      },
    }));

    // Limpar os campos após adicionar
    setAtividade('');
  };

  // Função para marcar a atividade como concluída
  const toggleConcluida = (dia, periodo) => {
    const key = `${dia}-${periodo}`;
    setAtividadesConcluidas((prev) => ({
      ...prev,
      [key]: !prev[key], // Alterna entre verdadeiro e falso
    }));
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <label>Dia:</label>
        <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
          {diasDaSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label>Período:</label>
        <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>

        <label>O que estudar:</label>
        <input
          type="text"
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Ex: Matemática"
        />
        <button onClick={adicionarAtividade}>Adicionar Estudo</button>
      </div>

      {diasDaSemana.map(dia => (
        <div key={dia} className="dia-container">
          <h2>{dia}</h2>
          <div className="periodo-container">
            <strong>Manhã:</strong>
            <span style={{ textDecoration: atividadesConcluidas[`${dia}-manha`] ? 'line-through' : 'none' }}>
              {estudos[dia].manha}
            </span>
            {estudos[dia].manha && (
              <button onClick={() => toggleConcluida(dia, 'manha')}>
                {atividadesConcluidas[`${dia}-manha`] ? 'Marcar como não concluída' : 'Marcar como concluída'}
              </button>
            )}
          </div>
          <div className="periodo-container">
            <strong>Tarde:</strong>
            <span style={{ textDecoration: atividadesConcluidas[`${dia}-tarde`] ? 'line-through' : 'none' }}>
              {estudos[dia].tarde}
            </span>
            {estudos[dia].tarde && (
              <button onClick={() => toggleConcluida(dia, 'tarde')}>
                {atividadesConcluidas[`${dia}-tarde`] ? 'Marcar como não concluída' : 'Marcar como concluída'}
              </button>
            )}
          </div>
          <div className="periodo-container">
            <strong>Noite:</strong>
            <span style={{ textDecoration: atividadesConcluidas[`${dia}-noite`] ? 'line-through' : 'none' }}>
              {estudos[dia].noite}
            </span>
            {estudos[dia].noite && (
              <button onClick={() => toggleConcluida(dia, 'noite')}>
                {atividadesConcluidas[`${dia}-noite`] ? 'Marcar como não concluída' : 'Marcar como concluída'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 

export default App;
