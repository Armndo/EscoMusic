import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [artists, setArtists] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=artist",
		).then(function(response) {
			setArtists(response.data.artist);
		}).catch(function(e) {
			console.log(e);
		});
  }, []);
  
  console.log(artists)

  return (
		<div className="table">
			<div className="title">
				Artistas
        <button onClick={() => props.setTabView("")}>Agregar</button>
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Género</th>
              <th>País de origen</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => 
              <tr>
                <td>{artist.name}</td>
                <td>{artist.birthday}</td>
                <td>{artist.gender}</td>
                <td>{artist.country}</td>
              </tr>
            )}
          </tbody>
        </table>
			</div>
		</div>
  );
}

export default Index;