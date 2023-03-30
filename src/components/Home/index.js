import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import Posts from '../Posts'
import SearchResults from '../SearchResults'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    apiStatus: apiStatusConstants.initial,
  }

  //   componentDidMount() {
  //     this.getSearchData()
  //   }

  getSearchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResults: data.posts,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickSearchButton = () => {
    console.log('button clicked')
    this.getSearchData()
  }

  changeSearchInput = input => {
    console.log(input)
    this.setState({searchInput: input})
  }

  renderSuccessView = () => {
    const {searchResults} = this.state
    return (
      <>
        {searchResults.length === 0 ? (
          <>
            <StoriesSlider />
            <Posts />
          </>
        ) : (
          <SearchResults searchResults={searchResults} />
        )}
      </>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <img
        src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656650/Group_7522_mbm51a.svg"
        alt="failure view"
        className="profile-failure-img"
      />
      <p className="profile-failure-text">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        data-testid="button"
        className="profile-failure-button"
        onClick={this.getSearchData}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          clickSearchButton={this.clickSearchButton}
        />

        {this.renderViews()}
      </>
    )
  }
}
export default Home
