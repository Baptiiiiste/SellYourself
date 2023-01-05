// Import 
import './creerAnnonce.css';
import React, { useState } from 'react';
import { categories } from '../../assets/data'
import { useNavigate } from 'react-router-dom';

// Composant qui représente le formulaire pour publier une annonce
function CreerAnnonce() {
    // Variables
    const navigate = useNavigate();
    const connectedUser = sessionStorage.getItem("user");
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [categorie, setCategorie] = useState("Autre");
    const [type, setType] = useState("Bien");
    const [image, setImage] = useState([]);

    // Fonction pour convertir un fichier en base64
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const deleteImage = (img) => {
        const div = document.querySelector('.CreerAnnonce-LesImages');
        const buttonImage = document.getElementById(img);
        div.removeChild(buttonImage);
    }

    // Fonction pour afficher les images
    const displayImage = async () => {
        const div = document.querySelector('.CreerAnnonce-LesImages');
        const files = document.querySelector('.CreerAnnonce-Image').files;

        const nbImage = files.length + (document.querySelectorAll('.CreerAnnonce-img')).length;

        if(nbImage > 5){
            alert("Vous ne pouvez choisir plus de 5 images !")
        }
        else{
            let lesImages = []
            image.forEach(element => {
                lesImages.push(element)
            });
            for (let i = 0; i<files.length; i++){
                const extension = files[i].name.split('.').pop().toLowerCase();
                const size = files[i].size;

                if(size > 2097152){
                    alert(`La taille de ce fichier (${files[i].name}) est trop grand`)
                } else {
                    if(extension === 'jpeg' || extension === 'jpg' || extension === 'png'){
                        const imageBase64 = await toBase64(files[i]);

                        const img = document.createElement('img');
                        img.src= imageBase64;
                        img.className ='CreerAnnonce-img';
                        img.alt = "";

                        const button = document.createElement('button');
                        button.className = "CreerAnnonce-button-img";
                        button.id = imageBase64;
                        button.onclick = () => {deleteImage(imageBase64)};
                        button.appendChild(img)
                        div.appendChild(button);

                        lesImages.push(imageBase64);
                    } else {
                        alert("Seulement les fichiers .jpg, .jpeg et .png sont accepter")
                    }
                }
            }
            setImage(lesImages);
        }
    }

    // Fonction pour valider le formulaire et envoyer l'annonce en base de données
    const formulaire = async () => {
        const nbImage = (document.querySelectorAll('.CreerAnnonce-img')).length;

        let result = await fetch(`http://localhost:5000/api/annonce/utilisateur/${JSON.parse(connectedUser).pseudo}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        const nbAnnonce = result.annonces.length
        if(nbAnnonce >= 5){
            alert("Vous avez déjà atteint je nombre maximum d'annonce")
        }
        if(JSON.parse(connectedUser).paypal.length === 0){
            alert("Vous devez renseigner votre PayPal avant de publier une annonce")
        }
        if(!titre || !prix || nbImage === 0 || prix > 99999){
            alert("Vous devez renseigner au moins le titre, le prix de l'annonce ainsi qu'une image.");
        }
        if(titre && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(titre)){
            alert("Le titre est invalide");
        }
        if(description && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(description)){
            alert("La description est invalide");
        }
        if(prix <0){
            alert("Le prix doit être positif");
        }
        if(categorie.length === 0){
            setCategorie('Autre');
        }
        else if(titre && prix && nbImage > 0 && prix <= 99999 && JSON.parse(connectedUser).paypal.length !== 0){
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

    // Affichage HTML
    return(
        <div className="CreerAnnonce-Input">
            <input type="text"
                    placeholder='Titre' 
                    className="CreerAnnonce-Titre" 
                    maxLength="80" 
                    onChange={(ev) => {setTitre(ev.target.value)}}/>

            <textarea placeholder='Description' 
                    className="CreerAnnonce-Description" 
                    maxLength="1000" 
                    onChange={(ev) => {setDescription(ev.target.value)}}/>

            <input placeholder='Prix' 
                    type="number" 
                    min = "0"
                    max="99999" 
                    className="CreerAnnonce-Prix" 
                    onChange={(ev) => {setPrix(ev.target.value)}}/>

            <select name="Categorie" className="CreerAnnonce-Categorie" onChange={(ev) => {setType(ev.target.value)}}>
                <option value="">-- Type d'annonce --</option>
                <option value="Bien">Bien</option>
                <option value="Service">Service</option>
            </select>

            <select name="Categorie" className="CreerAnnonce-Categorie" onChange={(ev) => {setCategorie(ev.target.value)}}>
                <option value="">-- Catégorie --</option>
                {categories.map(({ name }, index) => (
                    <option value={name}>{name}</option>
                ))}
            </select>

            <div className='CreerAnnonce-LesImages'>

            </div>

            <label for="image" className='CreerAnnonce-Label'>Ajouter une photo</label>
            <input type="file" className="CreerAnnonce-Image" id="image" name="Image" accept=".jpg, .jpeg, .png" multiple onInput={displayImage}></input>

            <p>Format .png, .jpeg et .jpg uniquement</p> 
            <div className='CreerAnnonce-BoutonSubmit'>
                <button className="CreerAnnonce-Submit" onClick={formulaire}> Publier l'annonce </button>
            </div>
        </div>
    )
}

export default CreerAnnonce;