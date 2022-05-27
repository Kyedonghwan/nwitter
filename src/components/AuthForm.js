import { authService } from "fbInstance";
import React, { useState } from "react";

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value} } = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            }else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch(error){
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount(prev => !prev);

    return <>
            <form onSubmit={onSubmit} className="container">
            <input onChange={onChange} name="email" type="email" placeholder="Email" required value={email} className="authInput"/>
            <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password} className="authInput"/>
            <input type="submit" className="authInput authSubmit" value={newAccount ? "Create a new account" : "Sign In"} />
            {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
            </>
};

export default AuthForm;