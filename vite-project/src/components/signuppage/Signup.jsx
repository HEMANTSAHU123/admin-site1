import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button,Spinner } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { resetAuthState, signupUser } from '../store/auth';
import { useSelector,useDispatch } from 'react-redux';
import MyNavbar from './Navbar';
import { toast } from 'react-toastify';

const Signup = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const{error,authLoading,isauthenticated,user}=useSelector((state)=>state.auth)




  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleformsubmit = async (event) => {
    event.preventDefault();
    dispatch(signupUser(data));
    
  };

  useEffect(() => {
  if(user){
    console.log('usersignup succesfully',user)
     toast.success('Signup successful! Please log in.'); 
    navigate('/login')
  }
  if(error){
    console.log("error is occured",error);
    toast.error(error);
  }
  
    return () => {
    dispatch(resetAuthState());
    }
  }, [error,navigate,user,isauthenticated,dispatch]);
  

  const containerStyle = {
    height: '100vh',
    backgroundColor: '#e0f2f7',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  const formWrapperStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const signupButtonStyle = {
    width: '100%',
    marginTop: '1.5rem',
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
    transition: 'background-color 0.3s ease',
  };

  const signupButtonHoverStyle = {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  };

  const cornerBlobStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '200px',
    backgroundColor: '#bbdefb',
    borderBottomLeftRadius: '200px',
  };

  return (
    <>
      <MyNavbar />
      <Container fluid style={containerStyle}>
        <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
          <Col md={8} lg={6}>
            <div style={formWrapperStyle}>
              <Row className="justify-content-center">
                <Col md={8}>
                  <h2 className="text-center mb-4" style={{ color: '#3f51b5' }}>
                    SignUp
                  </h2>
                  {error && <p className="text-danger">{error}</p>}
                  <Form onSubmit={handleformsubmit}>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label style={{ color: '#555' }}>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={data.email}
                        onChange={handleForm}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                      <Form.Label style={{ color: '#555' }}>Password</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={handleForm}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-3"
                      disabled={authLoading}
                      style={signupButtonStyle}
                      onMouseOver={(e) => Object.assign(e.target.style, signupButtonHoverStyle)}
                      onMouseOut={(e) => Object.assign(e.target.style, signupButtonStyle)}
                    >
                      {authLoading ? ( <>signingin... <Spinner animation="border" size="sm" /></>

                      ):(
                                    'signup'
                                ) }
                    </Button>
                  </Form>
                  <p className="text-center mt-3" style={{ color: '#777' }}>
                    Have an account? <Link to="/login" style={{ color: '#2196f3' }}>
                      Login
                    </Link>
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div style={cornerBlobStyle}></div>
      </Container>
    </>
  );
};

export default Signup;