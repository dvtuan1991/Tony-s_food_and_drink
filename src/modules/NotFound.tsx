import notfound from "assets/404s.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="w-2/4 h-[500px] mx-auto bg-center bg-contain flex justify-center"
      style={{ backgroundImage: `url(${notfound})` }}
    >
      <Link className=" mt-11" to="/">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
