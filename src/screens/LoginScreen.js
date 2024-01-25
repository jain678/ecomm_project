import React, { useEffect } from 'react'
// import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom'

function LoginScreen() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const location = useLocation()
    const history = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, userInfo, loading} = userLogin

    useEffect(() => {
        if(userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const SubmitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={SubmitHandler}>
            
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer ? <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        register
                    </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen