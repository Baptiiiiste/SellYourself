// Import 
import './UneAnnonce.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, React } from 'react';

// Composant qui représente le vendeur
function Vendeur({pseudo, photo, note}){
    // Variable
    let nbNote = note.length;

    if(nbNote === 0){
        note = "Aucune note"
    }
    else{
        let moy = 0;
        for( const n of note){
            moy += parseInt(n.note);
        }
        moy = Number((moy/nbNote).toFixed(2));
        note = moy + "/5";
    }

    // Affichage HTML
    return(
        <div className='Vendeur-all'>
            <img className='Vendeur-img' src={photo} alt=""/>
            <div className='Vendeur-info'>
                <p className='Vendeur-nom'>{pseudo}</p>
                <p className='Vendeur-note'>Note: {note}{ note !== "Aucune note" && <FontAwesomeIcon icon={faStar} />}</p>
                {nbNote !== 0 && <p className='Vendeur-note'> ( {nbNote} avis )</p>}
            </div>
        </div>
    )
}

// Composant qui représente le bouton favoris
function Button({id, prix, titre, pseudo}){
    // Variable
    let connectedUser = sessionStorage.getItem("user");

    // Fonction pour ajouter un favoris
    const addFavoris = async () => {
        if (connectedUser!=null) {
            let result = await fetch(`http://localhost:5000/api/favoris/add/${JSON.parse(connectedUser)._id}/${id}`, {
                method: "Post",
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))} `
                }
            });

            await fetch(`http://localhost:5000/api/utilisateur/addNotif`, {
                method: 'Post',
                body: JSON.stringify({ type: "fav", content: `Votre annonce ${titre} a été liké`, destinataire: pseudo }),
                headers: {

                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
            
            result = await result.json();

            if(!result.erreur) {
                sessionStorage.removeItem("user");
                sessionStorage.setItem("user", JSON.stringify(result.user));
                window.location.reload(false);
            }
        }
    }

    // Fonction pour supprimer un favoris
    const delFavoris = async () => {
        if (connectedUser!=null) {
            let result = await fetch(`http://localhost:5000/api/favoris/delete/${JSON.parse(connectedUser)._id}/${id}`, {
                method: "Delete",
                headers: {

                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))} `
                }
            });
            result = await result.json();
            if(!result.erreur) {
                sessionStorage.removeItem("user");
                sessionStorage.setItem("user", JSON.stringify(result.user));
                window.location.reload(false);
            }
        }
    }

    // Affichage HTML
    return (
        <div className='Contenu-other'>
            <button className='Contenu-bouton' id={'noFav'+id} onClick={addFavoris}>
                <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className='Contenu-bouton' id={'fav'+id} onClick={delFavoris} style={{display: 'none'}}>
                <FontAwesomeIcon icon={faHeart} style={{color: 'red'}}/>
            </button>
            <p className='Contenu-prix'>{prix} €</p>
        </div>
    )
}

function Contenu({id, titre, description, prix, pseudo}){    
    return(
        <div className='Contenu-all'>
            <div className='Contenu-text'>
                <p className='Contenu-titre'>{titre} :</p>
                <p className='Contenu-description'>{description}</p>
            </div>
            <Button id={id} prix={prix} titre={titre} pseudo={pseudo}/>
        </div>
    )
}

function UneAnnonce({id, titre, description, prix, img_annonce, pseudoVendeur, note, img_profil, categorie, vendu}) {
    let connectedUser = sessionStorage.getItem("user");

    useEffect(() => {
        displayButton();
        isVendu(id);
    }, [])

    const displayButton = () => {
        if (connectedUser!=null) {
            const buttonNoFav = document.getElementById('noFav'+id);
            const buttonFav = document.getElementById('fav'+id);
            if(JSON.parse(connectedUser).favoris.includes(id)){
                buttonNoFav.style.display = 'none';
                buttonFav.style.display = 'block';
            }
        }
    }

    const displayImage = () => {
        if(img_annonce !== undefined){
            if(img_annonce.length === 0) {return <img className='UneAnnonce-img-annonce' src={require('../../assets/default.png')}/>}
            else {
                return (img_annonce.map((item, index) => (
                    <img className='UneAnnonce-img-annonce' src={item}/>
                )));
            }
        }
    }

    const isVendu = (id) => {
        const div = document.getElementById(id);
        if(div !== undefined){
            if(vendu){
                div.style.display = 'block';
            }
        }
    }

    return (
        <div className='UneAnnonce-all'>
            <Link to={"/annonce/" + pseudoVendeur + "/" + id} params={{titre: titre}} className='UneAnnonce-div-Image'>
                {displayImage()}
            </Link>
            <div className='UneAnnonce-description'>
                <div className='UneAnnonce-description-top'>
                    <Vendeur pseudo={pseudoVendeur} photo={img_profil} note={note}/>
                    <div className='UneAnnonce-categorie'>
                        <p className='UneAnnonce-categorie-titre'>Catégorie :</p>
                        <p className='UneAnnonce-categorie-text'>{categorie}</p>
                    </div>
                </div>
                <div className='UneAnnonce-isVendu' id={id} style={{display: 'none'}}>
                    <p>L'annonce est vendue</p>
                </div>
                <Contenu id={id} titre={titre} description={description} prix={prix} pseudo={pseudoVendeur}/>
            </div>
        </div>
    )
}

export default UneAnnonce;