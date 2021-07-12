import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import {
  BackButtonContainer,
  CardContainer,
  Container,
  NewPostContainer,
  SendButton,
  SendButtonContainer,
  SendButtonText,
  TitleInputArea
} from './styles'

import Icon from 'react-native-vector-icons/Feather'

import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'

const NewPost = ({ navigation }: any) => {
  const [title, onChangeTitle] = useState('')
  const [body, onChangeBody] = useState('')

  return (
    <>
      <NewPostContainer>
        <KeyboardAvoidingView
          behavior='position'
          contentContainerStyle={{height: 670}}
          enabled
        >
          <BackButtonContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                size={50}
                color="#7581b4" />
            </TouchableOpacity>
          </BackButtonContainer>
        
          <Container>
            <CardContainer>
              <SafeAreaView>
                <TitleInputArea>
                  <TextInput 
                    onChange={onChangeTitle}
                    value={title}
                    placeholder="Título"
                    style={{padding: 15}}
                  />
                </TitleInputArea>
                <TextInput 
                  onChange={onChangeBody}
                  value={body}
                  placeholder="Diga alguma coisa aqui!"
                  style={{
                    height: 300,
                    borderWidth: 1,
                    borderColor: '#74747421',
                    borderRadius: 15,
                    padding: 15,
                    textAlignVertical: 'top'
                  }}
                  maxLength={300}
                />
                <SendButtonContainer>
                  <TouchableOpacity onPress={async () => {
                    console.log({
                      id: 100,
                      userId: 2,
                      title,
                      body
                    })
                  }}>
                    <SendButton>
                      <SendButtonText>Adicionar postagem</SendButtonText>
                    </SendButton>
                  </TouchableOpacity>
                </SendButtonContainer>
              </SafeAreaView>
            </CardContainer>
          </Container>
        </KeyboardAvoidingView>
      </NewPostContainer>
    </>
  )
}

export default NewPost;