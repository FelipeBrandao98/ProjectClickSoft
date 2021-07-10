import React, { useEffect, useState } from 'react'
import { FlatList, Linking, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'

const BackButtonContainer = styled.View`
  width: 50px;
  margin: 12px;
`

const NewPostContainer = styled.View`
  flex: 1;
  background-color: #daece9;
`

const NewPost = ({ navigation }) => {

  return (
    <NewPostContainer>
      <BackButtonContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={50}
            color="#7581b4"
          />
        </TouchableOpacity>
      </BackButtonContainer>
    </NewPostContainer>
  )
}

export default NewPost;