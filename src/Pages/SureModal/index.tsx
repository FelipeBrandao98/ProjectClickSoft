import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  CardBody,
  CardBodyText,
  CardButtonCancel,
  CardButtonCancelText,
  CardButtonConfirm,
  CardButtonConfirmText,
  CardeButtonArea,
  CardModal,
  CardTitle,
  CardTitleText,
  Container
} from './styles'

import AsyncStorage from '@react-native-community/async-storage'

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