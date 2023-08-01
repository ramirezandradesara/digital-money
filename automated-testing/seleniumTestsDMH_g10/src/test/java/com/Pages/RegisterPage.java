package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RegisterPage extends BasePage {
    By buttonLandingCreateAccount = By.xpath("(//button[normalize-space()='Crear cuenta'])[1]");
    By inputFirstName = By.id(":r0:");
    By inputLastName = By.xpath("//*[@id=\":r1:\"]");
    By inputDNI = By.id(":r2:");
    //id: :r2:
    By inputEmail = By.xpath("(//input[@id=':r3:'])[1]");
    By inputPassword = By.id(":r4:");
    By inputConfirmPassword = By.xpath("(//input[@id=':r5:'])[1]");
    By inputTelephone = By.xpath("(//input[@id=':r6:'])[1]");
    By buttonCreateAccount = By.xpath("//button[@aria-label='crear cuenta']");
    //abs xpath: /html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[1]/div[14]/div[1]/div[1]/div[1]/input[1]
    By successAccountCreatedMessage = By.xpath("(//p[@class='MuiTypography-root MuiTypography-body1 css-1uf1jyy'])[1]");
    //css select: .MuiTypography-root.MuiTypography-body1.css-1uf1jyy
    By buttonContinueToLogin = By.xpath("(//a[normalize-space()='Continuar'])[1]");

    public RegisterPage(WebDriver driver, WebDriverWait wait) {
    }

    /** Método para dirigirse a la página de registro */

    public void redirectToRegistrationPage() throws InterruptedException{

        wait.until(ExpectedConditions.elementToBeClickable(buttonLandingCreateAccount));
        click(buttonLandingCreateAccount);
    }

    /** Métodos para proceso de registro */

    public void completeRegistrationForm(String firstName, String lastName, String dni, String email, String password, String confirmPassword, String telephone){
        wait.until(ExpectedConditions.presenceOfElementLocated(inputFirstName));
        writeField(firstName, inputFirstName);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputFirstName, firstName));

        writeField(lastName, inputLastName);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputLastName, lastName));

        writeField(dni, inputDNI);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputDNI, dni));

        writeField(email, inputEmail);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputEmail, email));

        writeField(password, inputPassword);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputPassword, password));

        writeField(confirmPassword, inputConfirmPassword);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputConfirmPassword, confirmPassword));

        writeField(telephone, inputTelephone);
        wait.until(ExpectedConditions.textToBePresentInElementValue(inputTelephone, telephone));
    }

    /**Método para enviar el formulario de registro*/

    public void requestRegisterUser() throws InterruptedException{
        wait.until(ExpectedConditions.elementToBeClickable(buttonCreateAccount));
        click(buttonCreateAccount);
    }

    /**Método para capturar el mensaje de registro exitoso de usuario */

    public String verifyRegisterSuccessMessage()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(successAccountCreatedMessage));
        WebElement registerMessage = findElement(successAccountCreatedMessage);
        return registerMessage.getText();
    }

    /** Método para dirigirse a la página de Login*/

    public void redirectToLoginPage() throws InterruptedException{

        wait.until(ExpectedConditions.elementToBeClickable(buttonContinueToLogin));
        click(buttonContinueToLogin);
    }



}


