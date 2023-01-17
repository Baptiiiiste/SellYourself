// Import 
import './PageValider.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom'

// Composant qui représente l'achat d'une annonce
function ValidationAchat({annonce}) { 
    // Variables
    const style = {                         
        layout: 'vertical',
        color:  'gold',
        shape:  'pill',
        label:  'paypal'};

    const navigate = useNavigate();
    const amount = annonce.prix;
    const currency = "EUR";
    const connectedUser = JSON.parse(sessionStorage.getItem("user")).pseudo;

    // Fonction pour afficher l'image
    const displayImage = () => {
        if(annonce.image !== undefined){
            if(annonce.image.length === 0) return <img className="PageValider-Image" src={require('../../assets/default.png')}/>
            else return <img className="PageValider-Image" src={annonce.image[0]}/>
        }
    }

    // Affichage HTML
    return (
        <div className="PageValider">
            <p className='PageValider-Titre'>ACHAT</p>
            <div className="PageValider-Annonce">
                {displayImage()}
                <div className="PageValider-InfoAchat">
                    <p className='PageValider-NomAnnonce'>{annonce.titre}</p>
                    <p className='PageValider-PrixAnnonce'>{annonce.prix}€</p>
                </div>
            </div>
            <div className='PageValider-DivBouton'>
                <PayPalScriptProvider options={{ "client-id": "Af6eNd93COGamQLT09xSok7j9AEc9i3_Xop6mmpaTsJQ7S0usEF5iJqfVOIHrr7kh2A3rX2qAjrZVUPc", currency: "EUR" }}>
                    <PayPalButtons
                        style={style}
                        disabled={false}
                        forceReRender={[amount, currency, style]}
                        fundingSource={undefined}
                        createOrder={async (data, actions) => {
                            const orderId = await actions.order
                                .create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: currency,
                                                value: amount,
                                            },
                                        },
                                    ],
                                })
                                .then((orderId) => {
                                    return orderId;
                                });
                            return orderId;
                        }}
                        
                        onApprove={async function (data, actions) {
                            return actions.order.capture().then(async function(){
                                await fetch(`http://localhost:5000/api/achat`, {
                                    method: 'Post',
                                    body: JSON.stringify({ acheteur: connectedUser, annonce: annonce._id }),
                                    headers: {
                                        'Content-Type': 'Application/json',

                                        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                    }
                                });
                                await fetch(`http://localhost:5000/api/utilisateur/addNotif`, {
                                    method: 'Post',
                                    body: JSON.stringify({ type: "client", content: `Votre annonce ${annonce.titre} a été acheté par ${connectedUser}`, destinataire: annonce.utilisateur }),
                                    headers: {

                                        'Content-Type': 'application/json',
                                        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                    }
                                });
                                navigate(`/conversation/${annonce._id}`);
                            })
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default ValidationAchat;