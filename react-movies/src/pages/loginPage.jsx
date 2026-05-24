// Login page - authenticates user with username and password
import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // Attempt login with provided credentials
    const login = () => {
        context.authenticate(userName, password);
    };

    // Redirect to original page if already logged in
    let location = useLocation();
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <h2>Login</h2>
            <input placeholder="username" onChange={e => setUserName(e.target.value)} /><br />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={login}>Log in</button>
            <p>Not registered? <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;