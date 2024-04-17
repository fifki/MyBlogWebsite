import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] =  useState('');
    const [password, setPasseword] =  useState('');
    async  function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
                                     
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.status === 200){alert ('registration successful')}
        else{ alert ('Register failed ')}
    }

    return(
        <form className="register" onSubmit={register}>
            <h1 className="pagetitle"> Register </h1>


            <input type ='text' 
                placeholder ='username' 
                value ={username}
                onChange={ev=> setUsername(ev.target.value)}>
            </input>

            <input type ='text' 
                placeholder ='password' 
                value={password}
                onChange={ev=> setPasseword(ev.target.value)}>
            </input>
            
            <button> Register </button>
        </form>

    );
    
}