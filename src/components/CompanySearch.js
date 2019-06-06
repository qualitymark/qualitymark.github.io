import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios'
import { Search } from 'semantic-ui-react'

export default class SearchExampleStandard extends Component {

  // Set initial state of variables to empty/blank when component mounts for the first time
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
    this.setState({loading: false })
    this.processCompanies(companies)

    // console.log('Companies from CompanySearch.js:', companies)
  }

  // Search component requires that the list being searched has the format 
  // {title: name, description: company description}
  processCompanies = (companies) =>{
    const companiesRet = companies.map(company =>{
      return{
        title:company.name,
        description: company.comments
      }
    })
    this.setState({companies: companiesRet, loading: false })

  }
  
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ loading: true, value })

    // Explicitly set values of state to default (no values) 
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({loading:false, results:[], value:''})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        loading: false,
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
