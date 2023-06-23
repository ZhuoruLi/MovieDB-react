import React from "react";
import { CATEGORIES } from "./constants";

export default function CategorySelect(props) {
  const handleChange = (e) => {
    props.setCategory(e.target.value);
  };
  return (
    <select value={props.category} onChange={handleChange}>
      {CATEGORIES.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        );
      })}
    </select>
  );
}
