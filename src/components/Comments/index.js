import {Component} from 'react'

import {formatDistanceToNow} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
    count: 0,
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const generateRandomColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const initialClassNames = `profile-img ${generateRandomColor}`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      formatDistanceTime: formatDistanceToNow(new Date()),
      profileClassNames: initialClassNames,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
      count: prevState.count + 1,
    }))
  }

  toggledIsLiked = id => {
    const {commentsList} = this.state
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList, count} = this.state
    const filteredList = commentsList.filter(eachItem => eachItem.id !== id)
    this.setState({commentsList: filteredList})
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  render() {
    const {nameInput, commentInput, commentsList, count} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="heading col-12">Comments</h1>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="col-12 d-md-none d-inline"
              />
              <div className="w-90">
                <p className="para">Say something about 4.0 Technologies</p>
                <form onSubmit={this.addComment}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input form-control"
                    value={nameInput}
                    onChange={this.onChangeName}
                  />
                  <textarea
                    rows="5"
                    cols="45"
                    className="form-control"
                    onChange={this.onChangeComment}
                    value={commentInput}
                  />
                  <button type="submit" className="button">
                    Add Comment
                  </button>
                </form>
              </div>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="col-md-6 d-none d-md-inline"
              alt="comments"
            />
            <div className="comments-container col-12 col-md-12">
              <div className="d-flex pt-3">
                <button type="button" className="total-comments">
                  {count}
                </button>
                <p className="comment">Comments</p>
              </div>
              <ul type="none" className="pl-0">
                {commentsList.map(item => (
                  <CommentItem
                    commentDetails={item}
                    toggledIsLiked={this.toggledIsLiked}
                    onDeleteComment={this.onDeleteComment}
                    key={item.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Comments
