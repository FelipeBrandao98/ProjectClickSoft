import React, { useEffect, useState } from 'react'
import { FlatList, Linking, ScrollView, TouchableOpacity } from 'react-native'
import {
  BackButtonContainer,
  CardContainer,
  CompanyBsBubble,
  CompanyBsBubbleText,
  CompanyBsContainer,
  CompanyCatchPhrase,
  CompanyContainer,
  CompanyName,
  Content,
  DataContainer,
  ImageBackground,
  ImageContainer,
  ImageText,
  LinkText,
  NameTitle,
  UserContainer,
  UserName,
  UserText,
  UserTitleText,
  MapView
} from './styles'
import Icon from 'react-native-vector-icons/Feather'
import MapboxGL from "@react-native-mapbox-gl/maps"

import api from '../../services/api'

// instance mapbox
MapboxGL.setAccessToken('pk.eyJ1IjoiZmVsaXBlNDg3IiwiYSI6ImNrcXZudXA4cDA0NXcyb3BqbHBmamV6anEifQ.Q_xOjogcxeTM1GNbNsi3KA')

const User = ({ route, navigation }: any) => {
  const [user, setUser] = useState([])

  const { userId } = route.params

  async function loadUser() {
    const response: userResponse = await api.get(`users?id=${userId}`)
    setUser([... user, ... response.data])
  }


  useEffect(()=> {
    loadUser()
  }, [])

  return (
    <UserContainer>
      <BackButtonContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={50}
            color="#7581b4"
          />
        </TouchableOpacity>
      </BackButtonContainer>

      <FlatList
        data={user}
        keyExtractor={(user: userData) => String(user.id)}
        renderItem={({item: user}) => (
          <>
            <UserName>{user.username}</UserName>
            <CardContainer>
              <Content>
                <ImageContainer>
                  <ImageBackground>
                    <ImageText>{user.name[0].toUpperCase()}</ImageText>
                  </ImageBackground>
                  <NameTitle>{user.name}</NameTitle>
                </ImageContainer>
                <DataContainer key={user.name}>
                </DataContainer>
                <DataContainer key={user.email}>
                  <UserTitleText>
                  <Icon
                    name="mail"
                    size={16}
                    color="#7581b4"
                  />
                  </UserTitleText>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:support@example.com')}
                  >
                    <LinkText>
                      {user.email}
                    </LinkText>
                  </TouchableOpacity>
                </DataContainer>
                <DataContainer key={user.phone}>
                  <UserTitleText>
                  <Icon
                    name="phone"
                    size={16}
                    color="#7581b4"
                  />
                  </UserTitleText>
                  <UserText>{user.phone}</UserText>
                </DataContainer>
                <DataContainer key={user.website}>
                  <UserTitleText>
                  <Icon
                    name="at-sign"
                    size={16}
                    color="#7581b4"
                  />
                  </UserTitleText>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`https://${user.website}`)}
                  >
                    <LinkText>{user.website}</LinkText>
                  </TouchableOpacity>
                </DataContainer>


                <NameTitle>Trabalho</NameTitle>
                <CompanyContainer>
                  <CompanyName>{user.company.name}</CompanyName>
                  <CompanyCatchPhrase>{user.company.catchPhrase}</CompanyCatchPhrase>
                  <CompanyBsContainer>
                    <ScrollView
                      alwaysBounceHorizontal={true}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {user.company.bs.split(' ').map(bs => {
                        return(
                        <CompanyBsBubble key={bs}>
                          <CompanyBsBubbleText>{bs}</CompanyBsBubbleText>  
                        </CompanyBsBubble>
                      )})}
                    </ScrollView>    
                  </CompanyBsContainer>
                </CompanyContainer>
              </Content>

              <MapView>
                <MapboxGL.MapView
                  styleURL={MapboxGL.StyleURL.Street}
                  zoomLevel={30}
                  centerCoordinate={[Number(user.address.geo.lat), Number(user.address.geo.lng)]}
                  style={{flex: 1}}
                >
                  <MapboxGL.Camera
                    zoomLevel={6}
                    centerCoordinate={[Number(user.address.geo.lat), Number(user.address.geo.lng)]}
                    animationMode={'flyTo'}
                    animationDuration={0}
                  >
                  </MapboxGL.Camera>
                </MapboxGL.MapView>
              </MapView>
            </CardContainer>
          </>
        )}
      />
    </UserContainer>
  )
}

export default User;