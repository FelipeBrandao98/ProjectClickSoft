import styled from "styled-components/native"

export const PostContainer = styled.View`
background-color: #FFF;
padding: 15px;
padding-left: 20px;
padding-right: 20px;
margin: 10px;
border-radius: 15px;
`

export const PostHeaderContainer = styled.View`
flex-direction: row;
justify-content: space-between;
`

export const PostTitleContainer = styled.View`
width: 80%;
`
export const PostTitle = styled.Text`
font-size: 20px;
font-weight: bold;
color: #705d5d;
`

export const PostDeleteButton = styled.View`
width: 30px;
height: 30px;
`

export const PostBody = styled.Text`
font-size: 14px;
color: #363636;
margin-top: 15px;
`

export const SeeUserButton = styled.View`
background-color: #7581b4;
border-radius: 15px;
height: 60px;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const SeeUserButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
color: #FFF;
`
