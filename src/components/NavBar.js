import React from 'react';
import Buscador from './Buscador.js';
import '../css/navBar.css';

function NavBar(props) {

  function changeView(tab) {
    props.setAction("index");
    props.setTab(tab);
  }

  return (
    <div className="navBar">
      <img src="/logo2.png" alt="Logo ESCOMusic" onClick={() => changeView("")}/>
      <Buscador/>
      <div className="selectors">
        <button className={props.tab === "artist" ? "active" : ""} onClick={() => changeView("artist")}>Artistas</button>
        <button className={props.tab === "band" ? "active" : ""} onClick={() => changeView("band")}>Bandas</button>
        <button className={props.tab === "album" ? "active" : ""} onClick={() => changeView("album")}>Álbumes</button>
        <button className={props.tab === "song" ? "active" : ""} onClick={() => changeView("song")}>Canciones</button>
        <button className={props.tab === "genre" ? "active" : ""} onClick={() => changeView("genre")}>Géneros</button>
        <button className={props.tab === "instrument" ? "active" : ""} onClick={() => changeView("instrument")}>Instrumentos</button>
      </div>
      <button className="logout" onClick={props.logout}>Logout</button>
    </div>
  );
}

export default NavBar;