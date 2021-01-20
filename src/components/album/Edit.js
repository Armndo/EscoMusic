import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit(props) {
	const [album, setAlbum] = useState(props.album.album);
	const [released, setReleased] = useState(props.album.released);
	const [recorded, setRecorded] = useState(props.album.recorded);
	const [length, setLength] = useState(props.album.length);
	const [genre, setGenre] = useState(toIdArray(props.album.genres));
	const [genres, setGenres] = useState([]);
	const [artist, setArtist] = useState(toIdArray(props.album.artists));
	const [artists, setArtists] = useState([]);
	const [band, setBand] = useState(toIdArray(props.album.bands));
	const [bands, setBands] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=genres&params[]=artists&params[]=bands&input",
		).then(function(response) {
			setGenres(response.data.genres);
			setArtists(response.data.artists);
			setBands(response.data.bands);
		}).catch(function(e) {
			console.log(e);
		});
	}, []);

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=album&album_id=" + props.album.id,
		).then(function(response) {
			props.setAlbum(response.data.album)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
	}

	function toIdArray(objs) {
		let arr = [];
		
		for(let obj of objs) {
			arr.push(+obj.id);
		}

		return arr;
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
	
	function removeArtist(index) {
		let arr = [...artist];
		arr.splice(index, 1);
		setArtist(arr);
	}

	function handleArtist(value, index) {
		let arr = [...artist];
		arr[index] = value === "" ? "" : +value;
		setArtist(arr);
	}
	
	function removeBand(index) {
		let arr = [...band];
		arr.splice(index, 1);
		setBand(arr);
	}

	function handleBand(value, index) {
		let arr = [...band];
		arr[index] = value === "" ? "" : +value;
		setBand(arr);
	}

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "update",
			id: props.album.id,
			album: album,
			released: released,
			recorded: recorded,
			length: length,
			genre: genre,
			artist: artist,
			band: band,
		};

		params.append("data", JSON.stringify(data));
		
		if(window.confirm("¿Actualizar el álbum?")) {
			axios.post(
				"http://localhost/api/Controller/AlbumController.php",
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
				<p>Editar Álbum</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={album} onChange={(e) => setAlbum(e.target.value)}/>
				</div>
				<div className="col">
					<span>Fecha de lanzamiento:</span>
					<input type="date" value={released !== null ? released : ""} onChange={(e) => setReleased(e.target.value)}/>
				</div>
				<div className="col">
					<span>Año de grabación:</span>
					<input type="text" value={recorded !== null ? recorded : ""} onChange={(e) => setRecorded(e.target.value)}/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Duración:</span>
					<input type="text" value={length !== null ? length : ""} onChange={(e) => setLength(e.target.value)}/>
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
				<div className="col">
					<span>Autores <button className="createButton" onClick={() => setArtist(artist => [...artist, ""])}>+</button></span>
					{artist.length > 0 ? artist.map((element, index) =>
						<div key={"artists" + index}>
							<select value={element} onChange={(e) => handleArtist(e.target.value, index)}>
								<option value="">Selecionar</option>
								{artists.map((element2) => 
									<option key={element2.id} value={element2.id}>{element2.name}</option>
								)}
							</select>
							<button className="deleteButton" onClick={() => removeArtist(index)}>x</button>
						</div>
					) : "Agrega un autor."}
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Bandas: <button className="createButton" onClick={() => setBand(band => [...band, ""])}>+</button></span>
					{band.length > 0 ? band.map((element, index) =>
						<div key={"bands" + index}>
							<select value={element} onChange={(e) => handleBand(e.target.value, index)}>
								<option value="">Selecionar</option>
								{bands.map((element2) => 
									<option key={"band" + element2.id} value={element2.id}>{element2.band}</option>
								)}
							</select>
							<button className="deleteButton" onClick={() => removeBand(index)}>x</button>
						</div>
					) : "Agrega una banda."}
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