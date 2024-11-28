import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

interface UserProfileProps {
  name: string;
  rut: string;
  email: string;
  rol: string;
  carreer: string;
  profilePicture: string; // Add profile picture URL
}

const UserProfile: React.FC<UserProfileProps> = ({ name, rut, email, rol, carreer, profilePicture }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className='mx-auto px-4 py-4 mt-4'>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title>Perfil del Usuario</Card.Title>
                    <Card.Text>
                      <strong>Nombre:</strong> {name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Carrera: </strong> {carreer}
                    </Card.Text>
                    <Card.Text>
                      <strong>ROL USM: </strong> {rol}
                    </Card.Text>
                    <Card.Text>
                      <strong>RUT: </strong> {rut}
                    </Card.Text>
                    <Card.Text>
                      <strong>Correo:</strong> {email}
                    </Card.Text>
                  </Col>
                  <Col md={4}>
                    <Image src={profilePicture} roundedCircle fluid />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;