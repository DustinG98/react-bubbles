import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: ""
    }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let filteredColors = colors.filter(color => color.id !== colorToEdit.id)

    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(updateColors([...filteredColors, colorToEdit]))
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    let newColors = colors.filter(theColor => theColor.id !== color.id)
    updateColors(newColors)
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault()
    axiosWithAuth().post('/colors', newColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={e => addColor(e)}>
        <h3>Add new color</h3>
        <input name="color" value={newColor.color} onChange={e => setNewColor({...newColor, color: e.target.value})}/>
        <input name="hex" value={newColor.code.hex} onChange={e => setNewColor({ ...newColor, code: { hex: e.target.value } })}/>
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
