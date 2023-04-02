import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

class StoriesSlider extends Component {
  state = {apiStatus: apiStatusConstants.initial, storiesList: []}

  componentDidMount() {
    this.getStoriesList()
  }

  getStoriesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <>
        <Slider {...settings}>
          {storiesList.map(each => {
            const {userName, storyUrl, userId} = each
            return (
              <ul className="story-container">
                <li className="story-item-container" key={userId}>
                  <div>
                    <img
                      src={storyUrl}
                      alt="user story"
                      className="story-image"
                    />
                  </div>
                  <p className="story-user-name">{userName}</p>
                </li>
              </ul>
            )
          })}
        </Slider>
      </>
    )
  }

  renderFailureView = () => (
    <div className="stories-error-view-container">
      <img
        src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656589/alert-triangle_hsre5i.svg"
        alt="failure view"
        className="posts-failure-img"
      />
      <p className="posts-failure-text">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        data-testid="button"
        className="profile-failure-button"
        onClick={this.getStoriesList}
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

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default StoriesSlider
