import { useEffect, useState } from "react";
import Post from "../Post";
import Axios from "axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  //to be able to add post from the database (post the that user created )
  useEffect(() => {
    Axios.get("http://localhost:3000/post")
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post />)}</>;
}
