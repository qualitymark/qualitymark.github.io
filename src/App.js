import PropTypes from 'prop-types'
import React, { Component } from 'react'
import logo from './images/logo.jpg'
import CompanyTable from './components/CompanyTable'
import LoginForm from './components/LoginForm'
import CompanySearch from './components/CompanySearch'


import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Table,
  Visibility,
  Modal,
} from 'semantic-ui-react'


const getWidth = () => window.innerWidth


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
  <Image centered bordered rounded size='small' src={logo}/>

    <Header
      as='h1'
      content='QualityMark'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '0.5em' : '1em',
      }}
    />
    <Header
      as='h2'
      content='Tracking income inequality and revealing how the benefits of growth are distributed since 2019.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {loggedIn: false}
  componentDidMount(){
  }

  handleLogin = (user) => {
    this.setState({loggedIn: true, modalOpen:false, user:user[0]})
    console.log('logged in', this.state.user)
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 400, padding: '1em 0em'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Companies</Menu.Item>
                <Menu.Item as='a'>Reviews</Menu.Item>
                <Menu.Item position='right'>
                <Modal
                  trigger={<Button onClick={!this.state.loggedIn ? ()=>this.setState({modalOpen:true}) : null} as='a' inverted={!fixed}>{this.state.loggedIn ? `${this.state.user.username}` : `Log in / Sign up`}</Button>}
                  open={this.state.modalOpen}
                  onClose={()=>this.setState({modalOpen:false})}
                  content={<LoginForm handleLogin={this.handleLogin}/>}
                />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Companies</Menu.Item>
          <Menu.Item as='a'>Reviews</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: 'em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                <Modal
                  trigger={<Button as='a' inverted>Log in / Sign up</Button>}
                  content={<LoginForm/>}
                />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


const App = () => (
  <ResponsiveContainer>
  <Container fluid style={{padding:'2em 2em'}}>
  <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p>Company Inequality Rankings</p>
        </Divider>
    <CompanyTable/>
  </Container>
    <Segment style={{ paddingTop: '8em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
            <Header as='h3' style={{ fontSize: '1.5em' }}>
              "My boss earns nearly 3x my income"
            </Header>
            <p style={{ fontSize: '1.33em' }}><b>Reuben Y</b> Actuarial Science, Wells Fargo</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
            <Header as='h3' style={{ fontSize: '1.5em' }}>
              "Executives like myself must be competitively compensated to attract the best and brightest "
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <b>Jen B</b> CFO, Peacock Ltd.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
      <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Tackling Income Inequality Requires New Policies
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        The hollowing out of the middle class, rising social and political tension, 
        lack of education, globalization, and rapid technological change are just a 
        few of the many drivers of growing income inequality.
        </p>
        <Button as='a' href='https://blogs.imf.org/2019/05/15/tackling-income-inequality-requires-new-policies/' target='blank' size='large'>
          Read More
        </Button>

        <Header as='h3' style={{ fontSize: '2em' }}>
          How to Keep Corporate Power in Check
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        People are becoming concerned that the rising power of big successful companies
         may be behind some of the recent sluggish economic growth and rising income inequality.
        </p>
        <Button as='a' href='https://blogs.imf.org/2019/04/03/how-to-keep-corporate-power-in-check/' target='blank' size='large'>
          Read More
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Team</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Objectives</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Extras' />
              <List link inverted>
                <List.Item as='a'>Privacy Policy</List.Item>
                <List.Item as='a'>Terms and Conditions</List.Item>
                <List.Item as='a' href='https://blogs.imf.org/tag/income-inequality/' target='blank'>IMF Blog</List.Item>
                <List.Item as='a' href='http://www.oecd.org/social/inequality.htm#income' target='blank'>OECD Inequality</List.Item>

              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                QualityMark
              </Header>
              <p>
                Submit a review discussing inequality at your workplace to be entered in a draw to win an iPad Pro!
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default App
