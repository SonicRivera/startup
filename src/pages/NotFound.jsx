import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

export function NotFound() {
    return (
        <Container className="text-center" style={{ padding: '50px' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="display-1">404</h1>
                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="mb-4">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Button as={Link} to="/" variant="primary">
                        Go Back Home
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

