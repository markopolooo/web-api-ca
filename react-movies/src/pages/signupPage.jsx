// Sign up page - creates new user account with username and password
import { useContext, useState } from "react";
import { Navigate, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';

const SignupPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    // Register new user with password confirmation
    const register = async () => {
        if (password !== passwordAgain) {
            alert("Passwords don't match!");
            return;
        }
        const result = await context.register(userName, password);
        if (result) {
            alert("Registration successful! Please log in.");
        } else {
            alert("Registration failed. Try a different username.");
        }
    };

    // Redirect to home if already logged in
    if (context.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <h2>Sign Up</h2>
            <input placeholder="username" onChange={e => setUserName(e.target.value)} /><br />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} /><br />
            <input type="password" placeholder="confirm password" onChange={e => setPasswordAgain(e.target.value)} /><br />
            <button onClick={register}>Register</button>
            <p>Already have an account? <Link to="/login">Log in!</Link></p>
        </>
    );
};

export default SignupPage;