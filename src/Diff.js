// https://levelup.gitconnected.com/render-code-diffs-in-a-react-app-with-the-react-diff-viewer-library-d2ff2c680cb

import React, { useEffect, useState } from 'react';
import ReactDiffViewer from "react-diff-viewer";
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


export default function Diff() {

  let history = useHistory();
  let { id } = useParams();

    const [inputs, setInputs] = useState([]);
    let state = useSelector((state) => state );

    useEffect(()=>{
        axios.get('https://simplewikiproject.herokuapp.com/api/wikis/')
                    .then((result)=>{ 
                        setInputs([...inputs, ...result.data]);

                    })
                    .catch((error)=>{ console.log(error) })
    },[]);


  return (
    <div className="App">

      { 
        inputs && inputs.map( (data, index) => {
          <ReactDiffViewer oldValue={data.content} newValue={data.content} splitView={true} />
        })
      }
     
      {
        inputs && inputs.length> 0 ? 
        <ReactDiffViewer oldValue={inputs[id-1].content} newValue={inputs[id].content} splitView={true} />
        : null
      }
      
    </div>
  );
}