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