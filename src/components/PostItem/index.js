import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

class PostItem extends Component {
  constructor(props) {
    super(props)
    const {details} = this.props
    const {likesCount} = details
    this.state = {
      isLiked: false,
      likes: likesCount,
    }
  }

  likePost = async () => {
    const {details} = this.props
    const {postId} = details
    const likeStatus = {like_status: true}
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState(prev => ({isLiked: !prev.isLiked, likes: prev.likes + 1}))
    }
  }

  unLikePost = async () => {
    const {details} = this.props
    const {postId} = details
    const likeStatus = {like_status: false}
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState(prev => ({isLiked: !prev.isLiked, likes: prev.likes - 1}))
    }
  }

  render() {
    const {details} = this.props
    const {
      postDetails,
      comments,
      createdAt,
      postId,
      profilePic,
      userId,
      userName,
    } = details
    const {imageUrl, caption} = postDetails
    const {isLiked, likes} = this.state
    return (
      <div className="post-item-container">
        <div className="post-item-header">
          <img
            src={profilePic}
            alt="post author profile"
            className="post-item-profile-pic"
          />
          <Link to={`/users/${userId}`} className="post-item-link">
            <p className="post-item-user-name">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="post-item-main-image" />
        <div className="post-item-text">
          <div className="post-item-icons-container">
            {isLiked ? (
              <button
                onClick={this.unLikePost}
                className="post-item-like-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="unLikeIcon"
                type="button"
              >
                <FcLike className="like-icon" />
              </button>
            ) : (
              <button
                onClick={this.likePost}
                className="post-item-like-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="likeIcon"
                type="button"
              >
                <BsHeart className="unlike-icon" />
              </button>
            )}
            <FaRegComment className="post-item-icon" />
            <BiShareAlt className="post-item-icon" />
          </div>
          <h1 className="post-item-likes">{likes} likes</h1>
          <p className="post-item-caption">{caption}</p>
          <ul className="comments-list-container">
            {comments.map(each => (
              <li className="comment-item" key={each.userId}>
                <span className="comment-username">{each.userName}</span>{' '}
                {each.comment}
              </li>
            ))}
          </ul>
          <p className="post-item-time">{createdAt}</p>
        </div>
      </div>
    )
  }
}

export default PostItem
