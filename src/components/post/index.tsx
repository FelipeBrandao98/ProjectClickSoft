import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  PostBody,
  PostContainer,
  PostDeleteButton,
  PostHeaderContainer,
  PostTitle,
  PostTitleContainer,
  SeeUserButton,
  SeeUserButtonText
} from './styles'
import Icon from 'react-native-vector-icons/Feather'

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