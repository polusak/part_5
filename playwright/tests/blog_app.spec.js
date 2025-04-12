const { test, expect, beforeEach, describe } = require('@playwright/test')

const sleep = ms => new Promise(r => setTimeout(r, ms))

const loginWith = async (page, username, password)  => {
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {
    name: /new blog/i,
    hidden: false
  }).click()
  await page.getByLabel(/title/i).fill(title)
  await page.getByLabel(/author/i).fill(author)
  await page.getByLabel(/url/i).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'testname',
        username: 'testusername',
        password: 'testpassword'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator1 = page.getByLabel(/username/i)
    const locator2 = page.getByLabel(/password/i)
    await expect(locator1).toBeVisible()
    await expect(locator2).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testusername')
      await page.getByRole('textbox').last().fill('testpassword')
      await page.getByRole('button', { name: 'login' }).click()
      const locator1 = page.getByLabel(/username/i)
      const locator2 = page.getByLabel(/password/i)
      await expect(locator1).toBeVisible()
      await expect(locator2).toBeVisible()
    })
  })
  describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blogTitle', 'author', 'url')
      await sleep(6000)
      await expect(page.getByTestId("visible_after_click")).toHaveText(/blogTitle/i)
    })
    test('the blog can be liked', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blogTitle', 'author', 'url')
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 0')).not.toBeVisible()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
    test('the blog can be deleted by the user who created it', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blogTitle', 'author', 'url')
      await page.getByLabel(/title/i).fill('title')
      await page.getByLabel(/author/i).fill('author')
      await page.getByLabel(/url/i).fill('url')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'remove' }).click()
      await sleep(6000)
      await expect(page.getByTestId("visible_before_click")).not.toHaveText(/blogTitle/i)
    })
    test('Only the user who created the blog can see the button for removal', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blogTitle', 'author', 'url')
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'testusername', 'testpassword')
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
    test.only('Blogs are ordered from most likes to least likes', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blog1', 'author1', 'url1')
      await page.getByLabel(/title/i).fill('blog2')
      await page.getByLabel(/author/i).fill('author2')
      await page.getByLabel(/url/i).fill('url2')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.getByRole('button', { name: 'view' }).last().click()
      await page.getByRole('button', { name: 'like' }).first().click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await expect(page.getByText('likes 0')).toBeVisible()
      await expect(page.getByTestId('author').first()).toHaveText(/author1/i)
      await expect(page.getByTestId('author').last()).toHaveText(/author2/i)
      await page.getByRole('button', { name: 'like' }).last().click()
      await sleep(1000)
      await page.getByRole('button', { name: 'like' }).last().click()
      await sleep(1000)
      await page.getByRole('button', { name: 'like' }).first().click()
      await sleep(1000)
      await expect(page.getByText('likes 3')).toBeVisible()
      await expect(page.getByText('likes 1')).toBeVisible()
      await expect(page.getByTestId('author').first()).toHaveText(/author2/i)
      await expect(page.getByTestId('author').last()).toHaveText(/author1/i)
    })
  })
})