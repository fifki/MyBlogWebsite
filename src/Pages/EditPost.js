import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";


export default function EditPost(){  

    const {id}=useParams();
    const[title , setTitle]= useState('');
    const[summary , setSummary]= useState('');
    const[content , setContent]= useState('');
    const [files , setFile]=useState('');
    // const [cover , setCover]=useState('');
    const [redirect , setRedirect]= useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id).then(response =>{
            response.json().then(postInfo =>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);

            })

        });

    }, []);


    async function updatePost(ev){

        const data = new FormData();
        data.set('title',title );
        data.set('summary', summary );
        data.set('content', content);
        sata.set('id', id);
        
        if( files?.[0]){
            data.set('file', files?.[0] );
        }

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method: 'PUT',
            body: data, 
            credentials: 'include',

        });
        if(response.ok){
            setRedirect(true);
        }
        
    }
    if(redirect){
        //go back to the home page 
        return <Navigate to ={'/post/'+id}/>
    }
    return(
        <form onSubmit={updatePost}>
            <input type ='title' placeholder={'Title'} value = {title} onChange={ ev => setTitle(ev.target.value)}/>
            <input type ='summary' placeholder={'Summary'} value ={summary} onChange={ev=> setSummary(ev.target.value)}/>
            <input type='file' onChange={ev=> setFile(ev.target.files)} />
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop: '10px'}}> update post </button>
        </form>

    );



}