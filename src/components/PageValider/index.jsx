import './PageValider.css'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import { useState } from "react"

function ValidationAchat() { 

//     const [pseudo, setPseudo] = useState("");
//     const [password, setPassword] = useState("");
//     //const navigate = useNavigate();

//     // useEffect((navigate) => {
//     //     const connectedUser = localStorage.getItem("user");
//     //     if(connectedUser) navigate("/");
//     // },[]);

//     // const collectData = async () => {
//     //     let data = await fetch("http://localhost:5000/connexion", {
//     //         method: 'post',
//     //         body: JSON.stringify({pseudo, password}),
//     //         headers: {
//     //             'Content-Type':'application/json'
//     //         }
//     //     });
//     //     data = await data.json();
//     //     localStorage.setItem("user", JSON.stringify(data._id));
//     //     navigate("/");
//     // }


    return (
        <div className="PageValider">
            <p className='PageValider-Titre'>ACHAT</p>
            <div className="PageValider-Annonce">
            <img src={require('../../assets/DefaultPP.jpeg')} alt="" className='PageValider-Image'/>
                <div className="PageValider-InfoAchat">
                    <p className='PageValider-NomAnnonce'>Nom de l'annonce</p>
                    <p className='PageValider-PrixAnnonce'>XX.XX€</p>
                </div>
            </div>
            <div className='PageValider-DivBouton'>
                <button className='PageValider-Bouton'>CONFIRMER L'ACHAT</button>
            </div>
        </div>
    );
}

export default ValidationAchat;