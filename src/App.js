import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setcep] = useState({})

  async function handleSearch() {
    // 66645130/json/

    if(input === ''){
      alert('Preencha com algum CEP')
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setcep(response.data);
      setInput("");

    } catch{
      alert("Ops! erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
     <h1 className="title">Buscador CEP</h1>

     <div className="containerInput">
      <input
      type="text"
      placeholder="Digite seu cep..."
      value={input}
      onChange={(e) => setInput(e.target.value) }
      />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#fff"/>
      </button>

     </div>


      {Object.keys(cep).length > 0 && (

        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/Estado: {cep.localidade} - {cep.uf}</span>
        </main>

      )}
     

    </div>
  );
}

export default App;
