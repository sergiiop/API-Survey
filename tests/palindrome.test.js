const { palindrome } = require('../utils/palindrome')

test.skip('palindrome of sergio', () => {
  const result = palindrome('sergioperez')

  expect(result).toBe('zerepoigres')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})

describe.skip('palindrome', () => {
  test('palindrome of sergioperez', () => {
    const result = palindrome('sergioperez')

    expect(result).toBe('zerepoigres')
  })

  test('palindrome of empty string', () => {
    const result = palindrome('')
    expect(result).toBe('')
  })
})
