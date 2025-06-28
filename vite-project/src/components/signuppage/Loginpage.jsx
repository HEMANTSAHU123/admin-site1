import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetLoginState } from '../store/loginSlice';

const Login = () => {
    const [list, setList] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, error, isLoggedIn } = useSelector(
        (state) => state.login
    );

    const handleForm = (event) => {
        const { name, value } = event.target;
        setList({ ...list, [name]: value });
    };

    const handlesubmit = async (event) => {
        event.preventDefault();
        dispatch(loginUser(list));
     
    };

    useEffect(() => {
      
        if (user) {
            console.log('User logged in successfully:', user);
            toast.success('Login successful!');
            navigate('/admin');
        }

      
        if (error) {
            console.error('Login error:', error);
            toast.error(error); 
        }

       
        return () => {
            dispatch(resetLoginState());
        };
    }, [user, isLoggedIn, error, navigate, dispatch]); 

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="6" className="shadow p-4 rounded bg-light">
                    <Form onSubmit={handlesubmit}>
                        <h3 className="text-center mb-4">Login Form</h3>

                        {error && <p className="text-danger text-center">{error}</p>} 
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text" 
                                name="email"
                                placeholder="Enter email"
                                value={list.email}
                                onChange={handleForm}
                                className="py-2"
                                disabled={isLoading} 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password" 
                                name="password"
                                placeholder="Password"
                                value={list.password}
                                onChange={handleForm}
                                className="py-2"
                                disabled={isLoading}
                                required 
                                autoComplete="current-password"
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg"
                                className="mb-3"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        Logging In... <Spinner animation="border" size="sm" />
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </div>

                        <p className="text-center mt-3">
                            <Link to="/forgot" className="text-decoration-none">
                                Forgot password?
                            </Link>
                        </p>
                    </Form>
                    <p className="mt-3 text-center">
                        Don't have an account ?<Link to='/'>Sign up</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;