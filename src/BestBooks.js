import React from 'react';
import axios from "axios";
import {Carousel} from "react-bootstrap";

class BestBooks extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			books: []
		};
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
				    </Carousel.Caption>
			    </Carousel.Item>
		    )
		})
		/* TODO: render all the books in a Carousel */

		return (
			<>
				<h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
