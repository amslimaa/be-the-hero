import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import logoImage from '../../assets/logo.svg'

import './style.css'

export default function NewIncident(){
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)

  async function handleRegisterIncident(e){
    e.preventDefault();
    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile');
    } catch (err) {
      alert('Não foi possivel cadastrar o incidente, tente novamente ');
    }

  }

  return(
    <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImage} alt="Be The Hero"/>
            <h1>Cadastro novo caso</h1>
            <p>Descreva o caso detalhadamente pra encontrar o heroi pra resolver isso</p>
            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041"   />
              Voltar à home
            </Link>
          </section>
          <form onSubmit={handleRegisterIncident}>
            <input
              placeholder="Título do caso"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              placeholder="Valor em reais"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button  className="button" type="submit" >Cadastrar</button>

          </form>
        </div>
      </div>
  );
}
