import React, { Component } from 'react'

import Post from './Post'

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Julio Alcantara',
          avatar: '',
        },
        date: '04 Jun 2019',
        content: 'Pessoal, alguém save se a Rocketseat está contratando?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: '',
            },
            content: 'Conteúdo do comentário',
          },
        ],
      },
      {
        id: 2,
        author: {
          name: 'Julio Alcantara',
          avatar: '',
        },
        date: '04 Jun 2019',
        content: 'Pessoal, alguém save se a Rocketseat está contratando?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: '',
            },
            content: 'Conteúdo do comentário',
          },
        ],
      },
    ],
  }

  render() {
    return (
      <ul>
        <Post />
      </ul>
    )
  }
}

export default PostList
