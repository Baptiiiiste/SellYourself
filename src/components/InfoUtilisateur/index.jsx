// Import 
import './InfoUtilisateur.css';
import { useState } from 'react';
import bcrypt from "bcryptjs"

// Sel pour le mot de passe
const salt = bcrypt.genSaltSync(10);

// Composant qui représente les informations générales d'un utilisateur 
function InfoUtilisateur() {
    // Variables
    const connectedUser = sessionStorage.getItem("user");
    let actualNom = JSON.parse(connectedUser).nom ? `Nom: ${JSON.parse(connectedUser).nom}` : "Nom";
    let actualPrenom = JSON.parse(connectedUser).prenom ? `Prénom: ${JSON.parse(connectedUser).prenom}` : "Prénom";
    let actualDescription = JSON.parse(connectedUser).description ? `Description: ${JSON.parse(connectedUser).description}` : "Description";
    let actualPaypal = JSON.parse(connectedUser).paypal ? `Paypal: ${JSON.parse(connectedUser).paypal}` : "Paypal.me/moncompte";
    let actualEmail = JSON.parse(connectedUser).email ? `Email: ${JSON.parse(connectedUser).email}` : "E-mail";
    let actualVille = JSON.parse(connectedUser).ville ? `Ville: ${JSON.parse(connectedUser).ville}` : "Ville";
    let image = JSON.parse(connectedUser).profilPic;
    let [nom, setNom] = useState();
    let [prenom, setPrenom] = useState();
    let [description, setDescription] = useState();
    let [paypal, setPaypal] = useState();
    let [email, setEMail] = useState();
    let [ville, setVille] = useState();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Fonction pour modifier les informations d'un utilisateur
    const updateUser = async () => {
        if (email && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            return alert("Email incorrecte");
        }

        if(!/^[a-zA-Z0-9_.-]*$/.test(nom)){
            return alert("Nom incorrecte, n'utiliser que des lettres et des chiffres, l'underscore: _, le point et le tiret");
        }

        if(!/^[a-zA-Z0-9_.-]*$/.test(prenom)){
            return alert("Prénom incorrecte, n'utiliser que des lettres et des chiffres, l'underscore: _, le point et le tiret");
        }

        if(!/^[a-zA-Z0-9_.-]*$/.test(ville)){
            return alert("Ville incorrecte, n'utiliser que des lettres et des chiffres, l'underscore: _, le point et le tiret");
        }

        if(/^\s$/.test(nom)) nom = "";
        if(/^\s$/.test(prenom)) prenom = "";
        if(/^\s$/.test(description)) description = "";
        if(/^\s$/.test(ville)) ville = "";
        if(/^\s$/.test(paypal)) paypal = "";

        let result = await fetch(`http://localhost:5000/api/utilisateur/updateUser/${JSON.parse(connectedUser)._id}`, {
            method: "Put",
            body: JSON.stringify({ nom, prenom, description, ville, paypal, email }),
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });

        result = await result.json();

        if (result.erreur) {
            alert(result.erreur);
        } else if (result.tokenError) {
            alert(result.tokenError);
        } else {
            sessionStorage.removeItem("user")
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload(false);
        }
    }

    // Fonction pour modifier le mot de passe
    const updatePassword = async () => {
        if (newPassword.includes(" ")) {
            return alert("Nouveau mot de passe incorrecte, ne pas utiliser d'espace");
        }

        const password = bcrypt.hashSync(newPassword, salt);
        let result = await fetch(`http://localhost:5000/api/utilisateur/updatePassword/${JSON.parse(connectedUser)._id}`, {
            method: "Post",
            body: JSON.stringify({ oldPassword, password }),
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result.erreur) {
            alert(JSON.stringify(result.erreur));
        } else if (result.tokenError) {
            alert(result.tokenError);
        } else if (result.result) {
            alert(JSON.stringify(result.result));
        }
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

    // Fonction pour modifier l'image de profil
    const ChangeImg = async () => {
        const imgProfil = document.querySelector('.InfoUtilisateur-image');
        const image = document.querySelector('.InfoUtilisateur-modif').files[0];
        const extension = image.name.split('.').pop().toLowerCase();
        const size = image.size;

        if(size > 2097152){
            alert(`La taille de ce fichier (${image.name}) est trop grand`)
        } else {
            if(extension === 'jpeg' || extension === 'jpg' || extension === 'png'){
                const profilPic = await toBase64(image);
                imgProfil.src = profilPic;

                let result = await fetch(`http://localhost:5000/api/utilisateur/image/${JSON.parse(connectedUser).pseudo}`, {
                    method: "Put",
                    body: JSON.stringify({ profilPic }),
                    headers: {
                        'Content-Type': 'Application/json',
                        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    }
                });
                result = await result.json();
                if (result.erreur) {
                    alert(result.erreur);
                } else if (result.tokenError) {
                    alert(result.tokenError);
                } else {
                    sessionStorage.removeItem("user")
                    sessionStorage.setItem("user", JSON.stringify(result.user));
                    window.location.reload(true);
                }
            } else {
                alert("Seulement les fichiers .jpg, .jpeg et .png sont accepter")
            }
        }
    }

    // Affichage HTML
    return (
        <div className='InfoUtilisateur'>
            <div className='InfoUtilisateur-all'>
                <div className='InfoUtilisateur-photo'>
                    <div className="InfoUtilisateur-div-image">
                        <img className="InfoUtilisateur-image" src={image} alt="" />
                    </div>
                    
                    <label for="image" className='InfoUtilisateur-Label'>Changer la photo</label>
                    <input type="file" className="InfoUtilisateur-modif" id="image" name="Image" accept=".jpg, .jpeg, .png" onChange={ChangeImg}></input>
                </div>
                <div className='InfoUtilisateur-info'>
                    <input className='InfoUtilisateur-info-name' type="text" name="nom" placeholder={actualNom} value={nom} onChange={e => setNom(e.target.value)} />
                    <input type="text" name="description" placeholder={actualDescription} value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" name="prenom" placeholder={actualPrenom} value={prenom} onChange={e => setPrenom(e.target.value)} />
                    <input type="text" name="paypal" placeholder={actualPaypal} value={paypal} onChange={e => setPaypal(e.target.value)} />
                    <input type="email" name="mail" placeholder={actualEmail} value={email} onChange={e => setEMail(e.target.value)} />
                    <input type="text" name="ville" placeholder={actualVille} value={ville} onChange={e => setVille(e.target.value)} />
                    <fieldset className='InfoUtilisateur-mdp'>
                        <legend> Changer de mot de passe </legend>
                        <input type="password" placeholder="Ancien mot de passe" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                        <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <button className='InfoUtilisateur-button' onClick={updatePassword}>
                            Enregistrer le mot de passe
                        </button>
                    </fieldset>
                </div>
            </div>
            <div className='InfoUtilisateur-save'>
                <button className='InfoUtilisateur-button' onClick={updateUser}>
                    Enregistrer les modifications
                </button>
            </div>
        </div>
    )
}

export default InfoUtilisateur;