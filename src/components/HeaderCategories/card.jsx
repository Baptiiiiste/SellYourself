import React from "react";
import { Link } from "react-router-dom";

export function Card({ name }) {
  return (
        <div className="HeaderCategories-card" ><Link className="HeaderCategories-link" to="/">{name}</Link></div>
  );
}
