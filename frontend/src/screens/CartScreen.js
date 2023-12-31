import React,{useEffect} from 'react'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import {Row,Col, ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import {addToCart,removeFromCart } from '../actions/cartActions'

const CartScreen = () => {

  const id = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId=id.id

  const qty= location.search?Number(location.search.split('=')[1]): 1

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler=(productId)=>{
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler=()=>{
    navigate('/login?redirect=shipping')
  }

  const cart=useSelector(state=>state.cart)
  const {cartItems}=cart

  return (
    <Row>
      <Col md={8}>
        {cartItems.length===0?<Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>:(
          <ListGroup variant='flush'>
            {cartItems.map(item=>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control as ='select' value={item.qty} onChange={(e)=>addToCart(item.product,Number(e.target.value) )}>
                        {                
                         [...Array(item.countInStock).keys()].map(x=>(
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant='light' onClick={()=>  
                      removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Sub Total ({cartItems.reduce((acc,item)=>acc+item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
                  Proceed To Check Out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
