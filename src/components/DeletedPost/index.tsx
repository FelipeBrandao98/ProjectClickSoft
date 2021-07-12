import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  PostContainer,
  PostDeleteButton,
  PostHeaderContainer,
  PostTitle,
  PostTitleContainer
} from './styles'
import Icon from 'react-native-vector-icons/Feather'

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