import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setInfo({ ...json.data.movie });
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={info.medium_cover_image} />
          <h1>{info.title}</h1>
          <h2>Movie Info.</h2>
          <ul>
            <li key={info.year}>Year: {info.year}</li>
            <li key={info.runtime}>Runtime: {info.runtime}</li>
            <li key={info.rating}>Rating: {info.rating}</li>
          </ul>
          <h2>Genres</h2>
          <ul>{info.genres && info.genres.map((g) => <li key={g}>{g}</li>)}</ul>
          <h2>Description</h2>
          <p>{info.description_full}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
