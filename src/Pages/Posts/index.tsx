import React, { useState, useEffect } from 'react'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import {
  ButtonAddPost,
  ButtonAddPostContainer,
  ButtonAddPostText,
  Container,
  PlusButton
} from './styles'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'

import ListPosts from '../../components/ListPosts'

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