import React, { useState } from 'react'
import { ServerRequest } from '../../helpers/ServerRequest';
import './Buscador.css';

export const Buscador = () => {
  const [search, setSearch] = useState({})
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    ServerRequest(`data/podcast/${search}`, 'GET')
      .then(response => console.log(response))
      //En el then redirigir a página "resultados" donde se mostrarán los resultados de la búsqueda
      .catch(response => console.log(response))
  }

  const [buscadorClass, setBuscadorClass] = useState();

  return (
    
    <form onSubmit={handleSubmit}>
      <div className={buscadorClass}>
      <select type="text" className="buscador-dropdown-input" id="dropdown">
        <option disabled selected value>Select an option</option>
        <option>Role 1</option>
        <option>Role 2</option>
      </select>
      <input placeholder="Buscar podcasts, radios y mucho más" onChange={handleSearch} className='buscador-input' />
      <i className="fas fa-search fa-2x" />
      </div>
    </form>
    
  )
}
