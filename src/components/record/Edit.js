import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit(props) {
	const [record, setRecord] = useState(props.record.record);
	const [funded, setFunded] = useState(props.record.funded);
	const [country, setCountry] = useState(props.record.country);
	const [founder, setFounder] = useState(props.record.founder);

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=record&record_id=" + props.record.id,
		).then(function(response) {
			props.setRecord(response.data.record)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
	}

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "update",
			id: props.record.id,
			record: record,
			funded: funded,
			country: country,
			founder: founder,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Actualizar la disquera?")) {
			axios.post(
				"http://localhost/api/Controller/RecordController.php",
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
				<p>Editar Disquera</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={record} onChange={(e) => setRecord(e.target.value)}/>
				</div>
				<div className="col">
					<span>Año de fundación:</span>
					<input type="text" value={funded !== null ? funded : ""} onChange={(e) => setFunded(e.target.value)}/>
				</div>
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
			</div>
			<div className="row">
				<div className="col">
					<span>Fundador:</span>
					<input type="text" value={founder !== null ? founder : ""} onChange={(e) => setFounder(e.target.value)}/>
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