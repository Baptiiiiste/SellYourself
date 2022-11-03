import './InfoUtilisateur.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InfoUtilisateur(){
    
    const connectedUser = sessionStorage.getItem("user");

    var actualNom = JSON.parse(connectedUser).nom ? JSON.parse(connectedUser).nom : "Nom";
    var actualPrenom = JSON.parse(connectedUser).prenom ? JSON.parse(connectedUser).prenom : "Prénom";
    var actualDescription = JSON.parse(connectedUser).description ? JSON.parse(connectedUser).description : "Description";
    var actualPaypal = JSON.parse(connectedUser).paypal ? JSON.parse(connectedUser).paypal : "Paypal.me/moncompte";
    var actualEmail = JSON.parse(connectedUser).email ? JSON.parse(connectedUser).email : "E-mail";
    var actualVille = JSON.parse(connectedUser).ville ? JSON.parse(connectedUser).ville : "Ville";

    
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [description, setDescription] = useState();
    const [paypal, setPaypal] = useState();
    const [email, setEMail] = useState();
    const [ville, setVille] = useState();

    const updateUser = async () => {
        let result = await fetch(`http://localhost:5000/api/utilisateur/${JSON.parse(connectedUser).pseudo}`, {
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
                    <input type="file" className="InfoUtilisateur-modif" id="image" name="Image" accept=".jpg, .jpeg, .png" onInput={ChangeImg}></input>
                </div>
                <div className='InfoUtilisateur-info'>
                    <input type="text" name="nom" placeholder={actualNom} value={nom} onChange={e => setNom(e.target.value)}/>
                    <input type="text" name="description" placeholder={actualDescription} value={description} onChange={e => setDescription(e.target.value)}/>
                    <input type="text" name="prenom" placeholder={actualPrenom} value={prenom} onChange={e => setPrenom(e.target.value)}/>
                    <input type="text" name="paypal" placeholder={actualPaypal} value={paypal} onChange={e => setPaypal(e.target.value)}/>
                    <input type="email" name="mail" placeholder={actualEmail} value={email} onChange={e => setEMail(e.target.value)}/>
                    <input type="text" name="ville" placeholder={actualVille} value={ville} onChange={e => setVille(e.target.value)}/>
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