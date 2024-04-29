import React, { useEffect, useState } from 'react';
import './cards.css'
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';

const Cards = () => {
  const [allCards, setAllCards] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // navigate('/details');
  };

  const getAllCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/getallcards");
      setAllCards(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCards();
  },[allCards])
  return (
    <div className='allcards'>
      {allCards.map((card) => (
      <div className="card" key={card._id}>
        <div className="card__label">&#8377;{card.price}</div>
        <p style={{ color: "white", fontSize: '25px' }} className="card__title">{card.cardTitle}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
        </svg>
        <div className="card__content">

          <p className="card__description truncate">
            {card.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }} class="modal__footer">
            <button class="button button--primary" onClick={handleButtonClick}>Book Now</button>
          </div>

        </div>
      </div>
       ))}
    </div>
  );
};

export default Cards;