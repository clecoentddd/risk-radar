import { useState, useEffect } from 'react';

const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    type: 'risk',
    shape: 'circle',
    size: 30,
    positionX: 100,
    positionY: 100,
    color: '#ff0000',
  });

  // Fetch items from the API when the page loads
  useEffect(() => {
    fetch('/api/getRiskItems')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error loading items:', err));
  }, []);

  const addItem = async () => {
    const response = await fetch('/api/saveItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    
    if (response.ok) {
      setItems([...items, newItem]); // Add the new item to the radar immediately
    } else {
      console.error('Error saving item');
    }
  };

  // Function to draw items on the radar canvas
  const drawRadar = () => {
    const canvas = document.getElementById('radarCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous items

    items.forEach((item) => {
      ctx.fillStyle = item.color;

      // Draw the correct shape based on the type
      switch (item.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(item.positionX, item.positionY, item.size, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(item.positionX, item.positionY - item.size);
          ctx.lineTo(item.positionX - item.size, item.positionY + item.size);
          ctx.lineTo(item.positionX + item.size, item.positionY + item.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(item.positionX - item.size / 2, item.positionY - item.size / 2, item.size, item.size);
          break;
      }
    });
  };

  useEffect(() => {
    drawRadar();
  }, [items]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Risk Radar</h1>
      <div>
        <label>Type:</label>
        <select
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        >
          <option value="risk">Risk</option>
          <option value="opportunity">Opportunity</option>
        </select>

        <label>Shape:</label>
        <select
          value={newItem.shape}
          onChange={(e) => setNewItem({ ...newItem, shape: e.target.value })}
        >
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>

        <label>Size:</label>
        <input
          type="number"
          min="10"
          max="100"
          value={newItem.size}
          onChange={(e) => setNewItem({ ...newItem, size: +e.target.value })}
        />

        <label>Position X:</label>
        <input
          type="number"
          value={newItem.positionX}
          onChange={(e) => setNewItem({ ...newItem, positionX: +e.target.value })}
        />

        <label>Position Y:</label>
        <input
          type="number"
          value={newItem.positionY}
          onChange={(e) => setNewItem({ ...newItem, positionY: +e.target.value })}
        />

        <label>Color:</label>
        <input
          type="color"
          value={newItem.color}
          onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
        />

        <button onClick={addItem}>Add to Radar</button>
      </div>

      <canvas id="radarCanvas" width="500" height="500" style={{ border: '2px solid black', marginTop: '20px' }}></canvas>
    </div>
  );
};

export default IndexPage;
