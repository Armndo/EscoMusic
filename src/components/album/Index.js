import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [albums, setAlbums] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=albums",
		).then(function(response) {
			setAlbums(response.data.albums);
		}).catch(function(e) {
			console.log(e);
		});
  }, []);

  function formatDate(date) {
    if(date === null) {
      return "N/A";
    }

    let arr = date.split("-");
    return arr[2] + "/" + arr[1] + "/" + arr[0];
  }

  function viewAlbum(album) {
    props.setAction("view")
    props.setAlbum(album);
  }

  function editAlbum(album) {
    props.setAction("edit")
    props.setAlbum(album);
  }

	function handleDestroy(album, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: album.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar al albuma '" + album.name + "'?")) {
      axios.post(
        "http://localhost/api/Controller/AlbumController.php",
        params
      ).then(function(response) {
        let aux = [...albums];
        aux.splice(index, 1);
        setAlbums(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Álbumes</p>
        <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button>
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
            {albums.map((album, index) => 
              <tr key={album.id}>
                <td>{album.album === "" ? "N/A" : album.album}</td>
                <td>{formatDate(album.released)}</td>
                <td>{album.recorded === null ? "N/A" : album.recorded}</td>
                <td>
                  <button className="viewButton" onClick={() => viewAlbum(album)}>Ver</button>
                  <button className="editButton" onClick={() => editAlbum(album)}>Editar</button>
                  <button className="deleteButton" onClick={() => handleDestroy(album, index)}>Eliminar</button>
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