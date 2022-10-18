import './InfoUtilisateur.css';

function InfoUtilisateur({nom='Nom', prenom='Prénom', description='Description', paypal='PayPal.me', email='E-mail', ville='Ville'}){
    return(
        <div className='InfoUtilisateur'>
            <div className='InfoUtilisateur-all'>
                <div className='InfoUtilisateur-photo'>
                    <img className="InfoUtilisateur-image" src={require("../../assets/DefaultPP.jpeg")} alt=""/>
                    <button className='InfoUtilisateur-modif'>
                        Changer la photo
                    </button>
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