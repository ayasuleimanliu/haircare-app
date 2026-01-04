// src/pages/Products.js
import "./Products.css";
import './About.css';
import { useNavigate } from 'react-router-dom';
import oilLogo from '../images/oil.jpeg';
import { useState } from 'react';

function Products() {
  const navigate = useNavigate();
  const [selectedOils, setSelectedOils] = useState([]);

  
  const oils = [
    {
      id: 1,
      name: "Coconut Oil",
      description: "Benefits: Deep hydration, hair strengthening, and prevention of split ends. Best for dry and damaged hair. Directions for use: Leave on for an hour or overnight before washing.",
      price: 10
    },
    {
      id: 2,
      name: "Argan Oil",
      description: "Benefits: Adds shine and softness, reduces frizz, and is rich in vitamin E. Best for hair: All hair types, especially damaged hair. Directions for use: Apply a few drops to wet or dry hair.",
      price: 15
    },
    {
      id: 3,
      name: "Castor Oil",
      description: "Benefits: Strengthens hair follicles and stimulates hair growth. Best for weak or stunted hair. Directions for use: Dilute with another oil because it is thick and massage into the scalp.",
      price: 12
    },
    {
      id: 4,
      name: "Almond Oil",
      description: "Benefits: Nourishes hair, reduces hair loss, and adds shine. Best for: All hair types. Directions for use: Can be applied to the ends or all over the hair.",
      price: 11
    },
    {
      id: 5,
      name: "Rosemary Oil",
      description: "Benefits: Stimulates blood circulation in the scalp, supports hair growth. Best for hair with weak growth or hair loss. Directions for use: Mix with a carrier oil such as olive or coconut before massaging.",
      price: 13
    },
    {
      id: 6,
      name: "Jojoba Oil",
      description: "Benefits: Resembles the scalp's natural oils, balances sebum production, and treats dandruff. Best for: Oily or combination hair. Directions for use: Massage into the scalp and leave on for a few hours.",
      price: 18
    }
  ];

  const handleCheckboxChange = (oilName) => {
    setSelectedOils((prev) =>
      prev.includes(oilName)
        ? prev.filter((name) => name !== oilName)
        : [...prev, oilName]
    );
  };

  const handlePurchase = () => {
    
    const selectedDetails = oils
      .filter((oil) => selectedOils.includes(oil.name))
      .map((oil) => ({
        id: oil.id,
        name: oil.name,
        price: oil.price,
        quantity: 1 
      }));

    navigate('/checkout', { state: { selectedOils: selectedDetails } });
  };

  return (
    <div className="products">
      <h1><b><i>Our Haircare Oil Products</i></b></h1>
      <p className="description">
        Explore the benefits of natural oils and products for healthy, shiny, 
        and strong hair. Learn how to nourish your hair the natural way.
      </p>
      <div className="oils-grid">
        {oils.map((oil, index) => (
          <div className="oil-card" key={index}>
            <img src={oilLogo} alt="Oil Logo" className="oil-logo" />
            <h2 className="oil-name">🌿{oil.name}</h2>
            <p className="description">{oil.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <p className="price">${oil.price}</p>
              <label className="oil-checkbox">
                <input
                  type="checkbox"
                  checked={selectedOils.includes(oil.name)}
                  onChange={() => handleCheckboxChange(oil.name)}
                />
                Select
              </label>
            </div>
          </div>
        ))}
      </div>
      <button className="purchase-button" onClick={handlePurchase}>
        🛒Purchase Now
      </button>
    </div>
  );
}

export default Products;
