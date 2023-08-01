package com.Tests;

// import com.Pages.DashCardPage;
import com.Pages.FeatureCardsFirstPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import com.ExtentReports.ExtentFactory;
import com.Pages.LoginPage;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.ExtentReports;

public class FeatureCardsFirstTest {

    private WebDriver driver;
    FeatureCardsFirstPage featureCardsFirstPage;
    LoginPage loginPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;

    // DashCardPage dashCardPage;

    @BeforeEach
    public void setUp() throws Exception {
        featureCardsFirstPage = new FeatureCardsFirstPage(driver, null);
        driver = featureCardsFirstPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
        featureCardsFirstPage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
        // Login
        loginPage = new LoginPage(driver, null);
        loginPage.redirectToLoginPage();
        loginPage.completeLoginProcess("userTest@gmail.com", "12345tE*");
        // // dashCardPage
        // dashCardPage = new DashCardPage(driver, null);
    }

    @DisplayName("Feature Cards - first section")
    @Test
    @Tag("smoke")

    public void testFirstSection() throws InterruptedException {
        test = extent.createTest("Feature Cards - first section");
        test.log(Status.INFO, "The test starts...");

        featureCardsFirstPage.checkAddDebitOrCreditCard();
        test.log(Status.PASS, "Go to add card successfully");
    }

    @DisplayName("Feature Cards - second section")
    @Test
    @Tag("smoke")

    public void testSecondSection() throws InterruptedException {
        test = extent.createTest("Feature Cards - second section");
        test.log(Status.INFO, "The test starts...");

        featureCardsFirstPage.checkCardsListwitouthCards();
        test.log(Status.PASS, "Display message: without cards, when no cards");
    }

    // @DisplayName("Feature Cards - second section")
    // @Test
    // @Tag("smoke")

    // public void testSecondSectionWithCards() throws InterruptedException {
    //     test = extent.createTest("Feature Cards - second section");
    //     test.log(Status.INFO, "The test starts...");

    //     featureCardsFirstPage.addCard();
    //     Thread.sleep(5000);
    //     dashCardPage.completeCardForm("1234567891234567", "10/2022", "John Doe", "123");

    //     test.log(Status.PASS, "Add card succesfully");
    // }

    @AfterEach
    public void tearDown() throws Exception {
        extent.flush();
        driver.quit();
    }

}
