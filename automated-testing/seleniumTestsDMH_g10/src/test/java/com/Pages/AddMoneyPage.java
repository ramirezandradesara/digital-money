package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.time.Duration;

public class AddMoneyPage extends BasePage {

    By loginButtonXpath = By.xpath("(//button[normalize-space()='Ingresar'])[1]");
    By loginMessage = By.xpath("//div/div[1]/div/form/div/div[1]/div/div[1]/h3");
    By inputEmail = By.id(":r0:");
    By inputPassword = By.id(":r1:");
    By continueButton = By.xpath("//div/div[1]/div/form/div/div[2]/div/div[1]/button");

    By navbarAddMoneyBtn= By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/p[4]");

    // por transferencia bancaria
    By bankTransferButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div[1]");
    By AliasClipboard = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div[2]/div[2]/div[2]");
    By CVUClipboard = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div[2]/div[1]/div[2]");

    // 1 por tarjeta
    By selectCardButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div[2]");

    // 2 Seleccionar tarjeta
    By radioButtonSelectedCard = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[1]/ul/li/span");
    By addNewCard = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[2]/div/button");
    By continueButton2 = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[2]/button");

    // 3 ¿Cuánto querés ingresar a la cuenta?
    By inputMoneyAmount = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[1]/div/input");
    By continueButton3 = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[2]/button[2]");

    // 4 Revisá que esta todo bien
    By amountMoney = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/h5[1]");
    By changeMoneyAmountButton= By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div/button");
    By changeMoneyAmountInput= By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[2]");
    By confirmMoneyChangeButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[1]/button");
    By confirmBtn = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div/div[2]/button[2]");

    // 5 Ya cargamos el dinero en tu cuenta
    By sucessTitle = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div[1]/div/p");
    By amountMoneyChecked = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div/div/div[2]/h5[1]");

    By inputCardNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[1]/div/div/input");
    By inputDateNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[1]/div/div/input");
    By inputOwnerName = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[1]/div[2]/div/div/input");
    By inputCardSecNum = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/form/div/div[2]/div[2]/div/div/input");

    public AddMoneyPage(WebDriver driver, WebDriverWait wait) {
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

    public void navigateToAddMoney() throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(navbarAddMoneyBtn));
        validateButton(navbarAddMoneyBtn);
        isDisplayed(loginMessage);
    }

    public void addMoneyByTransfer() throws InterruptedException {
        validateButton(bankTransferButton);
        validateButton(AliasClipboard);
        validateButton(CVUClipboard);
    }

    public void addMoneyByCardInAccount() throws InterruptedException {
        // 1
        wait.until(ExpectedConditions.presenceOfElementLocated(selectCardButton));
        validateButton(selectCardButton);
        // 2
        validateButton(radioButtonSelectedCard);
        validateButton(continueButton2);
        // 3
        wait.until(ExpectedConditions.elementToBeClickable(inputMoneyAmount));
        click(inputMoneyAmount);
        writeField("300", inputMoneyAmount);
        validateButton(continueButton3);
        //4
        waitForText(amountMoney,"$300",10);
        validateButton(confirmBtn);
        //5
        waitForText(sucessTitle,"Ya cargamos el dinero en tu cuenta",10);
        waitForText(amountMoneyChecked,"$300",10);
    }

    public void addMoneyByNewCard() throws InterruptedException {
        // 1
        wait.until(ExpectedConditions.presenceOfElementLocated(selectCardButton));
        validateButton(selectCardButton);
        // 2
        validateButton(addNewCard);
        wait.until(ExpectedConditions.presenceOfElementLocated(inputCardNum));
        wait.until(ExpectedConditions.presenceOfElementLocated(inputDateNum));
        wait.until(ExpectedConditions.presenceOfElementLocated(inputOwnerName));
        wait.until(ExpectedConditions.presenceOfElementLocated(inputCardSecNum));
    }


    public void waitForText(By locator,String texto, int tiempo) {
        new WebDriverWait(driver,Duration.ofSeconds(tiempo))
                .until(ExpectedConditions.textToBe(locator,texto ));
    }
}
