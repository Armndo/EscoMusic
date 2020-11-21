import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../css/login.css';

function Login() {
	const [isAuth, setIsAuth] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmail(e) {
		setEmail(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
	}

	function handleLogin(e) {
		e.preventDefault();

		axios.post(
			"http://localhost/api/",
			params: {
				email: email,
				password: password,
			},
		).then(function(response) {
			console.log(response.data)
			sessionStorage.setItem("session", JSON.stringify({auth: true, email: email}));
			setIsAuth(true);
		}).catch(function(e) {
			console.log(e);
		});

	}

	if(isAuth || (JSON.parse(sessionStorage.getItem("session")) && JSON.parse(sessionStorage.getItem("session")).auth)) {
	  return (
	  	<Redirect to="/"/>
	  );
	} else {
	  return (
	    <div className="login">
	      <div className="tarjeta">
	      	<form onSubmit={handleLogin}>
	      		<img src="/logo.png" alt="logo ESCOMusic"/>
		      	<span>Correo electrónico:</span>
		      	<input type="email" placeholder="example@email.com" value={email} onChange={handleEmail}/>
		      	<span>Contraseña:</span>
		      	<input type="password" placeholder="contraseña" value={password} onChange={handlePassword}/>
		      	<input type="submit" value="Iniciar sesión"/>
      		</form>
	      </div>
	    </div>
	  );
	}
}

export default Login;