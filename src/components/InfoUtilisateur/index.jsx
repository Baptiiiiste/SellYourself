import './InfoUtilisateur.css';
import { useState } from 'react';
import bcrypt from "bcryptjs"

// Salt
const salt = bcrypt.genSaltSync(10);


function InfoUtilisateur(){
    
    const connectedUser = sessionStorage.getItem("user");

    var actualNom = JSON.parse(connectedUser).nom ? `Nom: ${JSON.parse(connectedUser).nom}`  : "Nom";
    var actualPrenom =  JSON.parse(connectedUser).prenom ? `Prénom: ${JSON.parse(connectedUser).prenom}` : "Prénom";
    var actualDescription =  JSON.parse(connectedUser).description ? `Description: ${JSON.parse(connectedUser).description}` : "Description";
    var actualPaypal =  JSON.parse(connectedUser).paypal ? `Paypal: ${JSON.parse(connectedUser).paypal}` : "Paypal.me/moncompte";
    var actualEmail =  JSON.parse(connectedUser).email ? `Email: ${JSON.parse(connectedUser).email}` : "E-mail";
    var actualVille = JSON.parse(connectedUser).ville ? `Ville: ${JSON.parse(connectedUser).ville}` : "Ville";

    
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [description, setDescription] = useState();
    const [paypal, setPaypal] = useState();
    const [email, setEMail] = useState();
    const [ville, setVille] = useState();

    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const updateUser = async () => {

        let result = await fetch(`http://localhost:5000/api/utilisateur/updateUser/${JSON.parse(connectedUser).pseudo}`, {
            method: "Put",
            body: JSON.stringify({nom, prenom, description, ville, paypal, email}),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json();

        if(result.erreur){
            alert(JSON.stringify(result.erreur));
        }else{
            sessionStorage.removeItem("user")
            sessionStorage.setItem("user", JSON.stringify(result.user));

        }
    }

    const updatePassword = async () => {
        
        const password = bcrypt.hashSync(newPassword, salt);
        let result = await fetch(`http://localhost:5000/api/utilisateur/updatePassword/${JSON.parse(connectedUser).pseudo}`, {
            method: "Post",
            body: JSON.stringify({oldPassword, password} ),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if(result.erreur){
            alert(JSON.stringify(result.erreur));
        }else if(result.result){
            alert(JSON.stringify(result.result));
        }
    }

    const ChangeImg = async () => {
        const imgProfil = document.querySelector('.InfoUtilisateur-image');
        imgProfil.src= "image/" + document.querySelector('.InfoUtilisateur-modif').files[0].name;
    }


    return(
        <div className='InfoUtilisateur'>
            <div className='InfoUtilisateur-all'>
                <div className='InfoUtilisateur-photo'>
                    <img className="InfoUtilisateur-image" src={require("../../assets/DefaultPP.jpeg")} alt=""/>
                    <label for="image" className='InfoUtilisateur-Label'>Changer la photo</label>
                    <input type="file" className="InfoUtilisateur-modif" id="image" name="Image" accept=".jpg, .jpeg, .png" onChange={ChangeImg}></input>
                </div>
                <div className='InfoUtilisateur-info'>
                    <input className='InfoUtilisateur-info-name' type="text" name="nom" placeholder={actualNom} value={nom} onChange={e => setNom(e.target.value)}/>
                    <input type="text" name="description" placeholder={actualDescription} value={description} onChange={e => setDescription(e.target.value)}/>
                    <input type="text" name="prenom" placeholder={actualPrenom} value={prenom} onChange={e => setPrenom(e.target.value)}/>
                    <input type="text" name="paypal" placeholder={actualPaypal} value={paypal} onChange={e => setPaypal(e.target.value)}/>
                    <input type="email" name="mail" placeholder={actualEmail} value={email} onChange={e => setEMail(e.target.value)}/>
                    <input type="text" name="ville" placeholder={actualVille} value={ville} onChange={e => setVille(e.target.value)}/>
                    <fieldset className='InfoUtilisateur-mdp'>
                        <legend> Changer de mot de passe </legend>
                        <input type="password" placeholder="Ancien mot de passe" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                        <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
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