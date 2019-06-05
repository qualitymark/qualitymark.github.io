import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'semantic-ui-react'
import db from '../database/dbcon'
import Suggestions from 'components/Suggestions'


class Search extends Component {
 state = {
   query: '',
   results: []
 }

//Not sure how to connect database???
/*const { API_KEY } = 
const API_URL = ''

  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
      .then(({ data }) => {
        this.setState({
          results: data.data 
		  
        })
      })
  }*/


handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }


 render() {
   return (
     <form>
       <input
         placeholder="Search for..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
	   <Suggestions results={this.state.results} />
       <p>{this.state.query}</p>
     </form>
   )
 }
}

export default Search
