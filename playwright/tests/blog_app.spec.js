const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testusername')
      await page.getByRole('textbox').last().fill('testpassword')
      const locator1 = page.getByLabel(/username/i)
      const locator2 = page.getByLabel(/password/i)
      await expect(locator1).toBeVisible()
      await expect(locator2).toBeVisible()
    })
  })
})