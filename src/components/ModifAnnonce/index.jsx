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
    let [image, setImage] = useState([]);

    let [actualtitre, setactualTitre] = useState("");
    let [actualdescription, setactualDescription] = useState("");
    let [actualprix, setactualPrix] = useState("");
    let [actualcategorie, setactualCategorie] = useState("Autre");
    let [actualtype, setactualType] = useState("Bien");
    let [actualimage, setactualImage] = useState([]);

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
        console.log("oui");
        const div = document.querySelector('.ModifAnnonce-LesImages');
        const image = document.getElementById(img);
        div.removeChild(image);
    }

    const displayImageDiv = () => {
        if (actualimage !== undefined) {
            if (actualimage.length !== 0) {
                return (actualimage.map((item, index) => (
                    <button className='ModifAnnonce-button-img' id={item} onclick={() => {deleteImage()}}>
                        <img className='ModifAnnonce-img' src={item} alt=''/>
                    </button> 
                )));
            }
        }
    }

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
        setactualTitre(result.titre);
        setactualDescription(result.description);
        setactualPrix(result.prix);
        setactualCategorie(result.categorie);
        setactualType(result.type);
        setactualImage(result.image);
    }

    getAnnonce();

    return(
            <div className="ModifAnnonce-Input">
                <input type="text"
                        placeholder={actualtitre}
                        value={titre} 
                        className="ModifAnnonce-Titre" 
                        maxLength="80" 
                        onChange={(ev) => {setTitre(ev.target.value)}}/>

                <textarea value={description} 
                        placeholder={actualdescription}
                        className="ModifAnnonce-Description" 
                        maxLength="1000" 
                        onChange={(ev) => {setDescription(ev.target.value)}}/>

                <input value={prix} 
                        placeholder={actualprix}
                        type="number" 
                        min = "0"
                        max="99999" 
                        className="ModifAnnonce-Prix" 
                        onChange={(ev) => {setPrix(ev.target.value)}}/>

                <select name="Categorie" className="ModifAnnonce-Categorie" onChange={(ev) => {setType(ev.target.value)}}>
                    <option value="">-- Type d'annonce --</option>
                    <option value="Bien">Bien</option>
                    <option value="Service">Service</option>
                </select>

                <select name="Categorie" className="ModifAnnonce-Categorie" onChange={(ev) => {setCategorie(ev.target.value)}}>
                    <option value="">-- Choisissez une catégorie --</option>
                    {categories.map(({ name }, index) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>

                <div className='ModifAnnonce-LesImages'>
                    {displayImageDiv()}
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