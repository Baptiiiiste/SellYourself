import './Header_Inscription_Connexion.css'

function Header_Inscription_Connexion() {
    return (
        <header>
            <div className='title'>
                <img src={require('../../assets/Logo.png')} alt=""/>
                <h1 className='domaine'>SellYourself</h1>
                <h1>.</h1>
                <h1 className='extension'>fr</h1>
            </div>
        </header>
    );
}

export default Header_Inscription_Connexion;