package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.RegisterPage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RegisterTest {


    private WebDriver driver;
    RegisterPage registerPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;


    @BeforeEach
    public void setUp() throws Exception{
        registerPage = new RegisterPage(driver, null);
        driver = registerPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        registerPage.link("https://digital-money-house-10.vercel.app/");
    }

    @DisplayName("Registration process")
    @Test
    @Tag("smoke")

    public void testRegister()throws InterruptedException {
        test =extent.createTest("Registration process");
        test.log(Status.INFO, "The test starts...");

        registerPage.redirectToRegistrationPage();
        test.log(Status.INFO, "1° NEW USER REGISTRATION TEST");
        test.log(Status.PASS, "The registration form opens");

        registerPage.completeRegistrationForm("user","Test","27111112",
                "userTest@gmail.com","12345tE*","12345tE*", "42222220");
        test.log(Status.PASS, "Registration form completed with the required information");

        registerPage.requestRegisterUser();
        test.log(Status.PASS, "Sending user registration request");

        assertTrue(registerPage.verifyRegisterSuccessMessage().contains("Registro Exitoso"));
        test.log(Status.PASS, "Account created successfully");

        registerPage.redirectToLoginPage();
        test.log(Status.PASS,"redirect to login page");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
