import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { ref, update, onValue } from "firebase/database";
import { realtimedatabase } from "../firebase/firebase";
import MyNavbar2 from "./MyNavbar2";
const BookingHotel = () => {
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        const bookingsRef = ref(realtimedatabase, 'bookings');

        const unsubscribe = onValue(bookingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const bookingsList = Object.entries(data).map(([id, bookingData]) => ({
                    id,
                    ...bookingData,
                }));
                setBookings(bookingsList);
            } else {
                setBookings([]);
            }
        });

        return () => unsubscribe(); 
    }, []);

    const handleStatusChange = async (bookingId, status) => {
        const bookingRef = ref(realtimedatabase, `bookings/${bookingId}`);
        try {
            await update(bookingRef, { status: status });
            alert(`Booking ${status}.`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert(`Failed to ${status} booking.`);
        }
    };

    return (
        <>
        <MyNavbar2/>
        <Container className="mt-5">
            <h2>Hotel Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <Row>
                    {bookings.map((booking) => (
                        <Col key={booking.id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Booking ID: {booking.bookingId}</Card.Title>
                                    <p>Hotel: {booking.hotel?.hotel}</p>
                                    {booking.hotel?.image && (
                                        <img
                                            src={booking.hotel.image}
                                            alt={booking.hotel.hotel}
                                            style={{ height: '120px', width: '100%', objectFit: 'cover', marginBottom: '10px' }}
                                        />
                                    )}
                                    <p>pincode:{booking.hotel?.pincode}</p>
                                    <p>City: {booking.hotel?.city}</p>
                                    <p>Address: {booking.hotel?.address}</p>
                                    <p>Email: {booking.email}</p>
                                    <p>Phone: {booking.phone}</p>
                                    <p>Guests: {booking.bookingData?.guests}</p>
                                    <p>Check-in: {booking.bookingData?.checkIn ? new Date(booking.bookingData.checkIn).toLocaleDateString() : 'N/A'}</p>
                                    <p>Check-out: {booking.bookingData?.checkOut ? new Date(booking.bookingData.checkOut).toLocaleDateString() : 'N/A'}</p>
                                   
                                    <p>Status: {booking.status}</p>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            variant="success"
                                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                            disabled={booking.status !== 'pending'}
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                                            disabled={booking.status !== 'pending'}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
        </>
    );
};


export default BookingHotel;