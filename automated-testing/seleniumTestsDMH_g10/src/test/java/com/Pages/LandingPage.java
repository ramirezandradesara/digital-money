package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class LandingPage extends BasePage {
    By loginButtonXpath = By.xpath("(//button[normalize-space()='Ingresar'])[1]");
    By registerButtonXpath = By.xpath("(//button[normalize-space()='Crear cuenta'])[1]");
    By loginMessage= By.xpath("//div/div[1]/div/form/div/div[1]/div/div[1]/h3");
    By registerMessage= By.xpath("//div/div[1]/div/form/div/div[10]/p");
    By card1= By.xpath("//div/div[1]/div/div[1]/div[2]/div[1]/div/div/p");
    By card2= By.xpath("//div/div[1]/div/div[1]/div[2]/div[2]/div/div/p");
    By card3= By.xpath("//div/div[1]/div/div[1]/div[1]/h1");

    public LandingPage(WebDriver driver, WebDriverWait wait) {
    }

    public void goToLoginPage() throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(loginButtonXpath));
        validateButton(loginButtonXpath);
        isDisplayed(loginMessage);
    }

    public void goToRegisterPage() throws InterruptedException {
        validateButton(registerButtonXpath);
        isDisplayed(registerMessage);
    }

    public String displayedCard1Text(){
        return getText(card1);
    }

    public String displayedCard2Text(){
        return getText(card2);
    }

    public String displayedCard3Text(){
        return getText(card3);
    }

}

