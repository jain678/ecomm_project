import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login, getUserDetails, updateUser} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
    const {id} = useParams()
    const location = useLocation()
    const history = useNavigate()

    const[name, setName] = useState('')
    const [email, setEmail] = useState('')
    
    const [isAdmin, setIsAdmin]  = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading : loadingUpdate, success : successUpdate} = userUpdate

    useEffect(() => {

        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history('/admin/userlist')
        } else {
            if(!user.name || user._id !== Number(id)){
                dispatch(getUserDetails(id))
            }else{
                setEmail(user.email)
                setName(user.name)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [user, id])

    const SubmitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }

  return (
    <div>
        <Link to = '/admin/userlist'> 
            Go Back
        </Link>

        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={SubmitHandler}>
                
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control                
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check                    
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>


                    <Button type='submit' variant='primary'>
                        update
                    </Button>

                </Form>
            )}
            

        </FormContainer>
    </div>
  )
}

export default UserEditScreen