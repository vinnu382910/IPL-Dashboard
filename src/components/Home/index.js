// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, matchData: []}

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const statusCode = await response.statusCode
    console.log(statusCode)
    const data = await response.json()

    const formatedDate = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({matchData: formatedDate, isLoading: false})
  }

  renderTeams = () => {
    const {matchData} = this.state
    return (
      <Link to="/">
        <div>
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="main-heading">IPL Dashboard</h1>
          </div>
          <ul className="teams-card-cont">
            {matchData.map(eachItem => (
              <TeamCard cardDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </Link>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="teams-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          this.renderTeams()
        )}
      </div>
    )
  }
}

export default Home
