import AsyncStorage from '@react-native-community/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface PostsData {
  userId: number
  id: number
  title: string
  body: string
  deleted?: string
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #daece9;
  padding: 10px;
`
const CardModal = styled.View`
  height: 300px;
  width: 100%;
  background-color: #FFF;
  border-radius: 15px;
  justify-content: space-between;
  border: 1px solid #3333331a;
`

const CardTitle = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #3333331a;
`
const CardTitleText = styled.Text`
  font-size: 27px;
  color: #1f1f1f;
`

const CardBody = styled.View`
  width: 100%;
  margin-top: 15px;
  padding: 30px;
`

const CardBodyText = styled.Text`
  font-size: 18px;
  color: #5a5a5a;
  margin-bottom: 30px;
`

const CardeButtonArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
`

const CardButtonConfirm = styled.View`
  height: 60px;
  width: 155px;
  background-color: #7ec26d;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
`

const CardButtonConfirmText = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  line-height: 25px;
`

const CardButtonCancel = styled.View`
  height: 60px;
  width: 155px;
  background-color: #8f8f8f;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
`

const CardButtonCancelText = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  line-height: 25px;
`

const SureModal = ({route, navigation}) => {
  const { postID, isDeleting } = route.params

  async function undoDeletePost(postID: number) {
    const data = await AsyncStorage.getItem(`@Post:${postID}`)
    const [tratedData] = JSON.parse(data as string)

    const updatedData: PostsData = {
      id: tratedData.id,
      userId: tratedData.userId,
      title: tratedData.title,
      body: tratedData.body,
      deleted: 'false',
    }
    const assignableData = [updatedData]
    await AsyncStorage.setItem(`@Post:${postID}`, JSON.stringify(assignableData))
  }

  async function deletePost(postID: number) {
    console.log(`Deletou o post de id:${postID}`)
    const data = await AsyncStorage.getItem(`@Post:${postID}`)
    const [tratedData] = JSON.parse(data as string)
    const updatedData: PostsData = {
      id: tratedData.id,
      userId: tratedData.userId,
      title: tratedData.title,
      body: tratedData.body,
      deleted: 'true',
    }
    const assignableData = [updatedData]
    await AsyncStorage.removeItem(`@Post:${postID}`)
    await AsyncStorage.setItem(`@Post:${postID}`, JSON.stringify(assignableData))
  }

  return (
    <Container>
      <CardModal>
        <CardTitle>
          <CardTitleText>Atenção</CardTitleText>
        </CardTitle>
          <CardBody>
            <CardBodyText>Você tem certeza de que quer {isDeleting ? 'deletar' : 'restaurar'} este post?</CardBodyText>
          </CardBody>
          <CardeButtonArea>
            <TouchableOpacity onPress={() => {
              console.log(isDeleting)
              if (isDeleting == true) {
                deletePost(postID)
              }
              else if (isDeleting == false) {
                undoDeletePost(postID)
              }
              navigation.replace('Posts')
              }
            }>
              <CardButtonConfirm>
                <CardButtonConfirmText>Confirmar</CardButtonConfirmText>
              </CardButtonConfirm>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CardButtonCancel>
                <CardButtonCancelText>Cancelar</CardButtonCancelText>
              </CardButtonCancel>
            </TouchableOpacity>
          </CardeButtonArea>
      </CardModal>
    </Container>
  )
}

export default SureModal