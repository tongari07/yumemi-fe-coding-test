import { getRandomColor } from '.'

describe('getRandomColor', () => {
  test('#で始まる&文字のカラーコードが返却されること', () => {
    const color = getRandomColor()
    expect(color).toMatch(/^#[0-9A-F]{6}$/)
  })
})
