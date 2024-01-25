import React  from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { listProducts } from '../actions/productActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';


function HomeScreen() {
  const dispatch  = useDispatch()
  const history = useNavigate()
  const location = useLocation()


  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  // let keyword = history.location.search
  // console.log(keyword);
  useEffect(() => {
    const keyword = new URLSearchParams(location.search).get('keyword')

    dispatch(listProducts(keyword))
  },[dispatch, location.search])

  return (
    <div>
        <h1>Latest products</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
            :
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
            </Row>
        }
        
    </div>
  )
}

export default HomeScreen