import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

interface PostsData {
  userId: number
  id: number
  title: string
  body: string
  deleted?: string
}

const PostContainer = styled.View`
  background-color: #FFF;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 10px;
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

const post: React.FC = (props) => {
  const { post, navigation }: any = props

  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostTitleContainer>
          <PostTitle>{post.title}</PostTitle>
        </PostTitleContainer>
        <PostDeleteButton>
          <TouchableOpacity onPress={() => navigation.navigate('SureModal', {
            postID: post.id,
            isDeleting: true
            }
          )}>
            <Icon
              name="trash"
              size={30}
              color="#b94a4a"
            />
          </TouchableOpacity>
        </PostDeleteButton>
      </PostHeaderContainer>
      
      <PostBody>{post.body}</PostBody>
      <TouchableOpacity onPress={() => navigation.navigate('User', {userId: post.userId})}>
        <SeeUserButton>
          <SeeUserButtonText>Sobre o Autor</SeeUserButtonText>
        </SeeUserButton>
      </TouchableOpacity>
    </PostContainer>
  )
}

export default post