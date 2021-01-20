import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit(props) {
	const [song, setSong] = useState(props.song.song);
	const [lyrics, setLyrics] = useState(props.song.lyrics);
	const [released, setReleased] = useState(props.song.released);
	const [recorded, setRecorded] = useState(props.song.recorded);
	const [length, setLength] = useState(props.song.length);
	const [album_id, setAlbum_id] = useState(props.song.album_id);
	const [albums, setAlbums] = useState([]);
	const [genre, setGenre] = useState(toIdArray(props.song.genres));
	const [genres, setGenres] = useState([]);
	const [artist, setArtist] = useState(toIdArray(props.song.artists));
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost/api/fetch.php?params[]=albums&params[]=genres&params[]=artists&input",
		).then(function(response) {
			setAlbums(response.data.albums);
			setGenres(response.data.genres);
			setArtists(response.data.artists);
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

	function reload() {
		axios.get(
			"http://localhost/api/fetch.php?params[]=song&song_id=" + props.song.id,
		).then(function(response) {
			props.setSong(response.data.song)
			props.setAction("view");
		}).catch(function(e) {
			console.log(e);
		});
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

	function handleSubmit() {
		let params = new URLSearchParams();

		let data = {
			action: "update",
			id: props.song.id,
			song: song,
			lyrics: lyrics,
			released: released,
			recorded: recorded,
			length: length,
			album_id: album_id,
			genre: genre,
			artist: artist,
		};

		params.append("data", JSON.stringify(data));

		console.log(data);
		
		if(window.confirm("¿Actualizar la canción?")) {
			axios.post(
				"http://localhost/api/Controller/SongController.php",
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
				<p>Editar Canción</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={song} onChange={(e) => setSong(e.target.value)}/>
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
					<span>Álbum:</span>
					<select value={album_id} onChange={(e) => setAlbum_id(e.target.value !== "" ? +e.target.value : "")}>
						<option value="">Selecionar</option>
						{albums.map((element) => 
							<option key={element.id} value={element.id}>{element.album}</option>
						)}
					</select>
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
					<span>Escrita por <button className="createButton" onClick={() => setArtist(artist => [...artist, ""])}>+</button></span>
					{artist.length > 0 ? artist.map((element, index) =>
						<div key={"artists" + index}>
							<select value={element} onChange={(e) => handleArtist(e.target.value, index)}>
								<option value="">Selecionar</option>
								{artists.map((element2) => 
									<option key={"artist" + element2.id} value={element2.id}>{element2.name}</option>
								)}
							</select>
							<button className="deleteButton" onClick={() => removeArtist(index)}>x</button>
						</div>
					) : "Agrega un autor."}
				</div>
				<div className="col">
					<span>Letra:</span>
					<textarea rows="8" value={lyrics === null ? "" : lyrics} onChange={(e) => setLyrics(e.target.value)}/>
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