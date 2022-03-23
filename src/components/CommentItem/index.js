import './index.css'

const CommentItem = props => {
  const {commentDetails, toggledIsLiked, onDeleteComment} = props
  const {
    id,
    name,
    comment,
    isLiked,
    formatDistanceTime,
    profileClassNames,
  } = commentDetails
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likedClassNames = isLiked ? 'like-button-active' : 'like-button'

  const onClickLikeContainer = () => {
    toggledIsLiked(id)
  }

  const onClickDeleteIcon = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-item-container">
      <div className="comment-item">
        <p className={profileClassNames}>{name[0]}</p>
        <div>
          <div className="d-flex mt-1">
            <h1 className="person-name">{name}</h1>
            <p className="comment-time">{formatDistanceTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <img src={likeImgUrl} className="like-icon" alt="like" />
          <button
            type="button"
            className={`like-button ${likedClassNames}`}
            onClick={onClickLikeContainer}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDeleteIcon}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
