import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewBoxForm({ createBox }) {
  const [formData, setFormData] = useState({
    height: "",
    width: "",
    backgroundColor: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const gatherInput = evt => {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  };

  return (
    <div>
      <form onSubmit={gatherInput}>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            id="height"
            name="height"
            type="text"
            onChange={handleChange}
            value={formData.height}
          />
        </div>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            id="width"
            name="width"
            type="text"
            onChange={handleChange}
            value={formData.width}
          />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            id="backgroundColor"
            name="backgroundColor"
            type="text"
            onChange={handleChange}
            value={formData.backgroundColor}
          />
        </div>
        <button id="newBoxButton">Add a new box!</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
