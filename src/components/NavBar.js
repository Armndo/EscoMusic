import React, { useState } from 'react';
import '../css/navBar.css';

function NavBar(props) {
  const [texto, setTexto] = useState(props.texto);

  return (
    <div className="navBar">
      <img src="/logo.png" alt="Logo ESCOMusic"/>
    </div>
  );
}

export default NavBar;