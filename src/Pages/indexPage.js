import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts , setPosts]=useState([]);

    //to be able to add post from the database (post the that user created )
     useEffect(()=> {
        fetch('http://localhost:3000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);

            });
        });
     } , []);
    return( 
        <>
        {posts.length > 0 && posts.map(post => (
            <Post/>
        ))}
        </>
    );
    
}