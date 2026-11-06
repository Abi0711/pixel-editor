import React, { useState } from 'react';
import '../styles/PixelCanvas.css';

const PALETTE = ['#000000', '#ffffff', '#7c7c7c', '#e03b3b', '#3b82f6', '#10b981', '#f59e0b'];

function PixelCanvas() {
  const [gridSize, setGridSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const [pixels, setPixels] = useState(() => 
    Array(16 * 16).fill('#ffffff')
  );

  const handleSizeChange = (newSize) => {
    setGridSize(newSize);
    setPixels(Array(newSize * newSize).fill('#ffffff'));
  };

  const paintPixel = (index) => {
    setPixels((prev) => {
      if (prev[index] === selectedColor) return prev;
      const updated = [...prev];
      updated[index] = selectedColor;
      return updated;
    });
  };

  const handleExport = () => {
    console.log("Pixel Array payload:", {
      size: gridSize,
      data: pixels
    });
    alert(`Saved ${gridSize}x${gridSize} art! Check console.`);
  };

  return (
    <div 
      className="canvas-wrapper"
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div className="controls-bar">
        <button 
          onClick={() => handleSizeChange(8)}
          className={`size-btn ${gridSize === 8 ? 'active' : ''}`}
        >
          8x8
        </button>
        <button 
          onClick={() => handleSizeChange(16)}
          className={`size-btn ${gridSize === 16 ? 'active' : ''}`}
        >
          16x16
        </button>
        <button 
          onClick={() => setPixels(Array(gridSize * gridSize).fill('#ffffff'))}
          className="action-btn"
        >
          Clear
        </button>
        <button 
          onClick={handleExport}
          className="save-btn"
        >
          Save / Export
        </button>
      </div>

      <div className="palette-bar">
        {PALETTE.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`swatch-btn ${selectedColor === c ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
          />
        ))}
        <input 
          type="color" 
          value={selectedColor} 
          onChange={(e) => setSelectedColor(e.target.value)} 
          className="color-input"
        />
      </div>

      <div
        className="pixel-board"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {pixels.map((color, index) => (
          <div
            key={index}
            onMouseDown={() => {
              setIsMouseDown(true);
              paintPixel(index);
            }}
            onMouseEnter={() => {
              if (isMouseDown) paintPixel(index);
            }}
            className="pixel-cell"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default PixelCanvas;