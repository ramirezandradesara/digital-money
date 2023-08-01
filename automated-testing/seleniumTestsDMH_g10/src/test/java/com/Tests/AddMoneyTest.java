package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.AddMoneyPage;
import com.Pages.LoginPage;
import com.Pages.ProfilePage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

public class AddMoneyTest {
    private WebDriver driver;
    AddMoneyPage addMoneyPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeEach
    public void setUp() throws Exception{
        addMoneyPage = new AddMoneyPage(driver, null);
        driver = addMoneyPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);
        addMoneyPage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
    }

    @Test
    @Tag("smoke")
    public void addMoneyByTransfer() throws InterruptedException {
        test =extent.createTest("Add Money Page");
        test.log(Status.INFO, "The test starts...");

        addMoneyPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        addMoneyPage.completeLoginForm("testauto@gmail.com", "123" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        addMoneyPage.navigateToAddMoney();
        test.log(Status.INFO, "TESTING navigate to Add Money page");
        test.log(Status.PASS, "Navigates successfully to Add Money Page");

        addMoneyPage.addMoneyByTransfer();
        test.log(Status.INFO, "TESTING copy information for tranfer");
        test.log(Status.PASS, "Information copied successfully");
    }

    @Test
    @Tag("smoke")
    public void addMoneyByCardInAccount() throws InterruptedException {
        test =extent.createTest("Add Money Page");
        test.log(Status.INFO, "The test starts...");

        addMoneyPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        addMoneyPage.completeLoginForm("testauto@gmail.com", "123" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        addMoneyPage.navigateToAddMoney();
        test.log(Status.INFO, "TESTING navigate to Add Money page");
        test.log(Status.PASS, "Navigates successfully to Add Money Page");

        addMoneyPage.addMoneyByCardInAccount();
        test.log(Status.INFO, "TESTING adding money steps");
        test.log(Status.PASS, "Money added successfully");
    }

    @Test
    @Tag("smoke")
    public void addMoneyByNewCard() throws InterruptedException {
        test =extent.createTest("Add Money Page");
        test.log(Status.INFO, "The test starts...");

        addMoneyPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        addMoneyPage.completeLoginForm("testauto@gmail.com", "123" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        addMoneyPage.navigateToAddMoney();
        test.log(Status.INFO, "TESTING navigate to Add Money page");
        test.log(Status.PASS, "Navigates successfully to Add Money Page");

        addMoneyPage.addMoneyByNewCard();
        test.log(Status.INFO, "TESTING navigation to card form from add money page");
        test.log(Status.PASS, "Navigates successfully to add new card");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
