// Import 
import './PageValider.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom'



function ValidationAchat({annonce}) { 
    const displayImage = () => {
        if(annonce.image !== undefined){
            if(annonce.image.length === 0) return <img className="PageValider-Image" src={require('../../assets/default.png')}/>
            else return <img className="PageValider-Image" src={annonce.image[0]}/>
        }
    }

    const style = {                         
        layout: 'vertical',
        color:  'gold',
        shape:  'pill',
        label:  'paypal'};

    const navigate = useNavigate();
        // const amount = "5";
    const amount = annonce.prix;
    const currency = "EUR";
    const connectedUser = JSON.parse(sessionStorage.getItem("user")).pseudo;

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
                {/* <button className='PageValider-Bouton'>CONFIRMER L'ACHAT</button> */}
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
                                            // payee: {
                                            //     email_address: "sb-43474ut23415175@business.example.com"
                                            // //     merchant_id:
                                            // }
                                        },
                                    ],
                                })
                                .then((orderId) => {
                                    // Your code here after create the order
                                    return orderId;
                                });
                            return orderId;
                        }}
                        
                        onApprove={async function (data, actions) {
                            return actions.order.capture().then(async function(){
                                let resultAchat = await fetch(`http://localhost:5000/api/achat`, {
                                    method: 'Post',
                                    body: JSON.stringify({ acheteur: connectedUser, annonce: annonce._id }),
                                    headers: {
                                        'Content-Type': 'Application/json',
                                        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                    }
                                });
                                let resultNotif = await fetch(`http://localhost:5000/api/utilisateur/addNotif`, {
                                    method: 'Post',
                                    headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        'Content-Type': 'application/json',
                                        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                    },
                                    body: JSON.stringify({ type: "client", content: `Votre annonce ${annonce.titre} a été vendue à ${connectedUser}, Jetez un oeil à vos conversations récentes`, client: connectedUser })
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