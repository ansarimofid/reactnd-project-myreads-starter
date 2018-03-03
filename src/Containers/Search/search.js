/**
 * Created by ansarimofid on 03/03/18.
 */

/**
 * Created by ansarimofid on 03/03/18.
 */

import React from 'react'
import {NavLink} from 'react-router-dom'
import {search} from '../../BooksAPI'
import BookItem from '../../Components/BookItem/BookItem'

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      query:''
    }
  }

  getSearchResult(query) {
    return search(query)
      .then((data) => {
        console.log(data)
        this.setState({searchData: data})
      })
  }

  handleShelfChange(book, shelf) {

  }

  handleInputChange(e) {
    let query = e.target.value;
    this.setState({query:query})
    console.log("Query", query);
    this.getSearchResult(query);

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
            this.state.query?(
              <ol className="books-grid">
                {
                  this.state.searchData.length ? this.state.searchData.map((book =>
                      <BookItem
                        key={book.id}
                        bookData={book}
                        handleShelfChange={this.handleShelfChange.bind(this)}
                      />
                  ))

                    : (
                    <div>Loading Results</div>
                  )
                }
              </ol>
            ): (
              <h3>Enter Query To Search</h3>
            )
          }
        </div>
      </div>
    )
  }
}

export default Search