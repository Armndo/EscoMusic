import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [instruments, setInstruments] = useState([]);

  let setLoader = props.setLoader;

	useEffect(() => {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php?params[]=instruments",
		).then(function(response) {
			setInstruments(response.data.instruments);
      setLoader(false);
		}).catch(function(e) {
			console.log(e);
		});
  }, [setLoader]);

  function viewGenre(instrument) {
    props.setAction("view")
    props.setInstrument(instrument);
  }

  function editGenre(instrument) {
    props.setAction("edit")
    props.setInstrument(instrument);
  }

	function handleDestroy(instrument, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: instrument.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar el instrumento '" + instrument.name + "'?")) {
      axios.post(
        "http://localhost/api/Controller/InstrumentController.php",
        params
      ).then(function(response) {
        let aux = [...instruments];
        aux.splice(index, 1);
        setInstruments(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Instrumentos</p>
        {props.session.type === "locutor" ? <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button> : null}
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
            {instruments.map((instrument, index) => 
              <tr key={instrument.id}>
                <td>{instrument.instrument === "" ? "N/A" : instrument.instrument}</td>
                <td>
                  {instrument.description !== null ? instrument.description.split(" ").map((str, index) => {
                    if(index < 25) {
                      return str + " ";
                    } if (index === 25) {
                      return str + "...";
                    }
                    return "";
                  }) : "N/A"}
                </td>
                <td>
                  <button className="viewButton" onClick={() => viewGenre(instrument)}>Ver</button>
                  {props.session.type === "locutor" ?
                  <>
                    <button className="editButton" onClick={() => editGenre(instrument)}>Editar</button>
                    <button className="deleteButton" onClick={() => handleDestroy(instrument, index)}>Eliminar</button>
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