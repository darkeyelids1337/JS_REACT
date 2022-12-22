import React, {useCallback} from 'react';
import './movie-info.css';

const MovieInfo = ({props, setForm, setEditId}) => {
    const memoizedCallback = useCallback(() => {
        setForm(true);
        setEditId(props.id);
    }, [props.id, setEditId, setForm])
    if (!props) return null;
    const {posterUrl, genres, title, director, year, actors, plot, id} = props;
    if (!genres) return null;
    const actorsArray = actors.split(',');
    return (
        <div className="movie-info">
            <div className="crumbs">
                <p>Id: {id}</p>
                <button
                    type="button"
                    className="edit-button"
                    onClick={memoizedCallback}
                >
                    EDIT
                </button>
            </div>
            <div className="top">
                <div className="picture">
                    <img
                        src={posterUrl}
                        alt="oops"
                        width="300px"
                        height="350px"
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'https://http.cat/404';
                        }}
                    ></img>
                </div>
                <div className="top-info">
                    <div className="top-left-info">
                        <h1>{title}</h1>
                        <p className="special">{director}</p>
                        <p>
                            <span className="special">Year:</span> {year}
                        </p>
                        <p>
                            <span className="special">Genres:</span> {genres.join(', ')}
                        </p>
                    </div>
                    <div className="top-right-info">
                        <h3>Actors:</h3>
                        <ul>
                            {actorsArray.map((item, index) => {
                                return <li key={item}>{item}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-info">
                <h3>Description</h3>
                <p>{plot}</p>
            </div>
        </div>
    );
};

export default MovieInfo;
