import React from 'react'

import user2 from '../assets/user2.svg'

function Comment({ comment }) {
  return (
    <div className="comment">
      <img src={comment.author.avatar} className="avatar" />
      <p>
        <strong>{comment.author.name}</strong> {comment.content}
      </p>
    </div>
  )
}

export default Comment
