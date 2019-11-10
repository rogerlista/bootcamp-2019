import React from 'react'

import Comment from './comment'

function Post({ post }) {
  return (
    <li className="post-list-item">
      <div className="post-list-item-avatar-author">
        <img className="avatar" src={post.author.avatar} />

        <div className="post-list-item-author">
          <strong>{post.author.name}</strong>
          <span>{post.date}</span>
        </div>
      </div>

      <p>{post.content}</p>

      <hr />

      <ul className="comment-list">
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </li>
  )
}

export default Post
