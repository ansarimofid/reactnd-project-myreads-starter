/**
 * Created by ansarimofid on 03/03/18.
 */
import React from 'react'
import {getAll} from '../../BooksAPI'
import BookShelf from '../../Components/BookShelf/BookShelf'


class BookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksData: []
    }
  }

  componentWillMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    return getAll()
      .then((data) => {
        console.log(data)
        this.setState({booksData: data})
      })
  }

  getCurrReading() {
    return this.state.booksData.length ?
      this.state.booksData.filter((book) => {
        return book.shelf === 'currentlyReading'
      })
      :
      false;
  }

  render() {

    console.log(this.getCurrReading());

    return (
      <div className="list-books-content">
        {
          this.state.booksData.length ? (
            <div>
              <BookShelf/>
              <BookShelf/>
              <BookShelf/>
            </div>
          ) : (
            <div>Loading</div>
          )
        }
      </div>
    )
  }
}

export default BookList