import React from 'react';
import './Profiles.css';

// Import images - ensure these paths are correct and files exist
import plant1 from './plant1.JPG';  // Consistent .jpg extension
import plant2 from './plant2.JPG';
import plant3 from './plant3.JPG';
import plant4 from './plant4.jpg';
import plant5 from './plant5.JPG';
import plant6 from './plant6.JPG';

function Profiles() {
  const plants = [
    { 
      id: 1, 
      name: 'Money Plant', 
      image: plant1,
      description: 'Tropical vine with large, split leaves. Perfect for indoor spaces.'
    },
    { 
      id: 2, 
      name: 'Alovera Plant', 
      image: plant2,
      description: 'Hardy succulent with tall, upright leaves. Purifies air effectively.'
    },
    { 
      id: 3, 
      name: 'English Ivy Plant', 
      image: plant3,
      description: 'Popular tree with large, violin-shaped leaves. Needs bright light.'
    },
    { 
      id: 4, 
      name: 'Peace Lily', 
      image: plant4,
      description: 'Beautiful flowering plant that thrives in low light conditions.'
    },
    { 
      id: 5, 
      name: 'Dracena Plant', 
      image: plant5,
      description: 'Easy to grow with long, arching leaves. Produces baby plantlets.'
    },
    { 
      id: 6, 
      name: 'Areca Palm', 
      image: plant6,
      description: 'Succulent with medicinal properties. Great for sunny windowsills.'
    }
  ];

  return (
    <section className="profiles">
      <h2>User Profiles</h2>
      <p>Manage and view your plant profiles here.</p>
      
      <div className="plants-grid">
        {plants.map(plant => (
          <button key={plant.id} className="plant-button">
            <img 
              src={plant.image} 
              alt={plant.name} 
              className="plant-image"
            />
            <div className="plant-info">
              <span className="plant-name">{plant.name}</span>
              <p className="plant-description">{plant.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Profiles;