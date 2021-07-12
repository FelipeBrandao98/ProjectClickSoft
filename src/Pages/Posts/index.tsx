import React, { useState, useEffect } from 'react'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'

// Components
import ListPosts from '../../components/ListPosts'


// Types
interface PostsData {
  userId: number
  id: number
  title: string
  body: string
  deleted?: string
}

interface postsResponse {
  data: [PostsData]
}


// Styles
const Container = styled.View`
  flex: 1;
  background-color: #daece9;
`

const ButtonAddPostContainer = styled.View`
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-top-width: 1px;
  border-top-color: #6161611a;
`

const ButtonAddPost = styled.View`
  height: 60px;
  width: 60%;
  background-color: #7ec26d;
  justify-content: space-around;
  align-items: center;
  border-radius: 14px;
  flex-direction: row;
`

const PlusButton = styled.View`
  height: 25px;
  width: 25px;
  border: 1.5px solid #FFF;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`

const ButtonAddPostText = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  line-height: 25px;
`

const Posts = ({ navigation }: any) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function loadPosts() {
    if (loading) {
        return
    }

    setLoading(true)
    
    const data = await AsyncStorage.getItem(`@Post:${page}`)

    if (data == null) {
      const response: postsResponse = await api.get(`posts?id=${page}`)

      let [ dataFromApi ] = response.data

      const updatedData = {
        id: dataFromApi.id,
        userId: dataFromApi.userId,
        title: dataFromApi.title,
        body: dataFromApi.body,
        deleted: 'false',
      }

      const assignableData = [updatedData]

      await AsyncStorage.setItem(`@Post:${page}`, JSON.stringify(assignableData))

      setPosts([... posts, ... assignableData])
    }

    else {
      setPosts([... posts, ... JSON.parse(data)])
    }

    setPage(page + 1)
    setLoading(false)
  }

  const refresh = () => {
    setIsRefreshing(true)
    navigation.replace('Posts')
    setIsRefreshing(false)
    console.log('refresh')
  }

  useEffect(()=> {
    loadPosts()
  }, [])
  
  return (
    <Container>
      <FlatList
        data={posts}
        extraData={loading}
        keyExtractor={(post: PostsData) => String(post.id)}
        renderItem={({item: post}) => <ListPosts post={post} navigation={navigation} key={post.id}/>}
        onEndReached={loadPosts}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh}/>}
      />

      <ButtonAddPostContainer>
        <TouchableOpacity onPress={async () => {
          navigation.navigate('NewPost')
          }
        }>
          <ButtonAddPost>
            <PlusButton>
              <Icon
                name="plus"
                size={20}
                color="#FFF"
              />
            </PlusButton>
            <ButtonAddPostText>Nova Postagem</ButtonAddPostText>
          </ButtonAddPost>
        </TouchableOpacity>
      </ButtonAddPostContainer>
    </Container>)
}

export default Posts