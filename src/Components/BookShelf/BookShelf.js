/**
 * Created by ansarimofid on 03/03/18.
 */

import React from 'react'
import BookItem from '../BookItem/BookItem'

class BookShelf extends React.Component {

  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.booksData.map((book =>
            <BookItem key={book.id} bookData={book}/>
            ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf