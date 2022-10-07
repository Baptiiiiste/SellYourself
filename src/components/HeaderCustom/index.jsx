import './headerCustom.css'
function HeaderCustom({title}) {
  return (
    <header>
      <div className="headercustom-logo">
        <img src={require('../../assets/Logo.png')} alt=""/>
        <h1>SellYourself.fr</h1>
      </div>
      <div className='headercustom-title'>
        {/* <h1>{title}</h1> */}
        <h1>title</h1>
      </div>
    </header>
  );
}

export default HeaderCustom;
