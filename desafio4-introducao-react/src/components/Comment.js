import React from 'react'

function Comment({ comment }) {
  const image = 'src/assets/' + comment.author.avatar

  return (
    <div className="comment">
      <img src={image} className="avatar" />
      <p>
        <strong>{comment.author.name}</strong> {comment.content}
      </p>
    </div>
  )
}

export default Comment
