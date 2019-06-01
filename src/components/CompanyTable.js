import React, { Component } from 'react'
import companyData from '../database/companyData.json'
import {
    Header,
    Table,
} from 'semantic-ui-react'

export default class TopMenu extends Component {

    state = { loading: true }

    componentDidMount() {
        let companies = companyData
        companies.forEach(company => {
            company.inequalityRating = Math.floor(Math.random() * 100)
            company.numReviews = Math.floor(Math.random() * 100) + 1
            company.salaryRatio = Math.floor(Math.random() * 2000) + 50

        })
        companies = companies.sort((a, b) => {
            return b.inequalityRating - a.inequalityRating
        })

        this.setState({ companies, loading: false })

        // console.log(companies)
    }

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
                                            {company.company}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>{company.industry}</Table.Cell>
                                    <Table.Cell textAlign='center'> {company.location}</Table.Cell>
                                    <Table.Cell textAlign='center'>{company.revenue}</Table.Cell>
                                    <Table.Cell textAlign='center' width={2}>{company.salaryRatio}</Table.Cell>
                                    <Table.Cell textAlign='center'>{company.inequalityRating}
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

