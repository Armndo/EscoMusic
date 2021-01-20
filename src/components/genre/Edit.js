import React, { useState } from 'react';
import axios from 'axios';

function Edit(props) {
	const [genre, setGenre] = useState(props.genre.genre);
	const [description, setDescription] = useState(props.genre.description);

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=genre&genre_id=" + props.genre.id,
		).then(function(response) {
			props.setGenre(response.data.genre)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
	}

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "update",
			id: props.genre.id,
			genre: genre,
			description: description,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Actualizar el género?")) {
			axios.post(
				"http://localhost/api/Controller/GenreController.php",
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
				<p>Editar Género musical</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/>
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