import React, { useState } from 'react';
import axios from 'axios';

function Edit(props) {
	const [instrument, setInstrument] = useState(props.instrument.instrument);
	const [description, setDescription] = useState(props.instrument.description);

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=instrument&instrument_id=" + props.instrument.id,
		).then(function(response) {
			props.setInstrument(response.data.instrument)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
	}

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "update",
			id: props.instrument.id,
			instrument: instrument,
			description: description,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Actualizar el instrumento?")) {
			axios.post(
				"http://localhost/api/Controller/InstrumentController.php",
				params
			).then(function(response) {
				reload();
			}).catch(function(e) {
				console.log(e);
			});
		}
	}

  return (
		<div className="form">
			<div className="title">
				<p>Editar Instrumento</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={instrument} onChange={(e) => setInstrument(e.target.value)}/>
				</div>
				<div className="col">
					<span>Descripción:</span>
					<textarea value={description !== null ? description : ""} onChange={(e) => setDescription(e.target.value)} rows="8"/>
				</div>
			</div>
			<div className="row">
				<div className="col full">
					<button className="viewButton" onClick={handleSubmit}>Enviar</button>
				</div>
			</div>
		</div>
  );
}

export default Edit;