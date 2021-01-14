import React, { useState, useEffect } from 'react';
import axios from 'axios';

function View(props) {
	const [name, setName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [min, setMin] = useState("");
	const [max, setMax] = useState("");
	const [genre, setGenre] = useState([]);
	const [genres, setGenres] = useState([]);
	const [instrument, setInstrument] = useState([]);
	const [instruments, setInstruments] = useState([]);
	const [media, setMedia] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=genre&params[]=instrument",
		).then(function(response) {
			setGenres(response.data.genre);
			setInstruments(response.data.instrument);
		}).catch(function(e) {
			console.log(e);
		});
	}, []);

	function removeGenre(index) {
		let arr = [...genre];
		arr.splice(index, 1);
		setGenre(arr);
	}

	function handleGenre(value, index) {
		let arr = [...genre];
		arr[index] = value === "" ? "" : +value;
		setGenre(arr);
	}
	
	function removeInstrument(index) {
		let arr = [...instrument];
		arr.splice(index, 1);
		setInstrument(arr);
	}

	function handleInstrument(value, index) {
		let arr = [...instrument];
		arr[index] = value;
		setInstrument(arr);
	}

	function removeMedia(index) {
		let arr = [...media];
		arr.splice(index, 1);
		setMedia(arr);
	}

	function handleMedia(value, index) {
		let arr = [...media];
		arr[index] = value;
		setMedia(arr);
	}

	function handleSubmit() {
		let params = new URLSearchParams();
		params.append('name', name);
		params.append('birthday', birthday);
		params.append('gender', gender);
		params.append('country', country);
		params.append('years_active', min + " - " + max);
		params.append('genres', genre);
		params.append('instruments', instrument);
		params.append('media', media);

		axios.post(
			"http://localhost/api/Controller/ArtistController.php",
			params
		).then(function(response) {
			console.log(response.data);
		}).catch(function(e) {
			console.log(e);
		});
	}

  return (
		<div className="form">
			<div className="title">
				Agregar Artista
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
				</div>
				<div className="col">
					<span>Fecha de nacimiento:</span>
					<input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
				</div>
				<div className="col">
					<span>Género:</span>
					<select value={gender} onChange={(e) => setGender(e.target.value)}>
						<option value="">Selecionar</option>
						<option value="Hombre">Hombre</option>
						<option value="Mujer">Mujer</option>
						<option value="Otro">Otro</option>
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>País de origen:</span>
					<select value={country} onChange={(e) => setCountry(e.target.value)}>
						<option value="">Selecionar</option>
						<option value="México">México</option>
					</select>
				</div>
				<div className="col">
					<span>Años activo:</span>
					De <input type="text" className="number" value={min} onChange={(e) => setMin(e.target.value === "" ? "" : +e.target.value)}/>
					{" a "}
					<input type="text" className="number" value={max} onChange={(e) => setMax(e.target.value === "" ? "" : +e.target.value)}/>
				</div>
				<div className="col">
					<span>Géneros musicales <button onClick={() => setGenre(genre => [...genre, ""])}>+</button></span>
					{genre.length > 0 ? genre.map((element, index) =>
						<>
							<select key={index} value={element} onChange={(e) => handleGenre(e.target.value, index)}>
								<option value="">Selecionar</option>
								{genres.map((element2) => 
									<option value={element2.id}>{element2.genre}</option>
								)}
							</select>
							<button onClick={() => removeGenre(index)}>x</button>
						</>
					) : "Agrega un género músical."}
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Instrumentos musicales <button onClick={() => setInstrument(instrument => [...instrument, ""])}>+</button></span>
					{instrument.length > 0 ? instrument.map((element, index) =>
						<>
							<select key={index} value={element} onChange={(e) => handleInstrument(e.target.value, index)}>
								<option value="">Selecionar</option>
								{instruments.map((element2) => 
									<option value={element2.id}>{element2.instrument}</option>
								)}
							</select>
							<button onClick={() => removeInstrument(index)}>x</button>
						</>
					) : "Agrega un instrumento músical."}
				</div>
				<div className="col">
					<span>Links <button onClick={() => setMedia(media => [...media, ""])}>+</button></span>
					{media.length > 0 ? media.map((element, index) =>
						<>
							<input type="text" key={index} value={element} onChange={(e) => handleMedia(e.target.value, index)}/>
							<button onClick={() => removeMedia(index)}>x</button>
						</>
					) : "Agrega un link."}
				</div>
			</div>
			<div className="row">
				<div className="col full">
					<button onClick={handleSubmit}>Enviar</button>
				</div>
			</div>
		</div>
  );
}

export default View;