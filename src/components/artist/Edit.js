import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit(props) {
	const [name, setName] = useState(props.artist.name);
	const [birthday, setBirthday] = useState(props.artist.birthday);
	const [gender, setGender] = useState(props.artist.gender);
	const [country, setCountry] = useState(props.artist.country);
	const [min, setMin] = useState(getYearsActive()[0]);
	const [max, setMax] = useState(getYearsActive()[1]);
	const [genre, setGenre] = useState(toIdArray(props.artist.genres));
	const [genres, setGenres] = useState([]);
	const [instrument, setInstrument] = useState(toIdArray(props.artist.instruments));
	const [instruments, setInstruments] = useState([]);
	const [media, setMedia] = useState(props.artist.medias);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=genres&params[]=instruments&input",
		).then(function(response) {
			setGenres(response.data.genres);
			setInstruments(response.data.instruments);
		}).catch(function(e) {
			console.log(e);
		});
	}, []);

	function toIdArray(objs) {
		let arr = [];
		
		for(let obj of objs) {
			arr.push(+obj.id);
		}

		return arr;
	}

	function getYearsActive() {
		let aux = props.artist.years_active !== null ? props.artist.years_active.split(" ") : [];
		let inferior = "";
		let superior = "";
		if(aux.length > 0) {
			inferior = +aux[0];
			superior = isNaN(+aux[2]) ? "" : +aux[2];
		}
		return [inferior, superior]
	}

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

	function handleMedia(value, type, index) {
		let arr = [...media];
		arr[index][type] = value;
		setMedia(arr);
	}

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=artist&artist_id=" + props.artist.id,
		).then(function(response) {
			props.setArtist(response.data.artist)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
	}

	function handleSubmit() {
		let params = new URLSearchParams();
		let years_active = "";
		
    if(min === "" && max !== "") {
      alert("Falta llenar el año de inicio de actividad.");
      return ;
    } else if(min !== "" && max === "") {
      years_active = min + " - Actualidad";
    } else if(min !== "" && max !== "") {
      years_active = min + " - " + max;
		}

		let data = {
			action: "update",
			id: props.artist.id,
			name: name,
			birthday: birthday,
			gender: gender,
			country: country,
			years_active: years_active,
			genre: genre,
			instrument: instrument,
			media: media,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Actualizar el artista?")) {
			axios.post(
				"http://localhost/api/Controller/ArtistController.php",
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
				<p>Editar Artista</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
				</div>
				<div className="col">
					<span>Fecha de nacimiento:</span>
					<input type="date" value={birthday !== null ? birthday : ""} onChange={(e) => setBirthday(e.target.value)}/>
				</div>
				<div className="col">
					<span>Género:</span>
					<select value={gender !== null ? gender : ""} onChange={(e) => setGender(e.target.value)}>
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
					<select value={country !== null ? country : ""} onChange={(e) => setCountry(e.target.value)}>
						<option value="">Selecionar</option>
						{[
							"Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
						].map((country, index) =>
							<option key={index} value={country}>{country}</option>
						)}
					</select>
				</div>
				<div className="col">
					<span>Periodo de actividad:</span>
					De <input type="text" className="number" value={min} onChange={(e) => setMin(e.target.value === "" ? "" : +e.target.value)}/>
					{" a "}
					<input type="text" className="number" value={max} onChange={(e) => setMax(e.target.value === "" ? "" : +e.target.value)}/>
				</div>
				<div className="col">
					<span>Géneros musicales <button className="createButton" onClick={() => setGenre(genre => [...genre, ""])}>+</button></span>
					{genre.length > 0 ? genre.map((element, index) =>
						<div key={"genres" + index}>
							<select value={element} onChange={(e) => handleGenre(e.target.value, index)}>
								<option value="">Selecionar</option>
								{genres.map((element2) => 
									<option key={element2.id} value={element2.id}>{element2.genre}</option>
								)}
							</select>
							<button className="deleteButton" onClick={() => removeGenre(index)}>x</button>
						</div>
					) : "Agrega un género músical."}
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Instrumentos musicales <button className="createButton" onClick={() => setInstrument(instrument => [...instrument, ""])}>+</button></span>
					{instrument.length > 0 ? instrument.map((element, index) =>
						<div key={"instruments" + index}>
							<select value={element} onChange={(e) => handleInstrument(e.target.value, index)}>
								<option value="">Selecionar</option>
								{instruments.map((element2) => 
									<option key={element2.id} value={element2.id}>{element2.instrument}</option>
								)}
							</select>
							<button className="deleteButton" onClick={() => removeInstrument(index)}>x</button>
						</div>
					) : "Agrega un instrumento músical."}
				</div>
				<div className="col">
					<span>Links <button className="createButton" onClick={() => setMedia(media => [...media, {media: "", link: ""}])}>+</button></span>
					{media.length > 0 ? media.map((element, index) =>
						<div key={"media" + index}>
							<div className="media">
								<select value={element.media} onChange={(e) => handleMedia(e.target.value, "media", index)}>
									<option value="">Seleciona un tipo</option>
									<option value="Facebook">Facebook</option>
									<option value="Instagram">Instagram</option>
									<option value="Twitter">Twitter</option>
									<option value="Youtube">Youtube</option>
									<option value="Página Oficial">Página Oficial</option>
									<option value="Tienda Oficial">Tienda Oficial</option>
								</select>
								<input type="text" placeholder="Link" value={element.link} onChange={(e) => handleMedia(e.target.value, "link", index)}/>
							</div>
							<button className="media deleteButton" onClick={() => removeMedia(index)}>x</button>
						</div>
					) : "Agrega un link."}
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