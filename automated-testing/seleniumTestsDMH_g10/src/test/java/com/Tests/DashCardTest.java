package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.DashCardPage;
import org.junit.jupiter.api.*;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.openqa.selenium.WebDriver;

public class DashCardTest {
    private WebDriver driver;
    DashCardPage dashCardPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;
    String addedCardText = "Terminada en " + "4567";
    String noCardsText = "Vaya, aún no has agregado tarjetas";
    String errorCardNum = "Ingrese los 16 dígitos de la tarjeta";
    String errorDateNum = "El formato debe ser MM/YYYY";
    String errorOwnerName = "El nombre de tarjeta debe contener solo letras";
    String errorSecNum = "Ingrese 3 números";

    @BeforeEach
    public void setUp() throws Exception{
        dashCardPage = new DashCardPage(driver, null);
        driver = dashCardPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        dashCardPage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
    }

    @Test
    @Tag("smoke")
    public void dashCardPageCreate() throws InterruptedException {
        test =extent.createTest("Dashboard Card Page");
        test.log(Status.INFO, "The test starts...");

        dashCardPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        dashCardPage.completeLoginForm("userTest@gmail.com", "12345tE*" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        dashCardPage.navigateToCardForm();
        test.log(Status.INFO, "TESTING Navigate to card form");
        test.log(Status.PASS, "The new card form is present");

        dashCardPage.completeCardForm("1234567891234567", "10/2023", "John Doe", "123" );
        test.log(Status.INFO, "TESTING Filling up new card form");
        test.log(Status.PASS, "The card form opens and data is successfully submitted");

        Assertions.assertEquals(addedCardText,dashCardPage.addedCardText());
        test.log(Status.INFO, "TESTING added card info");
        test.log(Status.PASS, "The text is correct");

        dashCardPage.deleteACard();
        test.log(Status.INFO, "TESTING Delete the card added form");
        test.log(Status.PASS, "The new card was deleted");

        Assertions.assertEquals(noCardsText,dashCardPage.noCardsText());
        test.log(Status.INFO, "TESTING deleted card info");
        test.log(Status.PASS, "The text is not present");
    }

    @Test
    @Tag("smoke")
    public void dashCardPageError() throws InterruptedException {
        test =extent.createTest("Dashboard Card Page");
        test.log(Status.INFO, "The test starts...");

        dashCardPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        dashCardPage.completeLoginForm("sofiaEriraOrozco11@gmail.com", "ataque77*A" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        dashCardPage.navigateToCardForm();
        test.log(Status.INFO, "TESTING Navigate to card form");
        test.log(Status.PASS, "The new card form is present");

        dashCardPage.completeCardForm("1234567891231254545854", "hello", "123", "1234" );
        test.log(Status.INFO, "TESTING Filling up new card form with errors");
        test.log(Status.PASS, "The card form opens and data is successfully typed");

        Assertions.assertEquals(errorCardNum,dashCardPage.displayedErrorNum());
        test.log(Status.INFO, "TESTING error text for card number");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(errorDateNum,dashCardPage.displayedErrorDate());
        test.log(Status.INFO, "TESTING error text for card exp date");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(errorOwnerName,dashCardPage.displayedErrorName());
        test.log(Status.INFO, "TESTING error text for card owner name");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(errorSecNum,dashCardPage.displayedErrorSec());
        test.log(Status.INFO, "TESTING error text for card security number");
        test.log(Status.PASS, "The text is correct");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
