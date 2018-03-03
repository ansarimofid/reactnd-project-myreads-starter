/**
 * Created by ansarimofid on 03/03/18.
 */
import React from 'react'
import {getAll,update} from '../../BooksAPI'
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

  handleShelfChange(book, shelf) {

    update(book, shelf)
      .then(()=> {
      this.getAllBooks();
      })
    console.log("Shelf Changes", shelf, book);
  }

  render() {

    console.log(this.getShelfData('currentlyReading'));

    return (
      <div className="list-books-content">
        {
          this.state.booksData.length ? (
            <div>
              <BookShelf shelfName="Currently Reading "
                         booksData = {this.getShelfData('currentlyReading')}
                         handleShelfChange = {this.handleShelfChange.bind(this)}/>
              <BookShelf shelfName="Want to Read"
                         booksData = {this.getShelfData('wantToRead')}
                         handleShelfChange = {this.handleShelfChange.bind(this)}/>
              <BookShelf shelfName="Read"
                         booksData = {this.getShelfData('read')}
                         handleShelfChange = {this.handleShelfChange.bind(this)}/>
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