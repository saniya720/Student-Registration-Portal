import React, { useState } from "react";
import { Nav, Button, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>☰</Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <LinkContainer to="/registration">
              <Nav.Link onClick={handleClose}>Student Registration</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/submitted">
              <Nav.Link onClick={handleClose}>Show Submitted Form</Nav.Link>
            </LinkContainer>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
