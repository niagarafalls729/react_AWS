import "./IndexNavbar.css";
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 

function CollapsibleExample() {


  // const [color, setColor] = React.useState("");

  // React.useEffect(() => {
  //   window.addEventListener("scroll", changeColor);
  //   return function cleanup() {
  //     window.removeEventListener("scroll", changeColor);
  //   };
  // }, []);
  // const changeColor = () => {
  //   if (
  //     document.documentElement.scrollTop > 99 ||
  //     document.body.scrollTop > 99
  //   ) {
  //     setColor("scroll");
  //   } else if (
  //     document.documentElement.scrollTop < 100 ||
  //     document.body.scrollTop < 100
  //   ) {
  //     setColor("");
  //   }
  // }; 



  return ( 
      <Navbar className="fixed-top" collapseOnSelect expand="sm" bg="dark" variant="dark">  
        <Container className="marginBrand">

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav  >
              <Navbar.Brand  href="/">김지수 개인 React 공부 블로그</Navbar.Brand>
              <Nav className="me-auto">
          
              </Nav>
  {/*             
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav> 
        </Container>
      </Navbar> 
  );
}

export default CollapsibleExample;