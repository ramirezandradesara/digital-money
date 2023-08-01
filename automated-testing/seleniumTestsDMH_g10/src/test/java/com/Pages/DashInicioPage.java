package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DashInicioPage extends BasePage {
    By loginButtonXpath = By.xpath("(//button[normalize-space()='Ingresar'])[1]");
    By loginMessage = By.xpath("//div/div[1]/div/form/div/div[1]/div/div[1]/h3");
    By inputEmail = By.id(":r0:");
    By inputPassword = By.id(":r1:");
    By continueButton = By.xpath("//div/div[1]/div/form/div/div[2]/div/div[1]/button");
    By dineroDisTitleText = By.xpath("//div/div[1]/div[2]/div/div/div[1]/div[1]/p");
    By loadMoneyButton = By.xpath("//div/div[1]/div[2]/div/div/div[2]/button[1]/a");
    By paidButton = By.xpath("//div/div[1]/div[2]/div/div/div[2]/button[2]/a");
    By inputActivity = By.xpath("/html/body/div/div/div[1]/div[2]/div/div/div[3]/div[1]/div/input");
    By depositText = By.xpath("//div/div[1]/div[2]/div/div/div[3]/div[2]/div/a[1]/div[1]/p");
    By withdrawText = By.xpath("//div/div[1]/div[2]/div/div/div[3]/div[2]/div/a[2]/div[1]/p");
    By availableMoney = By.xpath("//div/div[1]/div[2]/div/div/div[1]/div[1]/div/p");
    By quickVerTarjetasButton = By.xpath("//div/div[1]/div[2]/div/div/div[1]/div[2]/p[1]/a");
    By quickVerCVUButton = By.xpath("//div/div[1]/div[2]/div/div/div[1]/div[2]/p[2]/a");
    By inicioButton = By.xpath("//div/div[1]/div[1]/div/p[1]");

    public DashInicioPage(WebDriver driver, WebDriverWait wait) {
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

    public String displayedTitleText(){
        wait.until(ExpectedConditions.presenceOfElementLocated(dineroDisTitleText));
        return getText(dineroDisTitleText);
    }

    //method to click an available button
    public void clickAvailableButton(By anyButton) throws InterruptedException {
        wait.until(ExpectedConditions.presenceOfElementLocated(anyButton));
        validateButton(anyButton);
    }

    //method to validate the existence of a button without clicking it
    public void isButtonPresent(By anyButton ) {
        wait.until(ExpectedConditions.presenceOfElementLocated(anyButton));
    }

    //method to validate the buttons that are not currently active, to become deprecated when functionality is added
    public void inactiveButtonsPresent() {
        isButtonPresent(loadMoneyButton);
        isButtonPresent(paidButton);
    }

    public void isInputPresent(String activity) {
        //write any activity in activity input (not functional yet)
        wait.until(ExpectedConditions.presenceOfElementLocated(inputActivity));
        writeField(activity, inputActivity);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputActivity, activity));
    }

    public String activityDepositInfoPresent() {
        wait.until(ExpectedConditions.presenceOfElementLocated(depositText));
        return getText(depositText);
    }

    public String activityWithdrawInfoPresent() {
        wait.until(ExpectedConditions.presenceOfElementLocated(withdrawText));
        return getText(withdrawText);
    }

    public String availableMoneyInfo() {
        wait.until(ExpectedConditions.presenceOfElementLocated(availableMoney));
        return getText(availableMoney);
    }

    public void quickAccessButtons() throws InterruptedException {
        clickAvailableButton(quickVerTarjetasButton);
        wait.until(ExpectedConditions.elementToBeClickable(inicioButton));
        clickAvailableButton(inicioButton);
        clickAvailableButton(quickVerCVUButton);
        wait.until(ExpectedConditions.elementToBeClickable(inicioButton));
        clickAvailableButton(inicioButton);
    }
}
