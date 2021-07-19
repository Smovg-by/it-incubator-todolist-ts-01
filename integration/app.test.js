describe('addItemForm', () => {
  it('addItemForm base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example'
    )
    const image = await page.screenshot()
    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})

describe('Task is done', () => {
  it('Task is done base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example'
    )
    const image = await page.screenshot()
    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})

describe('Task is NOT done', () => {
  it('Task is NOT done base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done-example'
    )
    const image = await page.screenshot()
    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})

describe('Editable span', () => {
  it('Editable span base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example'
    )
    const image = await page.screenshot()
    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})

describe('AppWithRedux', () => {
  it('AppWithRedux base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example'
    )
    const image = await page.screenshot()
    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
