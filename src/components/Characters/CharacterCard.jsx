import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
  const { name, images, species, id } = character;
  const fullName = `${name.first} ${name.middle || ''} ${name.last}`.trim();

  return (
    <Link to={`/character/${id}`} className="character-card-link">
      <div className="character-card">
        <div className="character-image">
          <img 
            src={images.main} 
            alt={fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
        </div>
        <div className="character-info">
          <h2>{fullName}</h2>
          <p>Especie: {species}</p>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
