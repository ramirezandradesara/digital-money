package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ProfilePage extends BasePage {

    By profileMenuButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/p[3]");
    By yourDataTitle = By.xpath("(//h3[normalize-space()='Tus datos'])[1]");
    By emailField = By.xpath("(//p[normalize-space()='Email'])[1]");
    By nameField = By.xpath("//p[normalize-space()='Nombre']");
    By lastNameField = By.xpath("//p[normalize-space()='Apellido']");
    By cuitField = By.xpath("//p[normalize-space()='CUIT']");
    By telephoneField = By.xpath("//p[normalize-space()='Teléfono']");
    By passwordField = By.xpath("//p[normalize-space()='Contraseña']");
    By paymentManagementButton = By.xpath("(//a[normalize-space()='Gestioná los medios de pago'])[1]");
    By messageCopyCvuOrAlias = By.xpath("(//p[@class='MuiTypography-root MuiTypography-body1 css-1jp1udv'])[1]");
    By cvuField = By.xpath("//p[normalize-space()='CVU']");
    By aliasField = By.xpath("//p[normalize-space()='MOTO.ARBOL.CEREZA']");
    By copyButton = By. xpath("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-171u3kh'])[2]");
    By userName = By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/input[1]");
    ///html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/p[2]
    By editNameButton = By.xpath("//div[3]//button[1]//*[name()='svg']");
    By saveChangesButton = By.xpath("//button[normalize-space()='Guardar cambios']");
    public ProfilePage(WebDriver driver, WebDriverWait wait) {
    }

    public void redirectToRegistrationPage() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(profileMenuButton));
        click(profileMenuButton);
    }
    public String verifyTitle(By locator){
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
        String message = findElement(locator).getText();
        return message;
    }

    public boolean verifyPersonalDataTitleAndFields() {
        wait.until(ExpectedConditions.presenceOfElementLocated(yourDataTitle));
        assertTrue(verifyTitle(yourDataTitle).contains("Tus datos"));

        List<By> fieldLocators = Arrays.asList(
                emailField,
                nameField,
                lastNameField,
                cuitField,
                telephoneField,
                passwordField
        );

        for (By locator : fieldLocators) {
            try {
                findElement(locator);
            } catch (NoSuchElementException e) {
                return false;
            }
        }

        return true;
    }

    public void editNameButtonPencil(){
        wait.until(ExpectedConditions.presenceOfElementLocated(editNameButton));
        if (isDisplayed(editNameButton)){
            click(editNameButton);

        }else{
            System.out.println("Locator 'editNameButton' not found");

        }
    }

    public void editName(String newName) throws InterruptedException{

        wait.until(ExpectedConditions.presenceOfElementLocated(userName));
        if( isDisplayed(userName)){
            WebElement editable = findElement(userName);
            String s = Keys.chord(Keys.CONTROL, "a");
            editable.sendKeys(s);
            editable.sendKeys(Keys.DELETE);
            writeField(newName, userName);
            Thread.sleep(3000);
            //wait.until(ExpectedConditions.elementToBeClickable(saveChangesButton));
            //click(saveChangesButton);
            wait.until(ExpectedConditions.presenceOfElementLocated(saveChangesButton));
            //if (isDisplayed(saveChangesButton))
            {click(saveChangesButton);}
           // wait.until(ExpectedConditions.invisibilityOfElementLocated(saveChangesButton));
            Thread.sleep(10000);
        }else {
            System.out.println("Locator 'userName' was not found");
        }
    }

   /*
    public String clickCopyButtonAndGetAliasText() {
        wait.until(ExpectedConditions.elementToBeClickable(copyButton));
        click(copyButton);
        WebElement aliasText = findElement(copyButton);
        return aliasText.getText();

    }

    public String getAliasText() {
        wait.until(ExpectedConditions.presenceOfElementLocated(aliasField));
        WebElement aliasTextField = findElement(aliasField);
        return aliasTextField.getText();
    }
    */

}
