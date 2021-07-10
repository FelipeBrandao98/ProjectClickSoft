import React, { useState, useEffect } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../services/api'

interface PostsData {
  userId: number
  id?: number
  title?: string
  body?: string
}

interface postsResponse {
  data: [PostsData]
}

const Container = styled.View`
  flex: 1;
  background-color: #daece9;
`

const PostContainer = styled.View`
  background-color: #FFF;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 15px;
  border-radius: 15px;
`

const PostHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const PostTitleContainer = styled.View`
  width: 80%;
`
const PostTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #705d5d;
`

const PostDeleteButton = styled.View`
  width: 30px;
  height: 30px;
`

const PostBody = styled.Text`
  font-size: 14px;
  color: #363636;
  margin-top: 15px;
`

const SeeUserButton = styled.View`
  background-color: #7581b4;
  border-radius: 15px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const SeeUserButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
`

const Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  async function loadPosts() {
    if (loading) {
        return
    }

    setLoading(true)
    const response: postsResponse = await api.get(`posts?id=${page}`)
    setPosts([... posts, ... response.data])
    setPage(page + 1)
    setLoading(false)
  }

  function deletePost(postID: number) {
    console.log(`Deletou o post de id:${postID}`)
  }

  useEffect(()=> {
    loadPosts()
  }, [])
  
  return (
    <Container>
      <FlatList
        data={posts}
        onEndReached={loadPosts}
        keyExtractor={(post: PostsData) => String(post.id)}
        renderItem={({item: posts}) => (
          <PostContainer>
            <PostHeaderContainer>
              <PostTitleContainer>
                <PostTitle>{posts.title}</PostTitle>
              </PostTitleContainer>
              <PostDeleteButton>
                <TouchableOpacity onPress={() => {deletePost(posts.id as number)}}>
                  <Icon
                    name="trash"
                    size={30}
                    color="#b94a4a"
                  />
                </TouchableOpacity>
              </PostDeleteButton>
            </PostHeaderContainer>
            
            <PostBody>{posts.body}</PostBody>
            <TouchableOpacity onPress={() => navigation.navigate('User', {userId: posts.userId})}>
              <SeeUserButton>
                <SeeUserButtonText>Sobre o Autor</SeeUserButtonText>
              </SeeUserButton>
            </TouchableOpacity>
          </PostContainer>
        )}

      />
    </Container>)
}

export default Posts