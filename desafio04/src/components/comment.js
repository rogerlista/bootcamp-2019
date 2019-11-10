import React from 'react'

function Comment({ comment }) {
  return (
    <li>
      <div className="comment-list-item">
        <img className="avatar" src={comment.author.avatar} />

        <p>
          <strong>{comment.author.name}</strong> {comment.content}
        </p>
      </div>
    </li>
  )
}

export default Comment
