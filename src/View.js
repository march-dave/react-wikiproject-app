import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactMarkdown from 'react-markdown';

function View() {
    const [inputs, setInputs] = useState({});
    let state = useSelector((state) => state );

    let { id } = useParams();

    useEffect(()=>{
        axios.get('https://simplewikiproject.herokuapp.com/api/wikis/' + id)
                    .then((result)=>{ 
                        setInputs(...result.data);
                    })
                    .catch((error)=>{ console.log(error) })
    },[]);

    return (
        <div>
            <Container>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{ inputs.title }</Card.Title>
                        <Card.Text>
                            <ReactMarkdown>{inputs.description}</ReactMarkdown>
                            <ReactMarkdown>{inputs.content}</ReactMarkdown>
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default View;