import React from 'react';
import './About.css';
function About() {
  return (
    <div className="about">
     
      <p>
        At AYA's Haircare, we believe in the power of nature. Our oils are sourced from the finest plants to nourish and strengthen your hair naturally.
      </p>

      <ul>
        <li><strong>Moisturizing and nourishing hair:</strong> Natural oils trap moisture, especially for dry or damaged hair. Example: Coconut oil nourishes with proteins and healthy fats.</li>
        <li><strong>Strengthen hair and prevent breakage:</strong> Argan and olive oils contain vitamins E and A, plus fatty acids that reinforce hair follicles.</li>
        <li><strong>Improve hair growth:</strong> Castor and rosemary oils stimulate blood circulation when massaged into the scalp.</li>
        <li><strong>Protect from damage:</strong> Oils form a barrier against heat styling and environmental stressors.</li>
        <li><strong>Shine and softness:</strong> Almond and coconut oils reduce frizz and add natural shine.</li>
        <li><strong>Scalp treatment:</strong> Tea tree and jojoba oils help reduce dandruff and soothe irritation.</li>
        <li><strong>Suitable for all hair types:</strong>
          <ul>
            <li>Dry/Damaged: Coconut oil, olive oil</li>
            <li>Oily: Castor oil, jojoba oil (in small amounts)</li>
            <li>Thin: Argan oil, almond oil</li>
          </ul>
        </li>
      </ul>

      <div className="tip">
        💡 <strong>Practical advice:</strong> Use oil 1–2 times a week. Gently massage into the scalp for best results without making hair greasy.
      </div>
    </div>
  );
}
export default  About;