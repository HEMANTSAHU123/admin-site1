import React, { useState, useEffect } from 'react';
import MyNavbar from '../signuppage/Navbar';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchmanage, addetails, updatemanage, deletedata } from '../store/manage';
import MyNavbar2 from './MyNavbar2';

const ManageListing = () => {
  const [newListingData, setNewListingData] = useState({
    hotel: '',
    price: '',
    pincode: '',
    city: '',
    address: '',
    image: '',
  });
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);

  const { loading, error, manage } = useSelector((state) => state.manage);
  const { authLoading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      dispatch(fetchmanage());
    }
  }, [dispatch, isAuthenticated, authLoading]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewListingData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
   
    if (!isAuthenticated || authLoading) {
    console.log(isAuthenticated,authLoading)
      return;
    }
    if (editId) {
     console.log('edit')
      dispatch(updatemanage({ id: editId, updateddata: newListingData }));
      setEditId(null);
    } else {
    console.log('add')
      dispatch(addetails(newListingData));
    }

    setNewListingData({
      hotel: '',
      price: '',
      pincode: '',
      city: '',
      address: '',
      image: '',
    });
   
  };

  const handledelete = (id) => {
   
    dispatch(deletedata(id));
  };

  const handleedit = (hotel) => {
   
    setEditId(hotel.id);
    setNewListingData({
      hotel: hotel.hotel,
      price: hotel.price,
      pincode: hotel.pincode,
      city: hotel.city,
      address: hotel.address,
      image: hotel.image,
    });
  };

  return (
    <div>
      <MyNavbar2 />
      <Container className="mt-5" style={{ backgroundColor: 'Lightpink', borderRadius: '15px' }}>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 style={{ display: 'flex', alignItems: 'center' }}>
              {editId ? 'Edit Hotel Listing' : 'Add Hotel Listing'}
            </h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formHotelName">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="hotel"
                  value={newListingData.hotel}
                  onChange={handleFormChange}
                  placeholder="Enter hotel name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price per Night</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newListingData.price}
                  onChange={handleFormChange}
                  placeholder="Enter price per night"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPin">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  type="number"
                  name="pincode"
                  value={newListingData.pincode}
                  onChange={handleFormChange}
                  placeholder="Enter pin code"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={newListingData.city}
                  onChange={handleFormChange}
                  placeholder="Enter city"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={newListingData.address}
                  onChange={handleFormChange}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={newListingData.image}
                  onChange={handleFormChange}
                  placeholder="Enter image URL"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editId ? 'Update Hotel' : 'Add Hotel'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <h2 className="mt-9 text-center">Current Hotel Listings</h2>
      <Container>
        <Row>
          <Col md={12} className="sm" style={{}}>
            <ul className="list-unstyled">
              {loading && <p className="text-center">Loading listings...</p>}
              {error && <p className="text-danger text-center">Error loading listings: {error}</p>}
              {manage.map((hotel) => (
                <div key={hotel.id} className="mb-3">
                  <div className="card">
                    {hotel.image && (
                      <img
                        src={hotel.image}
                        className="card-img-top"
                        alt={hotel.hotel}
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{hotel.hotel}</h5>
                      <p className="card-text">
                        Price: ₹{hotel.price}
                        <br />
                        Pin Code: {hotel.pincode}
                        <br />
                        City: {hotel.city}
                        <br />
                        Address: {hotel.address}
                      </p>
                      <Button variant="primary" onClick={() => handleedit(hotel)} size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handledelete(hotel.id)} size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {!loading && manage.length === 0 && <p className="text-center">No hotel listings added yet.</p>}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageListing;