export interface Todo {
  id: number
  text: string
  done: boolean
  created_at?: string // Optional if coming from DB
}