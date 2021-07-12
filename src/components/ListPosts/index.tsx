import React from 'react';

// Componentes
import DeletedPost from '../DeletedPost';
import Post from '../Post';

const ListPosts = (props: PropsType) => {
  const { post, navigation } = props

  if (post.deleted == 'true') {
    return (
      <DeletedPost post={post} navigation={navigation}/>
    )
  }
  else {
    return (
      <Post post={post} navigation={navigation}/>
    )
  }
}

export default ListPosts