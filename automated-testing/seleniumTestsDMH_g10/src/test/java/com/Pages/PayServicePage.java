package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PayServicePage extends BasePage{
    //locators
    By loginButtonXpath = By.xpath("(//button[normalize-space()='Ingresar'])[1]");
    By loginMessage = By.xpath("//div/div[1]/div/form/div/div[1]/div/div[1]/h3");
    By inputEmail = By.id(":r0:");
    By inputPassword = By.id(":r1:");
    By continueButton = By.xpath("//div/div[1]/div/form/div/div[2]/div/div[1]/button");
    By payServicesButton = By.xpath("//div/div[1]/div[1]/div/p[5]");
    By infoText = By.xpath("//h3");
    By serviceTitle = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/div/div[1]/div/p");
    By inputBusiness = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[1]/div/input");
    By businessTitleButton = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/div/div[1]/p");
    By accountText = By.xpath("//div/div[1]/div[2]/div/div/div[1]/p[2]");
    By inputAccount = By.xpath("/html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div/input");
    By businessTitleText = By.xpath("//div/div[1]/div[2]/div/div[2]/div[1]/h3");
    By amountText = By.xpath("//div/div[1]/div[2]/div/div[2]/div[2]/h3[2]");
    By addedCardText = By.xpath("//div/div[1]/div[2]/div/div[4]/ul/li[1]/div/p");
    By selectCardButton = By.xpath("//div/div[1]/div[2]/div/div[4]/ul/li[1]/span/input");
    By selectBadCardButton = By.xpath("pedning");
    By paymentButton = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[5]/div[1]/button");
    By successPaymentText = By.xpath("//div/div[1]/div[2]/div/div/div[1]/p");
    By downloadButton = By.xpath("penmding");
    By inicioButton = By.xpath("//div/div[1]/div[2]/div/div/div[2]/div[2]/button");
    By unsuccessPaymentText = By.xpath("//div/div[1]/div[2]/div/div/div[1]/p[1]");
    By tryAgainButton = By.xpath("//div/div[1]/div[2]/div/div/div[2]/button");
    By backToPaymentText = By.xpath("//div/div[1]/div[2]/div/div[3]/h4");
    By paymentContinueButton = By.xpath("//div/div[1]/div[2]/div/div/div[2]/button");


    //setup
    public PayServicePage(WebDriver driver, WebDriverWait wait) {
    }
    //method to click an available button
    public void clickButton(By anyButton) throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(anyButton));
        validateButton(anyButton);
    }
    //login to access dashboard
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

    /////////////////////////////////////////////////////
    //Select business or organization to proceed with payment
    public void navigateToPayServices () throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(payServicesButton));
        validateButton(payServicesButton);
    }

    public String validateTitle() {
        // text: 'Mas recientes'
        wait.until(ExpectedConditions.presenceOfElementLocated(infoText));
        return getText(infoText);
    }

    public String validateBusinessTitle() {
        wait.until(ExpectedConditions.presenceOfElementLocated(serviceTitle));
        return getText(serviceTitle);
    }

    public void isInputPresent(String businessName) {
        wait.until(ExpectedConditions.presenceOfElementLocated(inputBusiness));
        writeField(businessName, inputBusiness);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputBusiness, businessName));
    }

    public void clickOnBusinessButton() throws InterruptedException {
        clickButton(businessTitleButton);
    }


    /////////////////////////////////////////////////////
    //Having selected a business next page, input and validate account information
    public String validateTextBankAccount() {
        wait.until(ExpectedConditions.presenceOfElementLocated(accountText));
        return getText(accountText);
    }

    public void isInputAccountPresent(String accountNumber) {
        wait.until(ExpectedConditions.presenceOfElementLocated(inputAccount));
        writeField(accountNumber, inputAccount);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputAccount, accountNumber));
    }

    public void clickOnContinueButton() throws InterruptedException {
        clickButton(paymentContinueButton);
    }


    /////////////////////////////////////////////////////
    //Having input the account info, validate the payment and select card to use
    public String validateTitleBusiness() {
        wait.until(ExpectedConditions.presenceOfElementLocated(businessTitleText));
        return getText(businessTitleText);
    }

    // todo: aqui se necesita validar si es un input o si es un valor que ya viene
    public String validateAmountToPay() {
        wait.until(ExpectedConditions.presenceOfElementLocated(amountText));
        return getText(amountText);
    }

    public String CCardText(){
        wait.until(ExpectedConditions.presenceOfElementLocated(addedCardText));
        return getText(addedCardText);
    }

    public void clickOnCardButton()  {
//        wait.until(ExpectedConditions.elementToBeSelected(selectCardButton));
        click(selectCardButton);
//        clickButton(selectCardButton);
    }

    // todo: to make a payment unsuccessful should it be witha card with no founds or an account without foundS?
    public void clickOnBadCardButton() throws InterruptedException {
        clickButton(selectBadCardButton);
    }

    public void clickOnPayButton() throws InterruptedException {
        clickButton(paymentButton);
    }


    /////////////////////////////////////////////////////
    //Having selected a card: payment successful, download ticket, back to 'inicio'
    public String validateSucessfulpayment() {
        wait.until(ExpectedConditions.presenceOfElementLocated(successPaymentText));
        return getText(successPaymentText);
    }
    public void clickDownloadButton() throws InterruptedException {
        clickButton(downloadButton);
    }

    public void clickInicioButton() throws InterruptedException {
        clickButton(inicioButton);
    }

    /////////////////////////////////////////////////////
    //Having selected a card: payment unsuccessful, try again

    public String validateUnSucessfulpayment() {
        wait.until(ExpectedConditions.presenceOfElementLocated(unsuccessPaymentText));
        return getText(unsuccessPaymentText);
    }
    public void clickTryAgainButton() throws InterruptedException {
        clickButton(tryAgainButton);
    }

    public String validateBacktopaymentText() {
        wait.until(ExpectedConditions.presenceOfElementLocated(backToPaymentText));
        return getText(backToPaymentText);
    }
}
