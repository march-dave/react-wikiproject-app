import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useDebounce } from 'use-debounce';

function Search() {
    let history = useHistory();
    let { id } = useParams();

    const [text, setText] = useState('Hello');
    const [debouncedText] = useDebounce(text, 1000);

    const [inputs, setInputs] = useState([]);
    let state = useSelector((state) => state );
    let dispatch = useDispatch();

    // let handleSearch = (e) => {
    //     e.persist();
    //     let search = e.target.value;

    //     console.log(search);

    //     axios.get('https://simplewikiproject.herokuapp.com/api/wikis/search/' + search)
    //                 .then((result)=>{ 
    //                     setInputs([...result.data]);
    //                     dispatch({type : 'wikiadd', payload : result.data })
    //                     history.push('/searchlist/' + search);
    //                 })
    //                 .catch((error)=>{ console.log(error) })
    // }

    useEffect(()=>{
        axios.get('https://simplewikiproject.herokuapp.com/api/wikis/search/' + debouncedText)
        .then((result)=>{ 
            setInputs([...result.data]);
            dispatch({type : 'wikiadd', payload : result.data })
            history.push('/searchlist/' + debouncedText);
        })
        .catch((error)=>{ console.log(error) })
    
    }, [debouncedText]) 

    let handleChange = (e) => {
        e.persist();
        setText(e.target.value);
    }

    return (
        <div className="header-container">
            <div className="header-item">Wiki Project</div>
                <div style={{ flexGrow : 1 }}></div>
                <div className="header-item"></div>
                <div className="header-item header-search">
                <form>
                    <label htmlFor="s">Search: </label>
                    {/* <input id="s" placeholder="Search..." type="text" name="search" onChange={handleSearch} />  */}
                    <input id="s" placeholder="Search..." type="text" 
                        name="search" onChange={handleChange} /> 
                </form>
            </div>

        </div>
    )
}

export default Search;