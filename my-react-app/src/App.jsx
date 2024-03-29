import React, { useState } from 'react';
import './App.css';

// Initial list of cards for the game
const initialCards = ['Miss Scarlett', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Mrs. Peacock', 'Professor Plum', 'Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench', 'Hall', 'Lounge', 'Dining Room', 'Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study'];

function App() {
  // State for storing players and their cards
  const [players, setPlayers] = useState([{ name: 'Player 1', cards: {} }]);
  const [newPlayerName, setNewPlayerName] = useState('');

  // Function to add a new player
  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      const newPlayer = { name: newPlayerName, cards: {} };
      // Initialize each card as unchecked for the new player
      initialCards.forEach(card => {
        newPlayer.cards[card] = false;
      });
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  // Function to toggle a card's status for a player
  const handleToggleCard = (playerIndex, card) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        cards: {
          ...updatedPlayers[playerIndex].cards,
          [card]: !updatedPlayers[playerIndex].cards[card] // Toggle the card's status (checked/unchecked)
        }
      };
      return updatedPlayers;
    });
  };

  return (
    <div className="App">
      <h1>Clue Notes</h1>
      {/* Input for adding a new player */}
      <div className="add-player">
        <input
          type="text"
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      {/* Player list and their cards */}
      <div className="player-list">
        {/* Header row with player names */}
        <div className="player">
          <div className="card cell">
            <strong></strong>
          </div>
          {players.map((player, playerIndex) => (
            <div key={playerIndex} className="card cell">
              <strong>{player.name}</strong>
            </div>
          ))}
        </div>
        {/* Cards and checkboxes for each player */}
        {initialCards.map((card, cardIndex) => (
          <div key={cardIndex} className="player">
            <div className="card cell">
              <strong>{card}</strong>
            </div>
            {players.map((player, playerIndex) => (
              <div key={playerIndex} className="card cell" style={{ border: '1px solid #ccc' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={player.cards[card]} // Check if the card is checked for this player
                    onChange={() => handleToggleCard(playerIndex, card)} // Toggle the card when checkbox is clicked
                  />
                  Y/N
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
