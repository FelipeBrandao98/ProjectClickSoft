import styled from "styled-components/native"

export const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
background-color: #daece9;
padding: 10px;
`
export const CardModal = styled.View`
height: 300px;
width: 100%;
background-color: #FFF;
border-radius: 15px;
justify-content: space-between;
border: 1px solid #3333331a;
`

export const CardTitle = styled.View`
width: 100%;
height: 60px;
align-items: center;
justify-content: center;
border-bottom-width: 1px;
border-bottom-color: #3333331a;
`
export const CardTitleText = styled.Text`
font-size: 27px;
color: #1f1f1f;
`

export const CardBody = styled.View`
width: 100%;
margin-top: 15px;
padding: 30px;
`

export const CardBodyText = styled.Text`
font-size: 18px;
color: #5a5a5a;
margin-bottom: 30px;
`

export const CardeButtonArea = styled.View`
flex-direction: row;
justify-content: space-between;
padding-bottom: 20px;
padding-right: 20px;
padding-left: 20px;
`

export const CardButtonConfirm = styled.View`
height: 60px;
width: 155px;
background-color: #7ec26d;
justify-content: center;
align-items: center;
border-radius: 14px;
`

export const CardButtonConfirmText = styled.Text`
font-size: 20px;
color: #ffffff;
font-weight: bold;
line-height: 25px;
`

export const CardButtonCancel = styled.View`
height: 60px;
width: 155px;
background-color: #8f8f8f;
justify-content: center;
align-items: center;
border-radius: 14px;
`

export const CardButtonCancelText = styled.Text`
font-size: 20px;
color: #ffffff;
font-weight: bold;
line-height: 25px;
`
