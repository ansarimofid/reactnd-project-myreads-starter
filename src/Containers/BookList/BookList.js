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

  getShelfData(shelfName) {
    return this.state.booksData.length ?
      this.state.booksData.filter((book) => {
        return book.shelf === shelfName
      })
      :
      false;
  }

  render() {

    console.log(this.getShelfData('currentlyReading'));

    return (
      <div className="list-books-content">
        {
          this.state.booksData.length ? (
            <div>
              <BookShelf shelfName="Currently Reading " booksData = {this.getShelfData('currentlyReading')}/>
              <BookShelf shelfName="Want to Read" booksData = {this.getShelfData('wantToRead')}/>
              <BookShelf shelfName="Read" booksData = {this.getShelfData('read')}/>
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