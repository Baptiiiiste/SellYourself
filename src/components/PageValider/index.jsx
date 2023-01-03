// Import 
import './PageValider.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";



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
    
        // const amount = "5";
    const amount = annonce.prix;
    const currency = "EUR";

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
                        createOrder={(data, actions) => {
                            return actions.order
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
                                        }
                                    ],
                                })
                                .then((orderId) => {
                                    // Your code here after create the order

                                    return orderId;
                                });
                        }}
                        onApprove={function (data, actions) {
                            return actions.order.capture().then(async function() {
                                let resultNotif = await fetch(`"/api/utilisateur/addNotif/:pseudo"`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept':'application/json, text/plain, */*',
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify({type:"client",content:"Votre annonce a été vendu"})
                                }
                                )
                                // Your code here after capture the order
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default ValidationAchat;