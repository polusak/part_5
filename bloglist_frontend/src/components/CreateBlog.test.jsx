import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'


const info1 = '<CreateBlog /> calls the creating function'
const info2 =  'with correct info when blog is created'
test(`${info1}${info2}`, async () => {
  const user = userEvent.setup()
  const handleCreation = vi.fn()

  render(<CreateBlog handleCreation={handleCreation} />)

  const titleInput = screen.getByRole('textbox', {
    name: /title/i,
    hidden: false
  })
  const authorInput = screen.getByRole('textbox', {
    name: /author/i,
    hidden: false
  })
  const urlInput = screen.getByRole('textbox', {
    name: /url/i,
    hidden: false
  })

  const button = screen.getByRole('button', {
    name: /create/i,
    hidden: false
  })

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'url')
  await user.click(button)

  expect(handleCreation.mock.calls).toHaveLength(1)
  expect(handleCreation.mock.calls[0][0]).toBe('title')
  expect(handleCreation.mock.calls[0][1]).toBe('author')
  expect(handleCreation.mock.calls[0][2]).toBe('url')
})