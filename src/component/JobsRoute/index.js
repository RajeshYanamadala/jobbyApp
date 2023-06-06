import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusContent.initial,
  }

  componentDidMount() {
    this.renderProfileData()
  }

  getFetchingData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  renderProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusContent.in_progress})

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      Method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      const updateData = this.getFetchingData(data.profile_details)
      this.setState({
        profileData: updateData,
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onEnterSearchInput = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  renderSearchInput = () => {
    const {searchInput} = this.props

    return (
      <div>
        <input
          type="search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onEnterSearchInput}
        >
          <AiOutlineSearch color="#fff" />
        </button>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <li className="profile-card">
        <img
          src={profileImageUrl}
          alt="profile"
          className="profile-img"
          key="profile_image_url"
        />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </li>
    )
  }

  renderProfileFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type="button">Retry</button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div>
      <Loader
        type="ThreeDots"
        color="#fff"
        width="50"
        height="50"
        data-testid="loader"
      />
    </div>
  )

  renderProfileDataView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderProfileDetails()
      case apiStatusContent.failure:
        return this.renderProfileFailureView()
      case apiStatusContent.in_progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="jobs-container ">
          <ul>{this.renderProfileDataView()}</ul>
          {this.renderSearchInput()}
        </div>
      </>
    )
  }
}

export default JobsRoute
