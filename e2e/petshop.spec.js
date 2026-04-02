// @ts-check
import { test, expect } from '@playwright/test'

const BASE = '/petshop/'

test.describe('Homepage', () => {
  test('loads with correct title and hero section', async ({ page }) => {
    await page.goto(BASE)
    await expect(page).toHaveTitle(/PawsPlace/i)
    await expect(page.getByRole('banner')).toContainText('PawsPlace')
    await expect(page.getByRole('heading', { name: /Our Pets/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Browse by Category/i })).toBeVisible()
  })

  test('navigation links are present', async ({ page }) => {
    await page.goto(BASE)
    const nav = page.getByLabel('Primary navigation')
    await expect(nav.getByRole('link', { name: 'Our Pets' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  test('skip link is present', async ({ page }) => {
    await page.goto(BASE)
    const skipLink = page.getByRole('link', { name: /Skip to main content/i })
    await expect(skipLink).toBeAttached()
  })
})

test.describe('Category Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  test('shows all pets by default', async ({ page }) => {
    const petCards = page.locator('.pet-card')
    await expect(petCards).toHaveCount(12)
  })

  test('filters pets by Dogs category', async ({ page }) => {
    await page.getByRole('button', { name: /Dogs/i }).click()
    const petCards = page.locator('.pet-card')
    // Buddy, Max, Rocky are dogs
    await expect(petCards).toHaveCount(3)
    for (const card of await petCards.all()) {
      await expect(card.locator('.pet-card-breed')).toBeVisible()
    }
  })

  test('filters pets by Cats category', async ({ page }) => {
    await page.getByRole('button', { name: /Cats/i }).click()
    const petCards = page.locator('.pet-card')
    // Luna, Whiskers, Bella are cats
    await expect(petCards).toHaveCount(3)
  })

  test('filters pets by Rabbits category', async ({ page }) => {
    await page.getByRole('button', { name: /Rabbits/i }).click()
    const petCards = page.locator('.pet-card')
    // Thumper, Coco are rabbits
    await expect(petCards).toHaveCount(2)
  })

  test('filters pets by Birds category', async ({ page }) => {
    await page.getByRole('button', { name: /Birds/i }).click()
    const petCards = page.locator('.pet-card')
    // Sunny, Tweety are birds
    await expect(petCards).toHaveCount(2)
  })

  test('filters pets by Fish category', async ({ page }) => {
    await page.getByRole('button', { name: 'Fish', exact: true }).click()
    const petCards = page.locator('.pet-card')
    // Nemo, Goldie are fish
    await expect(petCards).toHaveCount(2)
  })

  test('active category button has pressed state', async ({ page }) => {
    const dogsBtn = page.getByRole('button', { name: /Dogs/i })
    await dogsBtn.click()
    await expect(dogsBtn).toHaveAttribute('aria-pressed', 'true')
  })

  test('switching back to All Pets shows all 12 pets', async ({ page }) => {
    await page.getByRole('button', { name: /Dogs/i }).click()
    await page.getByRole('button', { name: /All Pets/i }).click()
    await expect(page.locator('.pet-card')).toHaveCount(12)
  })
})

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  test('cart starts empty with count 0', async ({ page }) => {
    const cartBtn = page.locator('.cart-btn')
    await expect(cartBtn).toContainText('0')
  })

  test('add an available pet to cart', async ({ page }) => {
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    const cartBtn = page.locator('.cart-btn')
    await expect(cartBtn).toContainText('1')
  })

  test('open cart dialog after adding a pet', async ({ page }) => {
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    await page.locator('.cart-btn').click()
    const dialog = page.getByRole('dialog', { name: /Shopping Cart/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('Buddy')).toBeVisible()
    await expect(dialog.locator('.cart-item-price')).toContainText('$850')
  })

  test('close cart dialog with close button', async ({ page }) => {
    await page.locator('.cart-btn').click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('button', { name: /Close shopping cart/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('close cart dialog by pressing Escape', async ({ page }) => {
    await page.locator('.cart-btn').click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('empty cart shows empty message', async ({ page }) => {
    await page.locator('.cart-btn').click()
    await expect(page.getByText('Your cart is empty.')).toBeVisible()
  })

  test('remove a pet from the cart', async ({ page }) => {
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    await page.locator('.cart-btn').click()
    await page.getByRole('button', { name: /Remove Buddy from cart/i }).click()
    await expect(page.getByText('Your cart is empty.')).toBeVisible()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('cart total updates correctly after adding multiple pets', async ({ page }) => {
    // Buddy $850 + Nemo $95 = $945
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    await page.getByRole('button', { name: /Add Nemo the Clownfish to cart/i }).click()
    await page.locator('.cart-btn').click()
    const dialog = page.getByRole('dialog', { name: /Shopping Cart/i })
    await expect(dialog.getByText('$945.00')).toBeVisible()
    await dialog.getByRole('button', { name: /Close shopping cart/i }).click()
    await expect(page.locator('.cart-btn')).toContainText('2')
  })

  test('same pet cannot be added to cart twice', async ({ page }) => {
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    const cartBtn = page.locator('.cart-btn')
    await expect(cartBtn).toContainText('1')
  })
})

test.describe('Reserved Pets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  test('reserved pet shows Reserved badge', async ({ page }) => {
    // Whiskers (id=7) is reserved - filter by Cats to find it
    await page.getByRole('button', { name: /Cats/i }).click()
    const whiskers = page.locator('.pet-card').filter({ hasText: 'Whiskers' })
    await expect(whiskers.locator('.pet-badge--reserved')).toBeVisible()
  })

  test('reserved pet Add to Cart button is disabled', async ({ page }) => {
    await page.getByRole('button', { name: /Cats/i }).click()
    const whiskers = page.locator('.pet-card').filter({ hasText: 'Whiskers' })
    const addBtn = whiskers.locator('.pet-card-footer button')
    await expect(addBtn).toBeDisabled()
  })

  test('clicking reserved pet button does not add it to cart', async ({ page }) => {
    await page.getByRole('button', { name: /Cats/i }).click()
    // Force-click the disabled button
    const whiskers = page.locator('.pet-card').filter({ hasText: 'Whiskers' })
    const addBtn = whiskers.locator('.pet-card-footer button')
    await addBtn.click({ force: true })
    await expect(page.locator('.cart-btn')).toContainText('0')
  })
})

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
  })

  test('successful checkout clears cart and closes dialog', async ({ page }) => {
    await page.getByRole('button', { name: /Add Buddy the Golden Retriever to cart/i }).click()
    await page.locator('.cart-btn').click()
    await page.getByRole('button', { name: /Checkout/i }).click()
    // Dialog closes and cart is cleared
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.locator('.cart-btn')).toContainText('0')
  })

  test('checkout on empty cart does not close the dialog', async ({ page }) => {
    await page.locator('.cart-btn').click()
    await page.getByRole('button', { name: /Checkout/i }).click()
    // Dialog stays open since cart is empty
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})

test.describe('Services Section', () => {
  test('displays all four services', async ({ page }) => {
    await page.goto(BASE)
    await expect(page.getByRole('heading', { name: /Grooming/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Vet Consultations/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Training/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Pet Boarding/i })).toBeVisible()
  })
})

test.describe('Contact Section', () => {
  test('contact section is visible', async ({ page }) => {
    await page.goto(BASE)
    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await expect(contact).toBeVisible()
  })
})
