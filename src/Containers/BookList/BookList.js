/**
 * Created by ansarimofid on 03/03/18.
 */
import React from 'react'
import {getAll, update} from '../../BooksAPI'
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
    this.updateShelf(book, shelf);
    update(book, shelf);
  }

  updateShelf(newBook, shelf) {
    let booksData = this.state.booksData;

    let index = booksData.findIndex((book) => {
      return book.id === newBook.id
    });

    booksData[index].shelf = shelf;

    this.setState({booksData: booksData})
  }

  render() {
    return (
      <div className="list-books-content">
        {
          this.state.booksData.length ? (
            <div>
              <BookShelf shelfName="Currently Reading "
                         booksData={this.getShelfData('currentlyReading')}
                         handleShelfChange={this.handleShelfChange.bind(this)}/>
              <BookShelf shelfName="Want to Read"
                         booksData={this.getShelfData('wantToRead')}
                         handleShelfChange={this.handleShelfChange.bind(this)}/>
              <BookShelf shelfName="Read"
                         booksData={this.getShelfData('read')}
                         handleShelfChange={this.handleShelfChange.bind(this)}/>
            </div>
          ) : (
            <h3 style={{textAlign: 'center'}}>Loading</h3>
          )
        }
      </div>
    )
  }
}

export default BookList