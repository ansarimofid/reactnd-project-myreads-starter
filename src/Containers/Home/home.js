/**
 * Created by ansarimofid on 03/03/18.
 */

import React from 'react'
import {NavLink} from 'react-router-dom'
import BookList from '../BookList/BookList'

class Home extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BookList/>
        <div className="open-search">
          <NavLink exact to='/search'>Add a book</NavLink>
        </div>
      </div>
    )
  }
}

export default Home