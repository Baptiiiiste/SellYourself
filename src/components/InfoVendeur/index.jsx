import './InfoVendeur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function InfoVendeur({nom='Nom', prenom='Prénom', description='Description', paypal='PayPal.me', ville='Ville', note}){
    return(
        <div className='InfoVendeur'>
            <div className='InfoVendeur-photo'>
                <img className="InfoVendeur-image" src={require("../../assets/DefaultPP.jpeg")} alt=""/>
                <p className='InfoVendeur-nomPrenom'>{prenom} {nom}</p>
                <div className='InfoVendeur-note'>
                    <p> Note : {note}/5 </p>
                    <FontAwesomeIcon className='InfoVendeur-icon' icon={faStar}/>
                </div>
            </div>
            <div className='InfoVendeur-info'>
                <div className='InfoVendeur-other'>
                    <p className='InfoVendeur-ville'>{ville}</p>
                    <p className='InfoVendeur-paypal'>{paypal}</p>
                </div>
                <p className='InfoVendeur-description'>{description}</p>
            </div>
        </div>
    )
}

export default InfoVendeur;