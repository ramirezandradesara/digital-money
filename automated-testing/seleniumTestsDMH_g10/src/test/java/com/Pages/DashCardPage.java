package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DashCardPage extends BasePage {

    By loginButtonXpath = By.xpath("(//button[normalize-space()='Ingresar'])[1]");
    By loginMessage = By.xpath("//div/div[1]/div/form/div/div[1]/div/div[1]/h3");
    By inputEmail = By.id(":r0:");
    By inputPassword = By.id(":r1:");
    By continueButton = By.xpath("//div/div[1]/div/form/div/div[2]/div/div[1]/button");
    By cardButton = By.xpath("//div/div[1]/div[1]/div/p[6]");
    By newCardButton = By.xpath("//div/div[1]/div[2]/div/div[2]/div/div");
    By inputCardNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[1]/div/div/input");
    By inputDateNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[1]/div/div/input");
    By inputOwnerName = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[2]/div/div/input");
    By inputCardSecNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[2]/div/div/input");
    By errorCardNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[1]/div/p");
    By errorDateNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[1]/div/p");
    By errorOwnerName = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[2]/div/p");
    By errorCardSecNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[2]/div/p");
    By addedCardText = By.xpath("//div/div[1]/div[2]/div/div[3]/ul/li/div[1]/p");
    By deleteCardButton = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[3]/ul/li/button/h4");
    By submitCardFormButton = By.xpath("//div/div[1]/div[2]/div/div[2]/form/div/div[2]/button");
    By inicioButton = By.xpath("//div/div[1]/div[1]/div/p[1]");
    By noCardsText = By.xpath("//div/div[1]/div[2]/div/div[3]/h4[2]");

    public DashCardPage(WebDriver driver, WebDriverWait wait) {
    }

    public void goToLoginPage() throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(loginButtonXpath));
        validateButton(loginButtonXpath);
        isDisplayed(loginMessage);
    }

    public void completeLoginForm(String Email, String Password){
        //write email in login form
        writeField(Email, inputEmail);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputEmail, Email));

        //click in continue
        wait.until(ExpectedConditions.elementToBeClickable(continueButton));
        click(continueButton);

        //write password in login form
        wait.until(ExpectedConditions.presenceOfElementLocated(inputPassword));
        writeField(Password, inputPassword);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputPassword, Password));

        //click in continue
        wait.until(ExpectedConditions.elementToBeClickable(continueButton));
        click(continueButton);
    }

    public void navigateToCardForm () throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(cardButton));
        validateButton(cardButton);
        wait.until(ExpectedConditions.presenceOfElementLocated(newCardButton));
        validateButton(newCardButton);
    }

    public String displayedErrorNum(){
        return getText(errorCardNum);
    }
    public String displayedErrorDate(){
        return getText(errorDateNum);
    }
    public String displayedErrorName(){
        return getText(errorOwnerName);
    }
    public String displayedErrorSec(){
        return getText(errorCardSecNum);
    }

    public void completeCardForm(String cardNumber, String dueDate, String cardOwner, String secNum) throws InterruptedException {

        wait.until(ExpectedConditions.presenceOfElementLocated(inputCardNum));
        writeField(cardNumber, inputCardNum);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputCardNum, cardNumber));

        wait.until(ExpectedConditions.presenceOfElementLocated(inputDateNum));
        writeField(dueDate, inputDateNum);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputDateNum, dueDate));

        wait.until(ExpectedConditions.presenceOfElementLocated(inputOwnerName));
        writeField(cardOwner, inputOwnerName);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputOwnerName, cardOwner));

        wait.until(ExpectedConditions.presenceOfElementLocated(inputCardSecNum));
        writeField(secNum, inputCardSecNum);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputCardSecNum, secNum));

        wait.until(ExpectedConditions.presenceOfElementLocated(submitCardFormButton));
        validateButton(submitCardFormButton);
    }

    public String addedCardText(){
        wait.until(ExpectedConditions.presenceOfElementLocated(addedCardText));
        return getText(addedCardText);
    }

    public void deleteACard() throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(deleteCardButton));
        validateButton(deleteCardButton);
        validateButton(inicioButton);
        validateButton(cardButton);
    }

    public String noCardsText() {
        wait.until(ExpectedConditions.presenceOfElementLocated(noCardsText));
        return getText(noCardsText);
    }
}
