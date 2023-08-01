package com.Tests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import com.ExtentReports.ExtentFactory;
import com.Pages.LoginPage;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.ExtentReports;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginTest {

    private WebDriver driver;
    LoginPage loginPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;


    @BeforeEach
    public void setUp() throws Exception{
        loginPage = new LoginPage(driver, null);
        driver = loginPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        loginPage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
    }

    @DisplayName("Login process")
    @Test
    @Tag("smoke")

    public void testLogin()throws InterruptedException {
        test =extent.createTest("Login process");
        test.log(Status.INFO, "The test starts...");

        loginPage.redirectToLoginPage();
        test.log(Status.PASS, "Go to login page successfully");

        loginPage.completeLoginProcess("userTest@gmail.com", "12345tE*");
        test.log(Status.PASS, "Login with a registered user is succeeded");

        assertTrue(loginPage.verifyLoginSuccess().contains("Dinero disponible"));
        test.log(Status.PASS, "Dashboard access successfully");

    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
    
}
