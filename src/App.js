import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState(() => {
    // Carregar do localStorage ao iniciar
    const savedEstudos = localStorage.getItem('estudos');
    return savedEstudos ? JSON.parse(savedEstudos) : {
      'Segunda-feira': { manha: '', tarde: '', noite: '' },
      'Terça-feira': { manha: '', tarde: '', noite: '' },
      'Quarta-feira': { manha: '', tarde: '', noite: '' },
      'Quinta-feira': { manha: '', tarde: '', noite: '' },
      'Sexta-feira': { manha: '', tarde: '', noite: '' },
      'Sábado': { manha: '', tarde: '', noite: '' },
      'Domingo': { manha: '', tarde: '', noite: '' },
    };
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');

  useEffect(() => {
    // Salvar os estudos no localStorage sempre que forem atualizados
    localStorage.setItem('estudos', JSON.stringify(estudos));
  }, [estudos]);

  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade,
      },
    }));

    setAtividade(''); // Limpar o campo após adicionar
  };

  const removerAtividade = (dia, periodo) => {
    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [dia]: {
        ...prevEstudos[dia],
        [periodo]: '',
      },
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
            <strong>Manhã:</strong> {estudos[dia].manha} 
            <button onClick={() => removerAtividade(dia, 'manha')}>Remover</button>
          </div>
          <div className="periodo-container">
            <strong>Tarde:</strong> {estudos[dia].tarde} 
            <button onClick={() => removerAtividade(dia, 'tarde')}>Remover</button>
          </div>
          <div className="periodo-container">
            <strong>Noite:</strong> {estudos[dia].noite} 
            <button onClick={() => removerAtividade(dia, 'noite')}>Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
