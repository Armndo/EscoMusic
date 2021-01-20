import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [artists, setArtists] = useState([]);

  let setLoader = props.setLoader;

	useEffect(() => {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php?params[]=artists",
		).then(function(response) {
			setArtists(response.data.artists);
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

  function viewArtist(artist) {
    props.setAction("view")
    props.setArtist(artist);
  }

  function editArtist(artist) {
    props.setAction("edit")
    props.setArtist(artist);
  }

	function handleDestroy(artist, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: artist.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar al artista '" + artist.name + "'?")) {
      axios.post(
        "http://localhost/api/Controller/ArtistController.php",
        params
      ).then(function(response) {
        let aux = [...artists];
        aux.splice(index, 1);
        setArtists(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Artistas</p>
        {props.session.type === "locutor" ? <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button> : null}
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Género</th>
              <th>País de origen</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, index) => 
              <tr key={artist.id}>
                <td>{artist.name === "" ? "N/A" : artist.name}</td>
                <td>{formatDate(artist.birthday)}</td>
                <td>{artist.gender === null ? "N/A" : artist.gender}</td>
                <td>{artist.country === null ? "N/A" : artist.country}</td>
                <td>
                  <button className="viewButton" onClick={() => viewArtist(artist)}>Ver</button>
                  {props.session.type === "locutor" ?
                  <>
                    <button className="editButton" onClick={() => editArtist(artist)}>Editar</button>
                    <button className="deleteButton" onClick={() => handleDestroy(artist, index)}>Eliminar</button>
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