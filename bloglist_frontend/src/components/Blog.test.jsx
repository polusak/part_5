import { render, screen } from '@testing-library/react'
import  Blog from './blog'
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

  render(<Blog blog={blog} />)

  const title = screen.getByText('title')
  const url = screen.queryByText('url')
  const likes = screen.queryByText('likes')
  expect(title).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
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