import { test, expect } from '@playwright/test'

test('タイトルと各セクションのヘッダーが表示されている', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('都道府県別 総人口推移グラフ')
  await expect(
    page.getByRole('heading', { name: '都道府県', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: '総人口', exact: true }),
  ).toBeVisible()
})

test('都道府県が表示されている', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('checkbox', { name: '北海道' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: '沖縄県' })).toBeVisible()
})

test('searchParamsにprefCodeが指定されている場合その都道府県にチェックが入った状態になる', async ({
  page,
}) => {
  await page.goto('/?prefCode=1&prefCode=47')
  await expect(page.getByRole('checkbox', { name: '北海道' })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: '東京都' })).not.toBeChecked()
  await expect(page.getByRole('checkbox', { name: '沖縄県' })).toBeChecked()
})

test('都道府県を選択していない場合、グラフの代わりにメッセージが表示される', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByText('都道府県を選択してください')).toBeVisible()
})

test('都道府県を選択するとグラフが表示される。', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('checkbox', { name: '北海道' }).check()
  await expect(page.getByRole('checkbox', { name: '北海道' })).toBeChecked()

  await expect(page.getByText('総人口（万人）')).toBeVisible()
  await expect(page.getByRole('listitem').getByText('北海道')).toBeVisible()
})

test('都道府県を選択するとURLのsearchParamsにprefCodeが追加される', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('checkbox', { name: '北海道' }).check()
  await expect(page.url()).toBe(
    'https://yumemi-fe-coding-test-tongari.vercel.app/?prefCode=1',
  )
})

test('都道府県のチェックを外すとグラフが消えてメッセージが表示される。', async ({
  page,
}) => {
  await page.goto('/?prefCode=1')
  await expect(page.getByRole('checkbox', { name: '北海道' })).toBeChecked()

  await page.getByRole('checkbox', { name: '北海道' }).uncheck()
  await expect(page.getByText('都道府県を選択してください')).toBeVisible()
})

test('複数の都道府県が選択できる。', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('checkbox', { name: '北海道' }).check()
  await page.getByRole('checkbox', { name: '東京都' }).check()
  await page.getByRole('checkbox', { name: '沖縄県' }).check()

  await expect(page.url()).toBe(
    'https://yumemi-fe-coding-test-tongari.vercel.app/?prefCode=1&prefCode=13&prefCode=47',
  )
  await expect(page.getByRole('listitem').getByText('北海道')).toBeVisible()
  await expect(page.getByRole('listitem').getByText('東京都')).toBeVisible()
  await expect(page.getByRole('listitem').getByText('沖縄県')).toBeVisible()
})
