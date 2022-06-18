const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})


test('Adding movie to list', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('Billy Madison');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    const movie = await driver.findElement(By.xpath('//span[text()="Billy Madison"]'))

    const isDisplayed = movie.isDisplayed();
    expect(isDisplayed).toBeTruthy();
})

test('Deleting movie', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('Billy Madison');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    const movie = await driver.findElement(By.xpath('//span[text()="Billy Madison"]'))
    
    await driver.findElement(By.xpath('//button[@id="BillyMadison"]')).click();

})

test('Crossing off movie', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('Billy Madison');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    const movie = await driver.findElement(By.xpath('//span[text()="Billy Madison"]')).click()

    const crossedOffMovie = await driver.findElement(By.xpath('//span[@class="checked"]'));

    const isDisplayed = crossedOffMovie.isDisplayed();
    expect(isDisplayed).toBeTruthy
})

test('Movie deleted notification appears', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('Billy Madison');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    const movie = await driver.findElement(By.xpath('//span[text()="Billy Madison"]'))
    
    await driver.findElement(By.xpath('//button[@id="BillyMadison"]')).click();
    const notificationAlert = await driver.findElement(By.xpath('//aside[@id="message"]'))

    const isDisplayed = notificationAlert.isDisplayed();
    expect(isDisplayed).toBeTruthy
})




