import './modifAnnonce.css';
import React from 'react';
import {categories} from '../../assets/data'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ModifAnnonce() {

    const navigate = useNavigate();

    const connectedUser = sessionStorage.getItem("user");

    const params = useParams();

    // const [oldAnnonce, setOldAnnonce] = useState("");

    let [titre, setTitre] = useState("");
    let [description, setDescription] = useState("");
    let [prix, setPrix] = useState("");
    let [categorie, setCategorie] = useState("Autre");
    let [type, setType] = useState("Bien");
    let image;

    const displayImage = async () => {
        const div = document.querySelector('.ModifAnnonce-LesImages');
        const array = document.querySelector('.ModifAnnonce-Image').files;

        const nbImage = array.length + (document.querySelectorAll('.ModifAnnonce-img')).length;

        if(nbImage > 10){
            alert("Vous ne pouvez choisir plus de 10 images !")
        }
        else{
            for (let i = 0; i<array.length; i++){
                if(array[i].name.split('.').pop() === 'jpeg' || array[i].name.split('.').pop() === 'jpg' || array[i].name.split('.').pop() === 'jpng'){
                    const img = document.createElement('img');
                    img.src= "image/" + array[i].name;
                    img.className ='ModifAnnonce-img';
                    div.appendChild(img);
                }
            }
        }
    }

    const formulaire = async () => {
        const nbImage = (document.querySelectorAll('.ModifAnnonce-img')).length;
        if(!titre || !prix || nbImage === 0 || prix > 99999){
            alert("Vous devez renseigner au moins le titre, le prix de l'annonce ainsi qu'une image.");
        }else if(titre && prix && nbImage > 0 && prix <= 99999){
            if(titre && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(titre)){
                alert("Le titre est invalide");
            }
            if(description && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(description)){
                alert("La description est invalide");
            }
            image = [];
            const images = document.querySelectorAll('.ModifAnnonce-img');
            for(let i = 0; i<images.length; i++){
                if(images[i].src.split('.').pop() === 'jpeg' || images[i].src.split('.').pop() === 'jpg' || images[i].src.split('.').pop() === 'jpng'){
                }
            }
            let result = await fetch(`http://localhost:5000/api/publier/${JSON.parse(connectedUser).pseudo}`, {
                method: 'Post',
                body: JSON.stringify({titre, description, image, prix, type, categorie}),
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result.tokenError){
                return alert(result.tokenError);
            }
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            navigate("/");
        }
    }

    const getAnnonce = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`, {
            headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
        });
        result = await result.json();
        if(result.tokenError){
            return alert(result.tokenError);
        }
        setTitre(result.titre);
        setDescription(result.description);
        setPrix(result.prix);
        setCategorie(result.categorie);
        setType(result.type);
    }

    getAnnonce();

    return(
            <div className="ModifAnnonce-Input">
                <input type="text"
                        value={titre} 
                        className="ModifAnnonce-Titre" 
                        maxLength="80" 
                        onChange={(ev) => {setTitre(ev.target.value)}}/>

                <textarea value={description} 
                        className="ModifAnnonce-Description" 
                        maxLength="1000" 
                        onChange={(ev) => {setDescription(ev.target.value)}}/>

                <input value={prix} 
                        type="number" 
                        min = "0"
                        max="99999" 
                        className="ModifAnnonce-Prix" 
                        onChange={(ev) => {setPrix(ev.target.value)}}/>

                <div className='ModifAnnonce-Radio'>
                    <fieldset className='CreeAnnonce-RadioBouton'>
                        <legend> Type d'annonce proposée </legend>
                        <div>
                            <input type="radio" className="ModifAnnonce-Bien" id='Bien' name='Type' value="Bien" checked onChange={(ev) => {setType(ev.target.value)}}/>
                            <label for="Bien">Bien</label>
                        </div>
                        <div>
                            <input type="radio" className="ModifAnnonce-Service" id='Service' name='Type' value="Service" onChange={(ev) => {setType(ev.target.value)}}/>
                            <label for="Service">Service</label>
                        </div>
                    </fieldset>
                </div>

                <select name="Categorie" className="ModifAnnonce-Categorie" onChange={(ev) => {setCategorie(ev.target.value)}}>
                    <option value="">-- Choisissez une catégorie --</option>
                    {categories.map(({ name }, index) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>

                <div className='ModifAnnonce-LesImages'>

                </div>

                <label for="image" className='ModifAnnonce-Label'>Ajouter une photo</label>
                <input type="file" className="ModifAnnonce-Image" id="image" name="Image" accept=".jpg, .jpeg, .png" multiple onInput={displayImage}></input>

                <p>Format .png, .jpeg et .jpg uniquement</p> 
                <div className='ModifAnnonce-BoutonSubmit'>
                    <button className="ModifAnnonce-Submit" /*onClick={formulaire}*/> Publier l'annonce </button>
                </div>
                
            </div>
    )
}

export default ModifAnnonce;