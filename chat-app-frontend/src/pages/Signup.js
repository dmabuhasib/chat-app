import React, { useState } from 'react'

import {Col, Container, Row, Form, Button } from 'react-bootstrap';
import './Signup.css'
import {Link, useNavigate} from 'react-router-dom'
import cartoonImg from '../assets/cartoon-image.avif'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSignupUserMutation } from '../services/appApi';



export default function Signup() {
 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ password, setPassword] = useState('');
  const navigate = useNavigate();
  const [signupUser, {isLoading, error}] = useSignupUserMutation();

  //image upload states

  const [image, setImage] = useState('');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  const validateImg = (e) => {
    const file = e.target.files[0];
    if(file.size >= 1048576){
      return alert("Max file size is 1mb")
    }else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }


  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "typu8zso");
    data.append("cloud_name", "durhfiyrc");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/durhfiyrc/image/upload", {
        method:"post",
        body: data
      })
      const urlData = await res.json();
        setUploadingImg(false)
        return urlData.url;
      } catch (error) {
        setUploadingImg(false);
        console.log(error)
    }
  }
  async function handleSignup(e) {
    e.preventDefault();
    if(!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    // // This console has a problem
    signupUser({name, email, password, picture:url}).then(({data}) => {
      if(data) {
        console.log(data);
        navigate('/chat')
      }
    })
    
  }
 

  return (
    <Container>
    <Row>
      
      <Col md={7} className='d-flex flex-direction-colum justify-content-center align-items-center'>
      <Form  style={{width:"80%" , maxWidth:500}} onSubmit={handleSignup} >
        <h1 className='text-center'>Create account</h1>



        <div className='signup-profile-pic-container'>
          <img src={imagePreview || cartoonImg} className='signup-profile-pic' />

          <label htmlFor='image-upload' className='image-upload-label'>
            <AiFillPlusCircle className='app-pic-icon' />
          </label>

          <input type="file" id='image-upload' hidden accept='image/png, image/jpeg, image/avif' onChange={validateImg} />
        </div>



      <Form.Group className="mb-3" controlId="formBasicName">
         <Form.Label>Name</Form.Label>
         <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName (e.target.value)} value={name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
         </Form.Text>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
    </Form.Group>
    <Button variant="success" type="submit">
      {uploadingImg ? 'Signing you up...' : 'Sign Up'}
    </Button>
    <div className='py-4'>
      <p className='text-center'>
        Already have an account ? <Link to='/login'>Login</Link>
      </p>
    </div>
  </Form>
      </Col>
      <Col md={5} className='signup_bg'>
      </Col>
    </Row>
  </Container>
  )
}
