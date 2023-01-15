// Import
import './modifAnnonce.css';
import {categories} from '../../assets/data'
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Composant qui représente le formulaire pour modifier une annonce 
function ModifAnnonce() {
    // Variables
    const navigate = useNavigate();
    const connectedUser = sessionStorage.getItem("user");
    const params = useParams();

    let [titre, setTitre] = useState("");
    let [description, setDescription] = useState("");
    let [prix, setPrix] = useState("");
    let [categorie, setCategorie] = useState("Autre");
    let [type, setType] = useState("Bien");
    let [image, setImage] = useState([]);

    let [id, setId] = useState("");
    let [actualtitre, setactualTitre] = useState("");
    let [actualdescription, setactualDescription] = useState("");
    let [actualprix, setactualPrix] = useState("");
    let [actualimage, setactualImage] = useState([]);

    useEffect(() => {
        getAnnonce()
    }, [])

    // Fonction qui récupère l'annonce
    const getAnnonce = async () => {
        let result = await fetch(`https://sellyourself.fr:5000/api/annonce/${params.annonce}`, {
            headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
        });
        result = await result.json();
        if(result.tokenError){
            return alert(result.tokenError);
        }
        setId(result._id);
        setactualTitre(result.titre);
        setactualDescription(result.description);
        setactualPrix(result.prix);
        setactualImage(result.image);

        setTitre(result.titre);
        setDescription(result.description);
        setPrix(result.prix);
        setCategorie(result.categorie);
        setType(result.type);
        setImage(result.image);
    }

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

    // Fonction pour supprimer une image
    const deleteImage = (img) => {
        const div = document.querySelector('.ModifAnnonce-LesImages');
        const buttonImage = document.getElementById(img);
        div.removeChild(buttonImage);
        let index = image.indexOf(img);
        if (index > -1) {
            image.splice(index, 1);
        }
    }

    // Fonction pour afficher le conteneur des images
    const displayImageDiv = () => {
        if (actualimage !== undefined) {
            if (actualimage.length !== 0) {
                return (actualimage.map((item, index) => (
                    <button className='ModifAnnonce-button-img' id={item} onClick={() => {deleteImage(item)}}>
                        <img className='ModifAnnonce-img' src={item} alt=''/>
                    </button> 
                )));
            }
        }
    }

    // Fonction pour afficher les images
    const displayImage = async () => {
        const div = document.querySelector('.ModifAnnonce-LesImages');
        const files = document.querySelector('.ModifAnnonce-Image').files;

        const nbImage = files.length + image.length;

        if(nbImage > 5){
            alert("Vous ne pouvez choisir plus de 5 images !")
        }
        else{
            for (let file of files){
                const extension = file.name.split('.').pop().toLowerCase();
                const size = file.size;

                if(size > 2097152){
                    alert(`La taille de ce fichier (${file.name}) est trop grand`)
                } else {
                    if(extension === 'jpeg' || extension === 'jpg' || extension === 'png'){
                        const imageBase64 = await toBase64(file);

                        const img = document.createElement('img');
                        img.src= imageBase64;
                        img.className ='ModifAnnonce-img';
                        img.alt = "";

                        const button = document.createElement('button');
                        button.className = "ModifAnnonce-button-img";
                        button.id = imageBase64;
                        button.onclick = () => {deleteImage(imageBase64)};
                        button.appendChild(img);
                        div.appendChild(button);

                        image.push(imageBase64);
                    } else {
                        alert("Seulement les fichiers .jpg, .jpeg et .png sont accepter")
                    }
                }
            }
        }
    }

    // Fonction pour valider le formulaire et envoyer l'annonce en base de données
    const formulaire = async () => {
        const nbImage = image.length;

        let result = await fetch(`https://sellyourself.fr:5000/api/annonce/user`, {
            method: 'Post',
            body: JSON.stringify({pseudo: JSON.parse(connectedUser).pseudo}),
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        const nbAnnonce = result.annonces.length;
        
        if(nbAnnonce >= 5){
            alert("Vous avez déjà atteint le nombre maximum d'annonces")
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
        else if(titre && prix && nbImage > 0 && prix <= 99999){
            let result = await fetch(`https://sellyourself.fr:5000/api/annonce/edit/${id}/${JSON.parse(connectedUser).pseudo}`, {
                method: 'Put',
                body: JSON.stringify({titre, description, image, prix, type, categorie}),
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            console.log(result.annonce);
            if(result.tokenError){
                return alert(result.tokenError);
            }
            navigate("/profil");
        }
    }

    // Affichage HTML
    return(
            <div className="ModifAnnonce-Input">
                <input type="text"
                        placeholder={actualtitre}
                        className="ModifAnnonce-Titre" 
                        maxLength="80" 
                        onChange={(ev) => {setTitre(ev.target.value)}}/>

                <textarea
                        placeholder={actualdescription}
                        className="ModifAnnonce-Description" 
                        maxLength="1000" 
                        onChange={(ev) => {setDescription(ev.target.value)}}/>

                <input placeholder={actualprix}
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
                    <button className="ModifAnnonce-Submit" onClick={formulaire}> Modifier l'annonce </button>
                </div>
            </div>
    )
}

export default ModifAnnonce;