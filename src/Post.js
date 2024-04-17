export default function Post(){
    return (
      <div className = "post">
        <div classeName="image">
          <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" />
        </div>
        <div className="texts">
          <h2> Just a perfect moment</h2>
          <p className="info">
            <a className="autor"> Fatime Ifkirne </a>
            <time>2020-01-01 12:30 </time>
          </p>
          <p className="summary "> it was really great weather after rain  </p>
        </div>
      </div>
          );
}