import React, { useEffect, useState } from 'react'
// import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login, register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom'

function RegisterScreen() {
    const[name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location = useLocation()
    const history = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {error, userInfo, loading} = userRegister

    useEffect(() => {
        if(userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const SubmitHandler = (e) =>{
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
        
    }

  return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={SubmitHandler}>
            
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Register
            </Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Have an account ? <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen