import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
const MyNavbar2 = () => {
    const headerStyle = {
        display: 'flex',
        gap: '12px',
        padding: '15px',
      };
    
      const linkStyle = {
        color: 'wheat',
        marginBottom: '0',
      };
    
      const buttonStyle = {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'Red',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        border: 'none',
        textDecoration: 'none',
      };


  return (
    <>
       <div style={headerStyle}>
        <Link to="/admin">
          <p style={linkStyle}>HotelAdmin</p>
        </Link>
        <Link to="/">
          <p style={linkStyle}>Home</p>
        </Link>
        <Link to="/admin/bookings">
          <p style={linkStyle}>Bookings</p>
        </Link>
        <Link to="/manage">
          <p style={linkStyle}>Manage Listings</p>
        </Link>
      <Link to='/login'> <Button style={buttonStyle}>Logout</Button></Link> 
      </div>
    </>
  )
}

export default MyNavbar2
