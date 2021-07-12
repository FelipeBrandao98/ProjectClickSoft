interface PostsData {
  userId: number
  id: number
  title: string
  body: string
  deleted?: string
}

interface postsResponse {
  data: [PostsData]
}