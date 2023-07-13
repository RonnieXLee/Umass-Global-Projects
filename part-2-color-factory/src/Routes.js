import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import ColorList from "./ColorList";
import NewColorForm from "./NewColorForm";
import Color from "./Color";

const DEFAULT_COLORS = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

function App() {
  const initialColors = JSON.parse(localStorage.getItem("colors")) || DEFAULT_COLORS;
  const [colors, setColors] = useState(initialColors);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  function handleAdd(newColorObj) {
    setColors((prevColors) => ({ ...prevColors, ...newColorObj }));
    navigate("/colors");
  }

  function handleClearColors() {
    setColors({});
  }

  return (
    <div>
      <nav>
        <Link to="/colors">Colors</Link>{" "}
        <Link to="/colors/new">Add Color</Link>
      </nav>

      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} clearColors={handleClearColors} />} />
        <Route path="/colors/new" element={<NewColorForm addColor={handleAdd} />} />
        <Route path="/colors/:color" element={<Color colors={colors} />} />
      </Routes>
    </div>
  );
}

export default App;
