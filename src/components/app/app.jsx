import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header';
import MovieInfo from '../movie-info';
import MoviesList from '../movies-list';
import FormComponent from '../form-component/form-component';
import Loader from '../loader';
import './app.css';
const App = () => {
    const [data, setData] = useState([{}]);
    const [formData, setFormData] = useState();
    const [movieData, setMovieData] = useState([{}]);
    const [form, setForm] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [editId, setEditId] = useState();
    const [term, changeTerm] = useState('');
    useEffect(() => {
        (async function fetchAll() {
            await fetch('http://localhost:3000/movies')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(() => alert('Error in fetch!'));
        })();
    }, []);
    useEffect(() => {
        setForm(false);
    }, [movieData]);
    useEffect(() => {
        if (formData) {
            if (isAdd) {
                formData.id = data.length + 1;
                fetch('http://localhost:3000/movies', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(() =>
                        (async function fetchAll() {
                            await fetch('http://localhost:3000/movies')
                                .then(res => res.json())
                                .then(data => setData(data))
                                .catch(() => alert('Error in fetch!'));
                        })(),
                    )
                    .then(() => {
                        setIsAdd(false);
                    })
                    .catch(() => alert('Error in fetch!'));
            } else {
                const id = editId;
                fetch(`http://localhost:3000/movies/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(() =>
                        (async function fetchAll() {
                            await fetch('http://localhost:3000/movies')
                                .then(res => res.json())
                                .then(data => setData(data))
                                .catch(() => alert('Error in fetch!'));
                        })(),
                    )
                    .then(() => setIsAdd(false))
                    .then(() => setMovieData(formData))
                    .catch(() => alert('Error in fetch!'));
            }
        }
    }, [formData]);
    function searchPost(data, term) {
        if (data.length === 1 || !data) {
            return;
        }
        if (term.length === 0) {
            return data;
        }
        return data.filter(item => {
            if (typeof item.title !== 'undefined') return item.title.toLowerCase().indexOf(term) > -1;
        });
    }
    function onUpdateSearch(term) {
        changeTerm(term);
    }
    const visible = searchPost(data, term);
    const movieList = visible ? (
        <MoviesList
            data={visible}
            setMovieData={setMovieData}
            setForm={setForm}
            onUpdateSearch={onUpdateSearch}
            setIsAdd={setIsAdd}
        ></MoviesList>
    ) : (
        <Loader />
    );
    const moviePart = form ? (
        <FormComponent setForm={setForm} setFormData={setFormData}></FormComponent>
    ) : (
        <MovieInfo props={movieData} setForm={setForm} setEditId={setEditId}></MovieInfo>
    );
    return (
        <>
            <AppHeader></AppHeader>
            <div className="main-page">
                {movieList}
                {moviePart}
            </div>
        </>
    );
};
export default App;
