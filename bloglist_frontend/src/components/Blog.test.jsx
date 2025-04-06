import { render, screen } from '@testing-library/react'
import  Blog from './blog'

test('renders title and not url or likes', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 500,
    id: 1,
    user: 2
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('title')
  const url = screen.queryByText('url')
  const likes = screen.queryByText('likes')
  expect(title).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})