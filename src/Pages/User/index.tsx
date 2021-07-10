import React, { useEffect, useState } from 'react'
import { FlatList, Linking, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
// Importa o mapbox
import MapboxGL from "@react-native-mapbox-gl/maps"

import api from '../../services/api'

// instancia o mapbox
MapboxGL.setAccessToken('pk.eyJ1IjoiZmVsaXBlNDg3IiwiYSI6ImNrcXZudXA4cDA0NXcyb3BqbHBmamV6anEifQ.Q_xOjogcxeTM1GNbNsi3KA')

interface geo {
  lat: number
  lng: number
}

interface company {
  name: string
  catchPhrase: string
  bs: string
}

interface address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: geo
}

interface userData {
  id: number
  name: string
  username: string
  email: string
  address: address
  phone: string
  website: string
  company: company
}

interface userResponse {
  data: [userData]
}

const BackButtonContainer = styled.View`
  width: 50px;
  margin: 12px;
`

const UserContainer = styled.View`
  flex: 1;
  background-color: #daece9;
`

const CardContainer = styled.View`
  background-color: #FFF;
  height: 100%;
  padding-top: 30px;
  margin: 27px;
  border-radius: 15px;
`

const ImageContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
`

const ImageBackground = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #9e9e9e;
  justify-content: center;
  align-content: center;
`
const ImageText = styled.Text`
  font-size: 60px;
  font-weight: bold;
  color: #FFF;
  width: 100%;
  margin-left: 100px;
  transform: translateX(-19px);
`

const NameTitle = styled.Text`
  font-size: 26px;
  color: #4a4c50;
  margin-top: 20px;
`

const DataContainer = styled.View`
  flex-direction: row;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 4px;
  justify-content: flex-start;
`

const Content = styled.View`
  padding: 20px;
  margin-bottom: 30px;
`

const UserTitleText = styled.Text`
  font-size: 16px;
  color: #5a5959;
`
const UserText = styled.Text`
  margin-left: 10px;
`

const UserName = styled.Text`
  font-size: 50px;
  margin-left: 50px;
  margin-bottom: 8px;
  color: #7581b4;
  font-weight: bold;
`

const LinkText = styled.Text`
  color: #c57d7d;
  text-decoration: underline;
  margin-left: 10px;
`

const CompanyContainer = styled.View`
  margin-top: 10px;
  margin-left: 30px;
`

const CompanyName = styled.Text`
  font-size: 18px;
  margin-bottom: 3px;
`
const CompanyCatchPhrase = styled.Text`
  font-size: 16px;
  color: #616161;
  margin-bottom: 11px;
`
const CompanyBsContainer = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  flex-direction: row;
`

const CompanyBsBubble = styled.View`
  background-color: #8d47c7;
  padding: 10px;
  border-radius: 18px;
  width: auto;
  margin-right: 10px;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`

const CompanyBsBubbleText = styled.Text`
  font-size: 14px;
  color: #FFF;
`

const MapView = styled.View`
  flex: 2;
  width: 100%;
  height: 200px;
`

const User = ({ route, navigation }) => {
  const [user, setUser] = useState([])
  const [coordinates, setCoordinates] = useState([])

  const { userId } = route.params

  async function loadUser() {
    const response: userResponse = await api.get(`users?id=${userId}`)

    setUser([... user, ... response.data])
  }

  function getCoordinateNumber(coordinate) {
    const lat = convertCoordinatesStringToNumber(user.address.geo.lat)
    const lng = convertCoordinatesStringToNumber(user.address.geo.lng)

    setCoordinates({
      lat,
      lng
    })
  }

  function convertCoordinatesStringToNumber(coordinate) {
    if (coordinate[0] === '-') {
      const newCoordinate = coordinate.substr(1)
      coordinate = Number(newCoordinate)
      coordinate = coordinate * -1
      return coordinate
    }
    else {
      coordinate = Number(coordinate)
      return coordinate
    }
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
                        <CompanyBsBubble>
                          <CompanyBsBubbleText>{bs}</CompanyBsBubbleText>  
                        </CompanyBsBubble>
                      )})}
                    </ScrollView>    
                  </CompanyBsContainer>
                </CompanyContainer>
              </Content>

              
              <MapView>
                <MapboxGL.MapView
                  styleURL={MapboxGL.StyleURL.Dark}
                  style={{flex: 1}}>
                    <MapboxGL.Camera
                      zoomLevel={6}
                      centerCoordinate={[coordinates.lat, coordinates.lng]}
                      animationMode={'flyTo'}
                      animationDuration={2}
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