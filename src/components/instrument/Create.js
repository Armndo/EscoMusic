import React, { useState } from 'react';
import axios from 'axios';

function Create(props) {
	const [instrument, setInstrument] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "create",
			instrument: instrument,
			description: description,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Agregar instrumento?")) {
			axios.post(
				"http://localhost/api/Controller/InstrumentController.php",
				params
			).then(function(response) {
				props.setAction("index");
			}).catch(function(e) {
				console.log(e);
			});
		}
	}

  return (
		<div className="form">
			<div className="title">
				<p>Agregar Instrumento</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={instrument} onChange={(e) => setInstrument(e.target.value)}/>
				</div>
				<div className="col">
					<span>Descripción:</span>
					<textarea rows="8" onChange={(e) => setDescription(e.target.value)} value={description}/>
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

export default Create;