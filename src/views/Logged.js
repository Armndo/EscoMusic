import React, { useState } from 'react';
import { Redirect } from 'react-router';
import MainView from './MainView.js';

function Logged() {
	const [session, setSession] = useState(JSON.parse(sessionStorage.getItem("session")));

	function logout() {
		sessionStorage.removeItem("session");
		setSession(null);
	}

	if(session && session.auth) {
	  return (
	  	<MainView
	  		texto={session.user.email}
	  		logout={logout}
	  	/>
	  );
	} else {
	  return (
	  	<Redirect to="/login"/>
	  );
	}

}

export default Logged;