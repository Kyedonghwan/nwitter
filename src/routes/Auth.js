import React, { useState } from "react";
import { firebaseInstance, authService } from "fbInstance";

const Auth = () => {
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
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    }

    return <div>
    <form onSubmit={onSubmit}>
        <input onChange={onChange} name="email" type="email" placeholder="Email" required value={email}/>
        <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password}/>
        <input type="submit" value={newAccount ? "Create a new account" : "Sign In"} />
        <h1>{error}</h1>
    </form>
    <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="gh">Continue with Github</button>
    </div>
</div>
}

export default Auth;