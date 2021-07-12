import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { useAsyncStorage } from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'

const BackButtonContainer = styled.View`
  width: 50px;
  margin: 12px;
`

const NewPostContainer = styled.View`
  flex: 1;
  background-color: #daece9;
`

const Container = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
`

const CardContainer = styled.View`
  margin-top: 50px;
  background-color: #FFF;
  border-radius: 15px;
  flex: 1;
  width: 100%;
  padding: 10px;
`

const TitleInputArea = styled.View`
  border-bottom-color: #74747421;
  border-bottom-width: 1px;
  background-color: #c4c4c41f;
  border-radius: 15px;
  margin-bottom: 13px;
`

const SendButtonContainer = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
`

const SendButton = styled.View`
  background-color: #7581b4;
  border-radius: 15px;
  flex: 1;
  margin: 15px;
  align-items: center;
  justify-content: center;
  border: 2px solid #636e9b;
`

const SendButtonText = styled.Text`
  font-size: 18px;
  color: #FFF;
  margin-left: 20px;
  margin-right: 20px;
`

const NewPost = ({ navigation }) => {
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