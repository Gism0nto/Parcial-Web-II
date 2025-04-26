import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/futurama/characters`);
        const data = await response.json();
        const foundCharacter = data.find(char => String(char.id) === id);

        if (!foundCharacter) {
          throw new Error('Personaje no encontrado');
        }

        setCharacter(foundCharacter);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <div className="loading">Cargando personaje...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const fullName = `${character.name.first} ${character.name.middle || ''} ${character.name.last}`.trim();

  return (
    <div className="character-detail">
      <h1>{fullName}</h1>
      <img 
        src={character.images.main} 
        alt={fullName}
        className="character-detail-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/200?text=No+Image';
        }}
      />
      <p><strong>Especie:</strong> {character.species}</p>
      <p><strong>Edad:</strong> {character.age || 'Desconocida'}</p>
      <p><strong>Profesión:</strong> {character.occupation}</p>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Casa:</strong> {character.homePlanet}</p>
      <p><strong>Sayings:</strong></p>
      <ul>
        {character.sayings?.slice(0, 5).map((saying, index) => (
          <li key={index}>"{saying}"</li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterDetail;
