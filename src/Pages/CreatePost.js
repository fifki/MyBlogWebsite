import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost(){
    const[title , setTitle]= useState('');
    const[summary , setSummary]= useState('');
    const[content , setContent]= useState('');
    const [files , setFile]=useState('');
    //redirection to the home page after creating a post 
    const [redirect , setRedirect]= useState(false);

    // i need a code for both these .
    const modules = {};
    const formats={}

   async function creatNewPost(ev){

        const data = new FormData();
        data.set('title',title );
        data.set('summary', summary );
        data.set('content', content);
        data.set('file', files[0] );

        ev.preventDefault();
        const response = await fetch('http://localhost:3000/post', {
        method:'POST',
        body: data ,
        credentials:'include',
        })
        if( response.ok){
            setRedirect(true);

        }
    }

    if(redirect){
        //go back to the home page 
        return <Navigate to ={'/'}/>
    }
    return(
        <form onSubmit={creatNewPost}>
            <input type ='title' placeholder={'Title'} value = {title} onChange={ ev => setTitle(ev.target.value)}/>
            <input type ='summary' placeholder={'Summary'} value ={summary} onChange={ev=> setSummary(ev.target.value)}/>
            <input type='file' onChange={ev=> setFile(ev.target.files)} />
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop: '10px'}}> Create post </button>
        </form>

    );
}