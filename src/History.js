import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Card, Button, Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function History() {
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
        <div>History

        <Table responsive>
          <tr>
            <th>Title</th>
            <th>EditedAt</th>
            <th>View</th>
            <th>Diff</th>
          </tr>
            {
                inputs && inputs.map( (data, index) => {
                    return (
                    <tr key={index}>
                        <td>{ data.title } </td>
                        <td>
                        <Moment format="YYYY/MM/DD hh:mm:ss">
                            {data.editedat}
                        </Moment>
                        </td>

                        <td>
                            <Link to={`/view/${data.numid}`}>View {data.numid}</Link>
                        </td>
                        <td>
                            <Link to={`/diff/${data.numid}`}>Diff {data.numid}</Link>
                        </td>
                    </tr>
                    )
                })
            }

        </Table>

        <button onClick={()=>{ history.goBack() }} className="btn btn-danger">go Back</button> 
  
        </div>
    )
}

export default History;