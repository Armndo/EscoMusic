import React, { useState } from 'react';
import Buscador from './Buscador.js';
import '../css/navBar.css';

function NavBar(props) {
  const [texto, setTexto] = useState(props.texto);

  return (
    <div className="navBar">
      <img src="/logo2.png" alt="Logo ESCOMusic"/>
      <Buscador/>
      <button className="logout" onClick={props.logout}>Logout</button>
    </div>
  );
}

export default NavBar;