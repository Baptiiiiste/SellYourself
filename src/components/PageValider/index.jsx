// Import 
import './PageValider.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// import { PayPalButton } from "react-paypal-button-v2";
// import {
//     PayPalScriptProvider,
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";

function ValidationAchat({annonce}) { 
    const displayImage = () => {
        if(annonce.image !== undefined){
            if(annonce.image.length === 0) return <img className="PageValider-Image" src={require('../../assets/default.png')}/>
            else return <img className="PageValider-Image" src={annonce.image}/>
        }
    }

    const style = {                         
        layout: 'vertical',
        color:  'gold',
        shape:  'pill',
        label:  'paypal'};
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
                <PayPalScriptProvider options={{ "client-id": "Af6eNd93COGamQLT09xSok7j9AEc9i3_Xop6mmpaTsJQ7S0usEF5iJqfVOIHrr7kh2A3rX2qAjrZVUPc" }}>
                    <PayPalButtons
                        style={style}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default ValidationAchat;