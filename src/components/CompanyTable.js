import React, { Component } from 'react'
import companyData from '../database/companyData.json'
import hp from 'humanize-plus'
import axios from 'axios'
import {
    Header,
    Table,
} from 'semantic-ui-react'

export default class TopMenu extends Component {

    state = { loading: true }

    async componentDidMount() {
        const companiesRes = await axios.get('https://quality-mark-server.herokuapp.com/companies')
        let companies = companiesRes.data.slice(0,11)
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
        companies = companies.sort((a, b) => {
            return b.rating - a.rating
        })

        this.setState({ companies, loading: false })

        // console.log(companies)
    }

    formatRevenue = number => hp.compactInteger(number,2)

    render() {
        const companies = this.state.companies
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
                                    <Table.Cell textAlign='center' width={2}>{(company.ceosalary/company.mediansalary).toFixed(2)}</Table.Cell>
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
        } else { return null }
    }
}

