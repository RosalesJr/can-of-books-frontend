import React from 'react';
import axios from "axios";
import {Button, Carousel} from "react-bootstrap";
import BookForm from "./BookForm"

class BestBooks extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			books: [],
			show: false,
		};
	}


	addBooks = async (event) => {
		event.preventDefault()
		this.hideModal()
		let book = {
			title: event.target.title.value,
			description: event.target.description.value,
			status: event.target.read.checked,
		}
		try {
			let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, book)
			let newBook = response.data
			this.setState({
				books: [...this.state.books, newBook]
			});			
		} catch (error) {
			console.log('error posting', error)
		}
	}

	getBooks = async () =>
	{
		try
		{
			let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);

			this.setState({books: bookData.data});
		} catch (error)
		{
			console.log("Error retrieving books: ", error.response);
		}

	};

	componentDidMount()
	{
		this.getBooks();
	}

	showModal = () =>{
		this.setState({
			show:true
		})
	}

	hideModal = () =>{
		this.setState({
			show:false
		})
	}
	deleteBook = async (bookId) => {
		try {
			let response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookId}`);
			let newBooks = this.state.books.filter((value,index)=>{
				if(value._id=== bookId){
					return false;
				}else{return true;}
				})
			this.setState({
				books: newBooks,
			})
		} catch (error) {
			console.log('error deleting', error)
		}
	
	}

	render()
	{
		console.log(this.state.books);
		let books = this.state.books.map((value, index) =>
		{ 
		    return (
			    <Carousel.Item bg-dark>
				    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
				         alt="Placeholder"
				         className="d-block w-100"/>
				    <Carousel.Caption className="text-primary">
					    <h3>{value.title}</h3>
					    <p>{value.description}</p>
					    <p>{value.status}</p>
							<Button onClick={()=> this.deleteBook(value._id)}>Delete</Button>
				    </Carousel.Caption>
			    </Carousel.Item>
		    )
		})
		/* TODO: render all the books in a Carousel */

		return (
			<>
				<h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
				<Button onClick={this.showModal}>Add a book</Button>
					<BookForm addBooks={this.addBooks} show={this.state.show} onHide={this.hideModal}/>
				{this.state.books.length ? (
					<Carousel className="w-50">
						{books}
					</Carousel>
				) : (
					<h3>No Books Found :(</h3>
				)}
			</>
		);
	}
}

export default BestBooks;
