import React, { Component } from 'react'
import hp from 'humanize-plus'
import axios from 'axios'
import {
    Header,
    Table,
    Loader
} from 'semantic-ui-react'

export default class TopMenu extends Component {

    state = { loading: true}

    async componentDidMount() {
        const reviewsRes = await axios.get('https://quality-mark-server.herokuapp.com/reviews')
        let reviews = reviewsRes.data
        reviews.forEach(review => {
            review.numReviews = Math.floor(Math.random() * 100) + 1
        })
        this.setState({ reviews, loading:false })
    }


    formatRevenue = number => hp.compactInteger(number, 2)

    formatRatio = number => hp.formatNumber(number, 2)

    render() {
        const reviews = this.state.reviews
        const loading = this.state.loading
        if (!loading) {
            return (
                <Table celled padded compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>review Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Industry</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Inequality Rating</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Review</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {reviews.map(review => {
                            return (
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h3' textAlign='center'>
                                            {review.name}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>{review.industry}</Table.Cell>
                                    <Table.Cell textAlign='center'>{review.rating}
                                        <br />
                                        <a href='#'>{review.numReviews} reviews</a>
                                    </Table.Cell>
                                    <Table.Cell>{review.review}</Table.Cell>
                                </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            )
        } else { return <Loader style={{ position: 'relative', top: '20px', paddingBottom: 0 }} active content='Loading Reviews' /> }
    }
}

