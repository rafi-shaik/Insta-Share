import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, userData: {}}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/insta-share/users/${id}`
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
      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }
      //   console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        userData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
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
        onClick={this.getUserProfileData}
      >
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserData = () => {
    const {userData} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userId,
      userName,
      posts,
      stories,
    } = userData
    return (
      <div className="user-profile-posts-container">
        <div className="profile-mobile-details">
          <h1 className="profile-username">{userName}</h1>
          <div className="profile-mobile-header">
            <img src={profilePic} alt="user profile" className="profile-pic" />
            <ul className="profile-mobile-stats">
              <li className="profile-list-item">
                <span className="profile-span">{postsCount}</span>
                <br />
                posts
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followersCount}</span>
                <br />
                followers
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followingCount}</span>
                <br />
                following
              </li>
            </ul>
          </div>
          <p className="profile-userid">{userId}</p>
          <p className="profile-userbio">{userBio}</p>
        </div>
        <div className="profile-header">
          <img src={profilePic} alt="user profile" className="profile-pic" />
          <div className="profile-details-container">
            <h1 className="profile-username">{userName}</h1>
            <ul className="profile-details-list">
              <li className="profile-list-item">
                <span className="profile-span">{postsCount}</span> posts
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followersCount}</span> followers
              </li>
              <li className="profile-list-item">
                <span className="profile-span">{followingCount}</span> following
              </li>
            </ul>
            <p className="profile-userid">{userId}</p>
            <p className="profile-userbio">{userBio}</p>
          </div>
        </div>
        <ul className="profile-stories-container">
          {stories.map(each => (
            <li className="profile-story-item" key={each.id}>
              <img
                src={each.image}
                alt="user story"
                className="profile-story-image"
              />
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile-posts-header">
          <BsGrid3X3 className="profile-grid-icon" />
          <h1 className="profile-posts-heading">Posts</h1>
        </div>
        {postsCount > 0 ? (
          <ul className="profile-posts-container">
            {posts.map(eachPost => (
              <li className="profile-post-item" key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="user post"
                  className="profile-post-image"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="profile-no-posts-container">
            <BiCamera className="profile-camera-icon" />
            <p className="profile-no-posts-text">No Posts</p>
          </div>
        )}
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">{this.renderViews()}</div>
      </>
    )
  }
}

export default UserProfile
