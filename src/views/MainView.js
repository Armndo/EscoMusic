import React, { useState } from 'react';
import NavBar from '../components/NavBar.js';
import '../css/mainView.css';

function MainView(props) {
  const [texto, setTexto] = useState(props.texto);

  return (
    <div className="mainView">
      <NavBar/>
      <div className="total">
        <span>{texto}</span>
        <button onClick={props.logout}>logout</button>
      </div>
    </div>
  );
}

export default MainView;