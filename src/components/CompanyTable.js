import React, { Component } from 'react'
import companyData from '../database/companyData.json'
import hp from 'humanize-plus'
import axios from 'axios'
import {
    Header,
    Table,
    Loader
} from 'semantic-ui-react'

export default class TopMenu extends Component {

    state = { loading: true, showAll: this.props.showAll }

    // Get all companies from the database and add a random number of reviews for display purposes
    async componentDidMount() {
        const companiesRes = await axios.get('https://quality-mark-server.herokuapp.com/companies')
        let companies = companiesRes.data
        companies.forEach(company => {
            company.numReviews = Math.floor(Math.random() * 100) + 1
        })

        // })
        // let companies = companyData
        // companies.forEach(company => {
        //     company.inequalityRating = Math.floor(Math.random() * 100)
        //     company.numReviews = Math.floor(Math.random() * 100) + 1
        //     company.salaryRatio = Math.floor(Math.random() * 2000) + 50

        // })
        this.setState({ companies, })
        this.processCompanies()


        // console.log(companies)
    }


    // Handle change between top 10 companies and all companies
    componentDidUpdate(prevProps) {
        if (prevProps.showAll !== this.props.showAll) {
            this.processCompanies()
        }
    }

    // If all companies in the DB are being rendered, sort alphabetically, otherwise, 
    // show the top 10 companies sorted in descending order by their inequality rating
    processCompanies = () => {
        this.setState({loading: true })
        const showAll = this.props.showAll
        const companies = this.state.companies
        let companiesRet

        if (showAll) {
            companiesRet = companies.sort((a, b) => {
                return a.name < b.name ? -1 : 1
            })
        } else {
            companiesRet = companies.slice(0, 11)
            companiesRet = companiesRet.sort((a, b) => {
                return b.rating - a.rating
            })
        }
        this.setState({ companiesRet, loading: false })
    }


    formatRevenue = number => hp.compactInteger(number, 2)

    formatRatio = number => hp.formatNumber(number, 2)

    render() {
        const companies = this.state.companiesRet
        const loading = this.state.loading
        if (!loading) {
            return (
                <Table celled padded compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Company Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Industry</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Headquarters</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Revenue</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>CEO/Median Salary Ratio</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Inequality Rating</Table.HeaderCell>
                            <Table.HeaderCell >Comments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {companies.map(company => {
                            return (
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h3' textAlign='center'>
                                            {company.name}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>{company.industry}</Table.Cell>
                                    <Table.Cell textAlign='center'> {company.location}</Table.Cell>
                                    <Table.Cell textAlign='center'>{this.formatRevenue(company.revenue)}</Table.Cell>
                                    <Table.Cell textAlign='center' width={2}>{this.formatRatio(company.ceosalary / company.mediansalary)}</Table.Cell>
                                    <Table.Cell textAlign='center'>{company.rating}
                                        <br />
                                        <a href='#'>{company.numReviews} reviews</a>
                                    </Table.Cell>
                                    <Table.Cell>{company.comments}</Table.Cell>
                                </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            )
        } else { return <Loader style={{ position: 'relative', top: '20px', paddingBottom: 0 }} active content='Loading Companies' /> }
    }
}

