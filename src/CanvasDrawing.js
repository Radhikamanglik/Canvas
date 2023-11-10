import React, { useState, useRef, useEffect } from "react";
import "./canvas.css";

const ZoomableCanvas = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [columnCount, setColumnCount] = useState(4);
  const rowCount = 9;
  const canvasRefs = [useRef(), useRef(), useRef()];

  useEffect(() => {
    canvasRefs.forEach((canvasRef) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const cellSize = 60 * zoomLevel;
      canvas.width = columnCount * cellSize;
      canvas.height = rowCount * cellSize;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < columnCount; col++) {
          const x = col * cellSize;
          const y = row * cellSize;

          ctx.strokeStyle = "black";
          ctx.strokeRect(x, y, cellSize, cellSize);

          if (col === 0) {
            ctx.font = "bold 12px Arial";
            ctx.fillText("▲", x + 16, y + cellSize - 20);
          } else if (col === columnCount - 1) {
            ctx.font = "bold 22px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            const text = "O";
            const textMetrics = ctx.measureText(text);
            const textX = x + cellSize / 2;
            const textY = y + cellSize - 22;
            ctx.fillText(text, textX, textY);
          } else if (col === 1 && row >= 2) {
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("®", x + cellSize / 2, y + cellSize / 2);
          } else if (col === 2 && row >= 2) {
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("°", x + cellSize / 2, y + cellSize / 2);
          }
        }
      }
    });
  }, [zoomLevel, columnCount]);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel / 1.2);
  };

  const handleColumnCountChange = (event) => {
    const newColumnCount = parseInt(event.target.value, 10);
    setColumnCount(newColumnCount);
  };

  return (
    <div className="container">
      <div className="canvas-container">
        {canvasRefs.map((canvasRef, index) => (
          <canvas
            key={index}
            ref={canvasRef}
            width={400}
            height={300}
            style={{ marginRight: "20px" }}
          />
        ))}
      </div>
      <div>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div className="input-container">
        <label>
          Number of Columns:
          <input
            type="number"
            value={columnCount}
            onChange={handleColumnCountChange}
            min="1"
          />
        </label>
      </div>
    </div>
  );
};

export default ZoomableCanvas;
