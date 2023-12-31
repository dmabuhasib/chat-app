import React,{useContext, useState} from 'react'

import {Col, Container, Row, Form, Button } from 'react-bootstrap';
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import { useLoginUserMutation } from '../services/appApi';
import {AppContext} from '../context/appContext'

function Login() {

  const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [loginUser, {isLoading, error}] = useLoginUserMutation();
  const navigate = useNavigate();
  const {socket} = useContext(AppContext)

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({email, password}).then(({data}) => {
      if(data){
        // socket work
        socket.emit('new-user')
        // navigate to the chat
        navigate('/chat')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col md={5} className='login_bg'>
        
        </Col>
        <Col md={7} className='d-flex flex-direction-colum justify-content-center align-items-center'>
      <Form style={{width:"80%" , maxWidth:500}} onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
      </Form.Group>
   
      <Button variant="success" type="submit">
        Log in
      </Button>
      <div className='py-4'>
        <p className='text-center'>
          Don't have an account ? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </Form>
        </Col>
      </Row>

    </Container>
  )
}

export default Login