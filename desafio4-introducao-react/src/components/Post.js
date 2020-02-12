import React from 'react'

import Comment from './Comment'

import user1 from '../assets/user1.svg'

function Post() {
  return (
    <li class="post-item">
      <div class="post-user">
        <img src={user1} alt="Usuário 1" />

        <div class="post-dados">
          <p>Júlio Alcantara</p>
          <small>04 Jun 2019</small>
        </div>
      </div>

      <p>Pessoal, alguém sabe se a Rocketseat está contratando?</p>
      <hr />
      <Comment />
    </li>
  )
}

export default Post
