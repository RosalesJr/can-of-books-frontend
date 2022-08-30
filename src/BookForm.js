import React from "react";
import { FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookForm extends React.Component {
  
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header>
        <Modal.Title>Add a book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Form onSubmit={this.props.addBooks}>
        <FormGroup controlId="title">
          <FormLabel> Title:</FormLabel>
          <FormControl type="text" placeholder="Name of book" />

        </FormGroup>
        <FormGroup controlId="description">
          <FormLabel> Description:</FormLabel>
          <FormControl type="text" placeholder="Description of book" />

        </FormGroup>
        <FormGroup controlId="read">
          <FormLabel> Have you read this book?</FormLabel>
          <FormControl type="checkbox" />
        <Button variant="primary" type="submit">Submit</Button>
        </FormGroup>
      </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default BookForm;