import React from 'react'

import Comment from './Comment'

function Post({ post }) {
  const baseUrl = '../assets'

  return (
    <li className="post-item">
      <div className="post-user">
        <img src={post.author.avatar} className="avatar" />

        <div className="post-dados">
          <p>{post.author.name}</p>
          <small>{post.date}</small>
        </div>
      </div>

      <p>{post.content}</p>
      <hr />
      {post.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </li>
  )
}

export default Post
