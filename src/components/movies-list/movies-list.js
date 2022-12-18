import React, {useState, useRef} from "react";
import './movies-list.css';
import {Card} from 'antd';
import {Input} from 'antd';
import { useScrollbar } from "../../hooks/use-scrollbar";
const {Search} = Input;
const MoviesList = ({data, setMovieData, setForm, onUpdateSearch, setIsAdd}) => {
    const active = false;
    const [term, changeTerm] = useState('');
    function onUpdateSearchThis(event){
        const term = event.target.value.toLowerCase();
        changeTerm(term);
        onUpdateSearch(term);
    }
    const content = data.map((item, index) => {
        const {id, title, year, genres = ['no','info'], posterUrl = 'no info', actors, director, plot = 'no info'} = item;
        return (
                <Card key={index}  className ='card' type= 'inner' title = {title} hoverable style={{marginTop: '12px', backgroundColor:'#E0FFFF'}} onClick = {(e) => {
                    setMovieData({id, title, year, genres, posterUrl, actors, director, plot});
                    const card = e.target.offsetParent;
                    const allCards = card.offsetParent.querySelectorAll('.toggled');
                    for(let elements of allCards){
                        elements.classList.toggle('toggled');
                    }
                    card.classList.toggle('toggled');
                    }}>
                    <p>{year} | {genres.join(', ')}</p>
                </Card>
        )
    })
    const movieWrapper = useRef(null);
    const hasScroll = content.length > 10;
    useScrollbar(movieWrapper, hasScroll);
    return (
        <div className="movies-list-wrapper" >
             <Search
                placeholder = 'input search text'
                allowClear
                onChange={onUpdateSearchThis}
                style ={{
                    width: 300,
                    marginTop: '15px',
                }}/>
            <div className="movie-items" style={{height: hasScroll ? '500px' : 'auto', minHeight: '500px'}} ref ={movieWrapper}>
                <div>
                    {content}
                </div>
            </div>
            <div className="movies-list-crumbs">
                <p>Found: {data.length}</p>
                <button type="button" className="add-button" onClick={() => {
                    setForm(!active);
                    setIsAdd(true);
                    }}>ADD</button>
            </div>
        </div>
    )
}

export default MoviesList;