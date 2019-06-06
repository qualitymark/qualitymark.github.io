import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios'
import { Search } from 'semantic-ui-react'

export default class SearchExampleStandard extends Component {

  // Set initial state of variables to empty/blank when component mounts for the first time.
  // These vars will be set back to these values when the search input is empty
  state = {
    loading: false,
    results: [],
    value: ''
  }

  // Get list of companies from API and process them so they are in the format expected by
  // Semantic UI's <Search/> component.
  async componentDidMount() {
    const compSearch = await axios.get('https://quality-mark-server.herokuapp.com/companies')
    const companies = compSearch.data
    this.setState({ loading: false })
    this.processCompanies(companies)

    // console.log('Companies from CompanySearch.js:', companies)
  }

  // Search component requires that the list being searched has the format 
  // {title: name, description: company description}. Poorly documented aspect of semantic ui
  processCompanies = (companies) => {
    // Map returns an array whose elements are specified by the return value. In this case
    // an array of objects
    const companiesRet = companies.map(company => {
      return {
        title: company.name,
        description: company.comments
      }
    })
    this.setState({ companies: companiesRet, loading: false })

  }

  // Handles when a user clicks a search result. Nothing there yet, maybe load that specific
  // company?
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })


  handleSearchChange = (e, { value }) => {
    // set loading to true to activate fancy spinner in ui
    this.setState({ loading: true, value })

    // Only do this at most every 300ms (users may type more than one letter in this time)
    setTimeout(() => {
      // Explicitly set values of state to default (no values) if no chars are entered in search (default case)
      if (this.state.value.length < 1) return this.setState({ loading: false, results: [], value: '' })

      // convert input to regular expression, escape special chars (), {}, '', ``, etc and ignore ('i') them
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      // returns true if some part of the converted reg exp matches some part of a company "title"
      const isMatch = result => re.test(result.title)

      this.setState({
        loading: false,
        // This is the actual search process (add to component state the results only if they match user input)
        results: _.filter(this.state.companies, isMatch),
      })
    }, 300)
  }


  // Removed Grid, Header, and Segment. These were used to render the real time results display
  // for the example search component on the semantic ui documentation 
  // (The part that says State and Options and looks like JSON)
  render() {
    const { loading, value, results } = this.state
    return (
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        loading={loading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
      />
    )
  }
}
