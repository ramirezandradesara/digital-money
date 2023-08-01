package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.Base.BasePage;

public class LoginPage extends BasePage{
    //Locators
    By buttonLogInOnLandingPage = By.xpath("/html/body/div/div/header/div/div/div/div[1]/button");
    By inputEmail = By.xpath("/html/body/div/div/div[1]/div/form/div/div[1]/div/div[2]/div/div/input");
    By continueButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div/form/div/div[2]/div/div[1]/button");
    By passwordTitle = By.xpath("//h3[text()='Ingresá tu contraseña']");
    By inputPassword = By.xpath("/html/body/div/div/div[1]/div/form/div/div[1]/div/div[2]/div/div/input");
    By sendLogin = By.xpath("//*[@id=\"__next\"]/div/div[1]/div/form/div/div[2]/div/div/button");
    By moneyAvailable = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div[1]/div[1]/p");



    public LoginPage(WebDriver driver, WebDriverWait wait) {
    }

    public void redirectToLoginPage() throws InterruptedException{
        wait.until(ExpectedConditions.elementToBeClickable(buttonLogInOnLandingPage));
        click(buttonLogInOnLandingPage);
    }

    public void completeLoginProcess(String email, String password){
        wait.until(ExpectedConditions.presenceOfElementLocated(inputEmail));
        writeField(email, inputEmail);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputEmail, email));
        click(continueButton);

        wait.until(ExpectedConditions.presenceOfElementLocated(passwordTitle));
        WebElement passwordText = findElement(passwordTitle);

        if(passwordText.isDisplayed()) {
            writeField(password, inputPassword);
            wait.until(ExpectedConditions.textToBePresentInElementValue(inputPassword, password));
            click(sendLogin);
        };
       
    }

    public String verifyLoginSuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(moneyAvailable));
        WebElement dashboardText = findElement(moneyAvailable);
        return dashboardText.getText();
    }

}
