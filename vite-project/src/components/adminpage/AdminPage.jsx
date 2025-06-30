import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchmanage, deletedata } from "../store/manage";
import MyNavbar2 from "./MyNavbar2";

const AdminPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { manage, loading, error } = useSelector((state) => state.manage);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => {
   
      clearTimeout(timer);
    }
      
  }, []);

  useEffect(() => {
    dispatch(fetchmanage());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel listing?")) {
      dispatch(deletedata(id));
    }
  };

  const handleEdit = (hotelId) => {
    navigate(`/manage?edit=${hotelId}`);
  };

  const containerStyle = {
    backgroundColor: "black",
    minHeight: "100vh",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "wheat",
    marginTop: "2%",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out 0.5s",
  };

  const newHotelButtonStyle = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "green",
    color: "white",
    padding: "15px 30px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2em",
    textDecoration: "none",
  };

  const listingsContainerStyle = {
    color: "wheat",
    padding: "20px",
  };

  const cardStyle = {
    marginBottom: "20px",
    backgroundColor: "#333",
    color: "wheat",
    borderRadius: "8px",
  };

  const cardImageStyle = {
    maxHeight: "100px",
    objectFit: "cover",
    width: "100%",
  };

  const cardButtonStyle = {
    marginRight: "5px",
  };

  useEffect(() => {
    console.log("Current state:", { manage, loading, error });
  }, [manage, loading, error]);

  if (loading) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>Admin Dashboard - Hotel Admin</h3>
        <Container style={listingsContainerStyle}>
          <p className="text-center">Loading listings...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>Admin Dashboard - Hotel Admin</h3>
        <Container style={listingsContainerStyle}>
          <p className="text-danger text-center">
            Error loading listings: {error}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <MyNavbar2 />
      <h3 style={titleStyle}>Admin Dashboard - Hotel Admin</h3>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          paddingBottom: "80px",
        }}
      >
        <Link to="/manage" style={{ textDecoration: "none" }}>
          <Button style={newHotelButtonStyle}>New Hotel</Button>
        </Link>
      </div>

      <Container style={listingsContainerStyle}>
        <h2 className="text-center mb-4">Current Hotel Listings</h2>
        <Row>
          {manage && manage.length > 0 ? (
            manage.map((hotel) => (
              <Col md={4} key={hotel.id} className="mb-3">
                <Card style={cardStyle}>
                  {hotel.image && (
                    <Card.Img
                      variant="top"
                      src={hotel.image}
                      alt={hotel.hotel}
                      style={cardImageStyle}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{hotel.hotel}</Card.Title>
                    <Card.Text>
                      Price: ₹{hotel.price}
                      <br />
                      Pin Code: {hotel.pincode}
                      <br />
                      City: {hotel.city}
                      <br />
                      Address: {hotel.address}
                    </Card.Text>
                    <div className="d-flex">
                      <Button
                        variant="primary"
                        size="sm"
                        style={cardButtonStyle}
                        onClick={() => handleEdit(hotel.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12}>
              <p className="text-center">No hotel listings available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
