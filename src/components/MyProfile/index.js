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

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, userData: {}}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
      //   console.log(data)
      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        posts: data.profile.posts,
        stories: data.profile.stories,
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
          <img src={profilePic} alt="my profile" className="profile-pic" />
          <div className="profile-details-container">
            <h1 className="profile-username">{userName}</h1>
            <div className="profile-details-list">
              <p className="profile-list-item">
                <span className="profile-span">{postsCount}</span> posts
              </p>
              <p className="profile-list-item">
                <span className="profile-span">{followersCount}</span> followers
              </p>
              <p className="profile-list-item">
                <span className="profile-span">{followingCount}</span> following
              </p>
            </div>
            <p className="profile-userid">{userId}</p>
            <p className="profile-user-bio">{userBio}</p>
          </div>
        </div>
        <ul className="profile-stories-container">
          {stories.map(each => (
            <li className="profile-story-item" key={each.id}>
              <img
                src={each.image}
                alt="my story"
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
                  alt="my post"
                  className="profile-post-image"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="profile-no-posts-container">
            <BiCamera className="profile-camera-icon" />
            <h1 className="profile-no-posts-text">No Posts</h1>
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

export default MyProfile
