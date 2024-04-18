import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post( { _id, title , summary , cover , content , createdAt, author}){
    return (
      <div className = "post">
        <div classeName="image">
          <Link to ={'/post/${id}'}>
            <img src= {'http://localhost:4000'+cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to ={'/post/${id}'}>
           <h2> {title}</h2>
          </Link>
          <p className="info">
            <a className="author"> {author.username} </a>
            {/* //to display a better date we install npm date-fns 
            this function need a new date */}
            <time>{formatISO9075(new Date(createdAt))} </time>
          </p>
          <p className="summary "> {summary}  </p>
        </div>
      </div>
          );
}