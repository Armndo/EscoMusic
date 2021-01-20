import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [bands, setBands] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=bands",
		).then(function(response) {
			setBands(response.data.bands);
		}).catch(function(e) {
			console.log(e);
		});
  }, []);

  function viewBand(band) {
    props.setAction("view")
    props.setBand(band);
  }

  function editBand(band) {
    props.setAction("edit")
    props.setBand(band);
  }

	function handleDestroy(band, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: band.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar la banda '" + band.band + "'?")) {
      axios.post(
        "http://localhost/api/Controller/BandController.php",
        params
      ).then(function(response) {
        let aux = [...bands];
        aux.splice(index, 1);
        setBands(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Bandas</p>
        <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button>
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Creada en</th>
              <th>País de origen</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band, index) => 
              <tr key={band.id}>
                <td>{band.band === "" ? "N/A" : band.band}</td>
                <td>{band.created === null ? "N/A" : band.created}</td>
                <td>{band.country === null ? "N/A" : band.country}</td>
                <td>
                  <button className="viewButton" onClick={() => viewBand(band)}>Ver</button>
                  <button className="editButton" onClick={() => editBand(band)}>Editar</button>
                  <button className="deleteButton" onClick={() => handleDestroy(band, index)}>Eliminar</button>
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