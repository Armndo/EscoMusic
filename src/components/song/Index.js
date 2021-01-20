import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [songs, setSongs] = useState([]);

  let setLoader = props.setLoader;

	useEffect(() => {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php?params[]=songs",
		).then(function(response) {
			setSongs(response.data.songs);
      setLoader(false);
		}).catch(function(e) {
			console.log(e);
		});
  }, [setLoader]);

  function formatDate(date) {
    if(date === null) {
      return "N/A";
    }

    let arr = date.split("-");
    return arr[2] + "/" + arr[1] + "/" + arr[0];
  }

  function viewSong(song) {
    props.setAction("view")
    props.setSong(song);
  }

  function editSong(song) {
    props.setAction("edit")
    props.setSong(song);
  }

	function handleDestroy(song, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: song.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar al songa '" + song.name + "'?")) {
      axios.post(
        "http://localhost/api/Controller/SongController.php",
        params
      ).then(function(response) {
        let aux = [...songs];
        aux.splice(index, 1);
        setSongs(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Canciones</p>
        {props.session.type === "locutor" ? <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button> : null}
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de lanzamiento</th>
              <th>Año de grabación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => 
              <tr key={song.id}>
                <td>{song.song === "" ? "N/A" : song.song}</td>
                <td>{formatDate(song.released)}</td>
                <td>{song.recorded === null ? "N/A" : song.recorded}</td>
                <td>
                  <button className="viewButton" onClick={() => viewSong(song)}>Ver</button>
                  {props.session.type === "locutor" ?
                  <>
                    <button className="editButton" onClick={() => editSong(song)}>Editar</button>
                    <button className="deleteButton" onClick={() => handleDestroy(song, index)}>Eliminar</button>
                  </> : null}
                </td>
              </tr>
            )}
          </tbody>
        </table>
			</div>
		</div>
  );
}

export default Index;