import React from 'react'

function Post({ post }) {
  return (
    <li className="post-list-item" key={post.id}>
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
          <li key={comment.id}>
            <div className="comment-list-item">
              <img className="avatar" src={comment.author.avatar} />

              <p>
                <strong>{comment.author.name}</strong> {comment.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Post
