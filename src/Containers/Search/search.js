/**
 * Created by ansarimofid on 03/03/18.
 */

/**
 * Created by ansarimofid on 03/03/18.
 */

import React from 'react'
import {NavLink} from 'react-router-dom'
import {getAll, search, update} from '../../BooksAPI'
import BookItem from '../../Components/BookItem/BookItem'

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      booksData: [],
      query: '',
      loading: false
    }
  }

  componentWillMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    return getAll()
      .then((data) => {
        console.log(data);
        this.setState({booksData: data})
      })
  }

  getSearchResult(query) {
    this.setState({loading: true});
    if (query) {
      return search(query)
        .then((data) => {
          console.log(data);
          this.setState({searchData: data});
          this.setState({loading: false});
        })
        .catch(() => {
          this.setState({loading: false});
        })
    }

  }

  handleShelfChange(book, shelf) {
    this.updateSearch(book, shelf);
    update(book, shelf);
  }

  updateSearch(newBook, shelf) {
    let searchData = this.state.searchData;

    let index = searchData.findIndex((book) => {
      return book.id === newBook.id
    });

    searchData[index].shelf = shelf;
    this.setState({searchData: searchData})
  }

  handleInputChange(e) {
    let query = e.target.value.trim();
    this.setState({query: query});
    this.getSearchResult(query);
  }

  bookOnShelf(bookid) {
    let index = this.state.booksData.findIndex((book) => {
      return book.id === bookid
    });

    if (index > 0)
      return this.state.booksData[index];

    return false;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <NavLink className="close-search" exact to='/'>Close</NavLink>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input onChange={this.handleInputChange.bind(this)} type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          {
            this.state.query ? (
              <ol className="books-grid">
                {
                  this.state.searchData.length ? this.state.searchData.map((book => {

                      let validBook = this.bookOnShelf(book.id);
                      let noShelf = false;

                      if (!validBook) {
                        noShelf = true;
                        validBook = book;
                      }

                      return <BookItem
                        key={book.id}
                        bookData={validBook}
                        handleShelfChange={this.handleShelfChange.bind(this)}
                      />
                    }
                  ))
                    : this.state.loading ? (
                    <div>Loading Results</div>
                  ) : (
                    <div style={{textAlign: 'center'}}>No Result</div>
                  )
                }
              </ol>
            ) : (
              <h3 style={{textAlign: 'center'}}>Enter Query To Search</h3>
            )
          }
        </div>
      </div>
    )
  }
}

export default Search