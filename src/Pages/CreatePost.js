import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function CreatePost(){
    const[title , setTitle]= useState('');
    const[summary , setSummary]= useState('');
    const[Content , setContent]= useState('');

    // i need a code for both these .
    const modules = {};
    const formats={}

    function creatNewPost(ev){
        ev.preventDefault();
        fetch('http://localhost:4000/post', {
        method:'POST',
        body: ,
        })
    }

    return(
        <form onSubmit={creatNewPost}>
            <input type ='title' placeholder={'Title'} value = {title} onChange={ ev => setTitle(ev.target.value)}/>
            <input type ='summary' placeholder={'Summary'} value ={summary} onChange={ev=> setSummary(ev.target.value)}/>
            <input type='file'/>
            <textarea name=""/>
            <ReactQuill value={Content}  onChange={ newValue => setContent(newValue)}  modules={modules} formats={formats} />
            <button style={{marginTop: '10px'}}> Create post </button>
        </form>

    );
}