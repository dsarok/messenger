import React,{useRef} from 'react'
import { Container,Form,Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
export default function Login(props) {
    const idref = useRef();
    function handlesubmit(e) {
        e.preventDefault();
        props.onSubmitId(idref.current.value);
    }
    function createnewid() {

        props.onSubmitId(uuidv4());
    }
    return (
       <>
       <Container fluid style={{display:"flex",alignItems:"center",height:"100vh"}}>
       <Form onSubmit={handlesubmit} className="w-100">
        <Form.Group controlId="formBasicEmail">
        <Form.Label>UserId</Form.Label>
        <Form.Control type="text" ref={idref} placeholder="Enter userID" className="w-100" />
        <Form.Text className="text-muted">
         We'll never share your email with anyone else.
         </Form.Text>
     </Form.Group>
    <Button variant="primary" type="submit" className="mr-2">Login</Button>
    <Button variant="info" onClick={createnewid}>Create new id</Button>
     </Form>
     </Container>
       
       </>
    )
}
