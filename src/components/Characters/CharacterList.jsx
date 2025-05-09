import { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedSpecies = localStorage.getItem('selectedSpecies');

    if (savedSearchTerm) setSearchTerm(savedSearchTerm);
    if (savedSpecies) setSelectedSpecies(savedSpecies);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('selectedSpecies', selectedSpecies);
  }, [selectedSpecies]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://api.sampleapis.com/futurama/characters');
        if (!response.ok) throw new Error('Error al obtener los personajes');
        
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data);
        const species = [...new Set(data.map((c) => c.species).filter(Boolean))];
        setSpeciesList(species);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const results = characters.filter(character => {
      const nameMatch =
        character.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.name.last.toLowerCase().includes(searchTerm.toLowerCase());

      const speciesMatch = selectedSpecies ? character.species === selectedSpecies : true;

      return nameMatch && speciesMatch;
    });

    setFilteredCharacters(results);
  }, [searchTerm, selectedSpecies, characters]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSpeciesChange = (e) => setSelectedSpecies(e.target.value);

  if (loading) return <div className="loading">Cargando personajes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="character-container">
      <h1>Personajes de Futurama</h1>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={selectedSpecies}
          onChange={handleSpeciesChange}
          className="species-select"
        >
          <option value="">Todas las especies</option>
          {speciesList.map((species, idx) => (
            <option key={idx} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="no-results">No se encontraron personajes</div>
      ) : (
        <div className="character-grid">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
