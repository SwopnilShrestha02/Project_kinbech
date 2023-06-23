import React,{useEffect} from 'react'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import {Row,Col, ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {addToCart } from '../actions/cartActions'

const CartScreen = () => {

  const id = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId=id

  const qty= location.search?Number(location.search.split('=')[1]): 1


  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])




  return (
    <h1>CART</h1>
  )
}

export default CartScreen
