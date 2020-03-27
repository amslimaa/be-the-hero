import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import './style.css'

import logoImg from '../../assets/logo.svg'

export default function Profile(){
  const history = useHistory();
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const [incidents, setIncidents ] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers : {
        Authorization: ongId,
      }
    }).then(response => {
      console.log(response.data)
      setIncidents(response.data);
    })
  }, [ongId]);

  async function  handleIncidentDelete(id){
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter( incident => incident.id !== id));
    } catch (err) {
      alert('Não foi possivel deletar o incidente, tente novamente')
    }
  }
  function handleLogOut(){
    localStorage.clear();
    history.push('/');
  }
  return(
    <div className="profile-content">
      <header>
        <img src={logoImg} alt="Be  The Hero"/>
        <span>Bem vindo, {ongName}</span>
        <Link to='/incidents/new' className='button'>Cadastrar novo caso</Link>
        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value) }</p>

            <button onClick={() => handleIncidentDelete(incident.id) } type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
