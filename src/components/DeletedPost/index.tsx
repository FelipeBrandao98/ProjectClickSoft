import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

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

const DeletedPost: React.FC = (props) => {
  const { post, navigation }: any = props

  return (
    <>
      <PostContainer>
        <PostHeaderContainer>
          <PostTitleContainer>
            <PostTitle>Post Deletado</PostTitle>
          </PostTitleContainer>
          <PostDeleteButton>
            <TouchableOpacity onPress={() => navigation.navigate('SureModal', {
              postID: post.id,
              isDeleting: false
            })}>
              <Icon
                name="corner-up-left"
                size={30}
                color="#4a83b9"
              />
            </TouchableOpacity>
          </PostDeleteButton>
        </PostHeaderContainer>
      </PostContainer>
    </>
  )
}

export default DeletedPost