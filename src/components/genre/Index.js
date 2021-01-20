import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [genres, setGenres] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=genres",
		).then(function(response) {
			setGenres(response.data.genres);
		}).catch(function(e) {
			console.log(e);
		});
  }, []);

  function viewGenre(genre) {
    props.setAction("view")
    props.setGenre(genre);
  }

  function editGenre(genre) {
    props.setAction("edit")
    props.setGenre(genre);
  }

	function handleDestroy(genre, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: genre.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar el género musical '" + genre.name + "'?")) {
      axios.post(
        "http://localhost/api/Controller/GenreController.php",
        params
      ).then(function(response) {
        let aux = [...genres];
        aux.splice(index, 1);
        setGenres(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Géneros musicales</p>
        <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button>
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre, index) => 
              <tr key={genre.id}>
                <td>{genre.genre === "" ? "N/A" : genre.genre}</td>
                <td>
                  {genre.description !== null ? genre.description.split(" ").map((str, index) => {
                    if(index < 25) {
                      return str + " ";
                    } if (index === 25) {
                      return str + "...";
                    }
                    return "";
                  }) : "N/A"}
                </td>
                <td>
                  <button className="viewButton" onClick={() => viewGenre(genre)}>Ver</button>
                  <button className="editButton" onClick={() => editGenre(genre)}>Editar</button>
                  <button className="deleteButton" onClick={() => handleDestroy(genre, index)}>Eliminar</button>
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