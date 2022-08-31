import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { FormControl, FormGroup, FormLabel, Form } from "react-bootstrap";

class EditForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let bookToUpdate = {
			title: e.target.title.value || this.props.book.title,
			description: e.target.description.value || this.props.book.description,
			status: e.target.read.checked || this.props.book.status,
      _id: this.props.book._id,
      _v: this.props.book._v,
		}
    this.props.updateBooks(bookToUpdate)
  }
  render(){
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="title">
          <FormLabel> Title:</FormLabel>
        <FormControl type="text" placeholder={this.props.book.title} />

        </FormGroup>
        <FormGroup controlId="description">
          <FormLabel> Description:</FormLabel>
          <FormControl type="text" placeholder={this.props.book.description} />

        </FormGroup>
        <FormGroup controlId="read">
          <FormLabel> Have you read this book?</FormLabel>
          <Form.Check type="checkbox" />
        <Button variant="primary" type="submit">Submit</Button>
        </FormGroup>
      </Form>
      </Container>
    )
  }}
export default EditForm;
