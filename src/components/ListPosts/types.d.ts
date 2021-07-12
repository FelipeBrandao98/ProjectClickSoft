interface PostsData {
  userId: number
  id: number
  title: string
  body: string
  deleted?: string
}

interface PropsType {
  post: PostsData
  navigation: any
}