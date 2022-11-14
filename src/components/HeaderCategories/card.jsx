import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Card({ name }) {
    const [recherche, setRecherche] = useState('Toutes');

    const changeCategorie = () => {
        const div = document.querySelector(".Home-display-categorie");
        div.innerHTML = name;
    }

    setTimeout(() => {
        getRecherche();
    },0);

    const getRecherche = () => {
       const recherche = document.querySelector('.Categorie-display-search');
       if(recherche != null){
        setRecherche(recherche.innerHTML);
       }
    }
    
    return (
        <div className="HeaderCategories-card">
            <Link className="HeaderCategories-link" to={"/search/"+ name +"/"+recherche} onClick={changeCategorie}>
                {name}
            </Link>
        </div>
    );
}
