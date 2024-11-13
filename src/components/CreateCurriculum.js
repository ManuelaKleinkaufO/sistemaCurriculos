import React, { useState } from 'react';
import axios from 'axios';

function CreateCurriculum() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    phone: '',
    WebAddress: ''

  });

  const handleChange = (e) => {


    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obter o token CSRF do backend
      const response = await axios.get('http://localhost:3001/csrf-token', { withCredentials: true });
      const csrfToken = response.data.csrfToken;

      // Adicionar o token CSRF no corpo da requisição
      const dataToSend = { 
        ...formData,
        _csrf: csrfToken,  // Adiciona o token CSRF no corpo
      };

      console.log('Enviando dados:', dataToSend);

      // Enviar o formulário com o token CSRF no corpo
      await axios.post('http://localhost:3001/curriculo', dataToSend, {
        withCredentials: true,  // Permite o envio de cookies (se necessário)
      });

      console.log('Currículo criado com sucesso!');
    } catch (err) {
      console.error('Erro ao criar currículo:', err);
    }
  };

  return (
    <div>
      <h1>Criar Currículo</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
        />
        <input
            type="text"
            name="address"
            placeholder="Endereço WEB"
            value={formData.webAddress}
            onChange={handleChange}
        />
        <textarea 
          name="experience" 
          placeholder="Experiência"
          value={formData.experience}
          onChange={handleChange}
        />
        <button type="submit">Criar Currículo</button>
      </form>
    </div>
  );
}

export default CreateCurriculum;
