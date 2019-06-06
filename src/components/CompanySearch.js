import React, { Component } from 'react'
import axios from 'axios'
import { Search, Grid } from 'semantic-ui-react'
import db from '../database/dbcon'




const initialState = { isLoading: false, results: [], value: '' }

async componentDidMount() {
        const compSearch = await axios.get('https://quality-mark-server.herokuapp.com/companies')
        let companies = compSearch.data
        })
        this.setState({ companies, loading: false })

        // console.log(companies)
    }


export default class SearchExampleStandard extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }




  render() {
    const { isLoading, value, results } = this.state

    return (
            <search/>
      <Grid>
        <Grid.Column width={6}>
          <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
