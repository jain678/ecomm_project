import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen() {
    const {id} = useParams()
    const location = useLocation()
    const history = useNavigate()

    const[name, setName] = useState('')
    const[price, setPrice] = useState(0)
    const[image, setImage] = useState('')
    const[brand, setBrand] = useState('')
    const[countInStock, setCountInStock] = useState(0)
    const[category, setCategory] = useState('')
    const[description, setDescription] = useState('')
    const[uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success : successUpdate} = productUpdate

    useEffect(() => {

        if(successUpdate) {
            dispatch({type : PRODUCT_UPDATE_RESET})
            history('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(id)){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name || '');
                setPrice(product.price || 0);
                setImage(product.image || '');
                setBrand(product.brand || '');
                setCountInStock(product.countInStock || 0);
                setCategory(product.category || '');
                setDescription(product.description || '');                       
            } 
        }               
        
    }, [dispatch, id, product, history, successUpdate])

    const SubmitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({
            _id : id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try{
            const config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

  return (
    <div>
        <Link to = '/admin/productlist'> 
            Go Back
        </Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={SubmitHandler}>
                
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
    
                        <Form.Control
                            type='file'
                            id = 'image-file'
                            label = 'Choose file'
                            // custom
                            onChange = {uploadFileHandler}
                        >   
                        </Form.Control>
                        {uploading && <Loader />}
                    </Form.Group>
                    

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Brnad'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count in Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
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

export default ProductEditScreen