import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 

function LaptopList() {
  const [laptops, setLaptops] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/laptops');
        setLaptops(response.data); 
      } catch (error) {
        console.error('Erro ao buscar laptops:', error);
        setError('Erro ao buscar laptops'); 
      } finally {
        setLoading(false); 
      }
      ;
    };
    
    fetchLaptops();
    const refresh = setInterval(() => {
        fetchLaptops();
      }, 10800000);

      return () => clearInterval(refresh)
    }, []);

  if (loading) {
    return <p>Carregando laptops...</p>;
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className="laptop-list">
      <h1>Laptops Lenovo</h1>
      {laptops.length === 0 ? (
        <p>Nenhum laptop encontrado.</p>
      ) : (
        <ul>
          {laptops.map((laptop, index) => (
            <li key={index} className="laptop-card">
              <img src={laptop.img} alt={laptop.title} />
              <h2>
                <a href={laptop.titleLink} target="_blank" rel="noopener noreferrer">
                  {laptop.title}
                </a>
              </h2>
              <p>Descrição: {laptop.description}</p>
              <p>Preço: {laptop.price}</p>
              <p>Avaliação: {laptop.rating} estrelas</p>
              <p>{laptop.reviews}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LaptopList;
