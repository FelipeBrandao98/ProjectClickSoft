import React from 'react'

interface PostsData {
  userId: number
  id: number
  title: string
  body: string
}

const PostContainer = styled.View`
  background-color: #FFF;
  height: 100px;
  align-items: center;
  padding: 10px;
  margin: 15px;
  border-radius: 15px;
`

const PostTitleContainer = styled.View`
  font-size: 16px;
  width: 80%;
`
const PostTitle = styled.Text`
  font-size: 18px;
  color: #363636;
`
const PostBody = styled.Text`
  font-size: 14px;
  color: #363636;
`

const Post: React.FC = (post: PostsData): PostsData => {
  return (
    <PostContainer>
      <PostTitleContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostBody>{post.body}</PostBody>
      </PostTitleContainer>
    </PostContainer>
  )
}

export default Post;