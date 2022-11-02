import './InfoUtilisateur.css';
import React, { useEffect } from 'react';

function ChangeImg(e) {
    const imgProfil = document.querySelector('.InfoUtilisateur-image');
    imgProfil.src= "image/" + e.target.files[0].name;
}

function InfoUtilisateur({nom='Nom', prenom='Prénom', description='Description', paypal='PayPal.me', email='E-mail', ville='Ville'}){
    const ref = React.createRef();

    useEffect(() => {
        const input = ref.current;
        input.addEventListener('input', ChangeImg);
    }, []);

    return(
        <div className='InfoUtilisateur'>
            <div className='InfoUtilisateur-all'>
                <div className='InfoUtilisateur-photo'>
                    <img className="InfoUtilisateur-image" src={require("../../assets/DefaultPP.jpeg")} alt=""/>
                    <label for="image" className='InfoUtilisateur-Label'>Changer la photo</label>
                    <input type="file" className="InfoUtilisateur-modif" id="image" name="Image" accept=".jpg, .jpeg, .png" ref={ref}></input>
                </div>
                <div className='InfoUtilisateur-info'>
                    <input type="text" name="nom" placeholder={nom}/>
                    <input type="text" name="description" placeholder={description}/>
                    <input type="text" name="prenom" placeholder={prenom}/>
                    <input type="text" name="paypal" placeholder={paypal}/>
                    <input type="email" name="mail" placeholder={email}/>
                    <input type="text" name="ville" placeholder={ville}/>
                </div>
            </div>
            <div className='InfoUtilisateur-save'>
                <button className='InfoUtilisateur-button'>
                    Enregistrer les modifications
                </button>
            </div>
        </div>
    )
}

export default InfoUtilisateur;