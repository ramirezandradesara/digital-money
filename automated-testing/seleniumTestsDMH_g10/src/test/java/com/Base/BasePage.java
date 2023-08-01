package com.Base;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class BasePage {

    public static WebDriver driver;
    protected static WebDriverWait wait;

    public WebDriver chromeDriverConnection() {
        System.setProperty("webdriver.chrome.driver", "./src/test/resources/chromedriver/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        return driver;
    }

    public static WebDriver driver() {
        return driver;
    }

    public void link(String url) {driver.get(url);}

    public WebElement findElement(By locator) { return driver.findElement(locator);}

    public void click(By locator) {
        driver.findElement(locator).click();
    }

    public void enter(By locator) {
        driver.findElement(locator).sendKeys(Keys.ENTER);
    }

    public void writeField(String inputText, By locator) {
        driver.findElement(locator).clear();
        driver.findElement(locator).sendKeys(inputText);
    }

    public WebElement waitForElementByXpath(By xpath) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(xpath));
    }

    public WebElement getWebElementByXpath(By xpath) {
        WebElement webElement = null;
        try {
            webElement = driver.findElement(xpath);
        } catch (Exception e) {
            System.out.println("There is no element: " + xpath);
            System.out.println("Exception message: " + e);
        }
        return webElement;
    }
    public boolean isDisplayed(By xpath){
        try {
            return driver.findElement(xpath).isDisplayed();
        } catch(org.openqa.selenium.NoSuchElementException e){
            return false;

        }
    }
    public void validateButton(By buttonLocator) throws InterruptedException {
        waitForElementByXpath(buttonLocator);
        WebElement button = getWebElementByXpath(buttonLocator);
        button.click();
        Thread.sleep(5000);

    }
    public String getText(WebElement element){
        return element.getText();
    }
    public String getText(By locator){
        return driver.findElement(locator).getText();
    }
}


