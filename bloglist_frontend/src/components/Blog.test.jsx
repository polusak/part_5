import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and not url or likes', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 500,
    id: 1,
    user: {id: '67ead06baa18fac20c677c97'}
  }

  const { container } = render(<Blog blog={blog}/>)

  const div1 = container.querySelector('.titleOnly')
  const div2 = container.querySelector('.contentHiddenBehindButtonClick')
  expect(div1).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')

})

const info1 = 'renders url, likes and user who added the blog'
const info2 = ' when view button is clicked, but not before'
test(`${info1}${info2}`, async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 500,
    id: 1,
    user: {id: '67ead06baa18fac20c677c97'}
  }
  
  const { container } = render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  expect(screen.getByRole('button', {
    name: /view/i
  })).toBeDefined()

  const button = screen.getByRole('button', {
    name: /view/i
  })
  const div1 = container.querySelector('.titleOnly')
  const div2 = container.querySelector('.contentHiddenBehindButtonClick')
  expect(div1).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
  await user.click(button)
  expect(div1).toHaveStyle('display: none')
  expect(div2).not.toHaveStyle('display: none')
})

test('renders 500 + 2 likes when button "like" -button is clicked twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 500,
    id: 1,
    user: {id: '67ead06baa18fac20c677c97'}
  }
  const addLike = vi.fn()
  render(<Blog blog={blog} addLike={addLike}/>)
  const user = userEvent.setup()
  const button = screen.getByRole('button', {
    name: /like/i,
    hidden: true
  })
  await user.click(button)
  await user.click(button)
  expect(addLike.mock.calls).toHaveLength(2)
})