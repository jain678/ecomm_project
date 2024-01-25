import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    let history = useNavigate()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}`)
        } else{
            history(history(history.location))
        }
    }

    return (
        <Form onSubmit={submitHandler} inline = 'true'>
            <Form.Control
                type='text'
                name = 'q'
                onChange={e => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            > Submit </Button>

        </Form>
    )
}

export default SearchBox