import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { businessLogicAxiosInstance as axios } from "../utils/axios";

export default function Home(params) {
  const { user } = useSelector((state) => state.user);
  const [locations, setLocations] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("/location/all").then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <div>home</div>
      {locations.map((loc) => (
        <button onClick={navigate(`/location/${loc.location_id}`)}>
          {loc.location_name}
        </button>
      ))}
    </div>
  );
}
