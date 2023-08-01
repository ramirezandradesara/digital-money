package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.Base.BasePage;

public class FeatureCardsFirstPage extends BasePage {
     //Locators
     By cardsListTitle = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[3]/h4[1]");
     By messageWhenHaveNotCards = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[3]/h4[2]");
     By addCardButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div/div/button");
     By messageAddCardDebitOrCredit = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/h4");
     By CardsMenuButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/p[6]");
     By inputCardNumber = By.id("//input[@id=\":r1:\"]");
     By messageWithoutCards = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[3]/h4[2]");

    //  By input1 = By.xpath("//input[starts-with(@placeholder, 'Número de la tarjeta*')]");

    //  By deleteButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[3]/ul/li[1]/button");

     //Cambiar al eliminar tarjeta en test
    //  By finalCardNumber = By.xpath("");

     public FeatureCardsFirstPage(WebDriver driver, WebDriverWait wait) {
    }

    public void checkAddDebitOrCreditCard(){
        wait.until(ExpectedConditions.presenceOfElementLocated(CardsMenuButton));
        click(CardsMenuButton);
        wait.until(ExpectedConditions.presenceOfElementLocated(messageAddCardDebitOrCredit));
        assertTrue(verifyTitle(messageAddCardDebitOrCredit).contains("Agregá tu tarjeta de débito o crédito"));
        click(addCardButton);
        boolean grid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]")).isDisplayed();
        if(grid) {
            System.out.println("Element is display");
        } else {
            System.out.println("Element is not display");
        }
    }

    public void checkCardsListwitouthCards(){
        wait.until(ExpectedConditions.presenceOfElementLocated(CardsMenuButton));
        click(CardsMenuButton);
        wait.until(ExpectedConditions.presenceOfElementLocated(cardsListTitle));
        assertTrue(verifyTitle(cardsListTitle).contains("Tus tarjetas"));

        wait.until(ExpectedConditions.presenceOfElementLocated(messageWithoutCards));
        assertTrue(verifyTitle(messageWithoutCards).contains("No tenés tarjetas asociadas"));
    }

    // public void addCard() throws InterruptedException {
    //     wait.until(ExpectedConditions.presenceOfElementLocated(CardsMenuButton));
    //     click(CardsMenuButton);
    //     wait.until(ExpectedConditions.presenceOfElementLocated(messageAddCardDebitOrCredit));
    //     click(addCardButton);

    //     // wait.until(ExpectedConditions.presenceOfElementLocated(input1));
    //     // writeField("pepe", input1);
    //     // wait.until(ExpectedConditions.textToBePresentInElementValue(input1, "pepe"));

    // }


    // public void checkCardsListwithCards(){
    //     wait.until(ExpectedConditions.presenceOfElementLocated(CardsMenuButton));
    //     click(CardsMenuButton);
    //     wait.until(ExpectedConditions.presenceOfElementLocated(cardsListTitle));
    //     assertTrue(verifyTitle(cardsListTitle).contains("Tus tarjetas"));
        
    //     // wait.until(ExpectedConditions.presenceOfElementLocated(finalCardNumber));
    //     // assertTrue(verifyTitle(finalCardNumber).contains("Terminada en 4300")); //cambiar numero luego del test ya que sera eliminada

    //     wait.until(ExpectedConditions.presenceOfElementLocated(deleteButton));
    //     click(deleteButton);
    // }

    public String verifyTitle(By locator){
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
        String message = findElement(locator).getText();
        return message;
    }

}
