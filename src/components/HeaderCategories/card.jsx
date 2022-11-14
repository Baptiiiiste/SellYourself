import React from "react";
import { Link } from "react-router-dom";

export function Card({ name }) {
    const changeCategorie = () => {
        const div = document.querySelector(".Home-display-categorie");
        div.innerHTML = name;
    }
    
    
    return (
        <div className="HeaderCategories-card">
            <Link className="HeaderCategories-link" to="/" onClick={changeCategorie}>
                {name}
            </Link>
        </div>
    );
}
