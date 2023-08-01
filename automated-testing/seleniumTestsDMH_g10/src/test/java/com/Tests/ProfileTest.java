package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.LoginPage;
import com.Pages.ProfilePage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ProfileTest {

    private WebDriver driver;
    ProfilePage profilePage;
    LoginPage loginPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;


    @BeforeEach
    public void setUp() throws Exception{
        profilePage = new ProfilePage(driver, null);
        driver = profilePage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        profilePage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
        //Login
        loginPage = new LoginPage(driver, null);
        loginPage.redirectToLoginPage();
        loginPage.completeLoginProcess("test@test.com", "Test`123");
        //loginPage.completeLoginProcess("asde@gmail.com", "asd123*A");
    }

    @DisplayName("Profile page - Personal Data")
    @Test
    @Tag("smoke")

    public void testFieldsPresence()throws InterruptedException {
        test =extent.createTest("Check fields in personal data section ");
        test.log(Status.INFO, "The test starts...");

        profilePage.redirectToRegistrationPage();
        test.log(Status.PASS, "The profile page opens");

        profilePage.verifyPersonalDataTitleAndFields();
        test.log(Status.PASS, "Personal data title is present");
        test.log(Status.PASS, "Personal data fields are present");
    }

    @DisplayName("Profile page - Edit name")
    @Test
    @Tag("smoke")

    public void editProfile() throws InterruptedException{
        test =extent.createTest("Verify editing of personal data");
        test.log(Status.INFO, "The test starts...");

        profilePage.redirectToRegistrationPage();
        test.log(Status.PASS, "The profile page opens");
        profilePage.editNameButtonPencil();
        //Thread.sleep(500);
        test.log(Status.PASS, "Editing button is clicked successfully");
        profilePage.editName("Pedro");
        //Thread.sleep(2500);
        test.log(Status.PASS, "Name is edited and changes are saved successfully");
    }
    /*
    @DisplayName("Profile page - Verify alias text after copying")
    @Test
    @Tag("smoke")
    public void compareAliasTextsTest() {
        String aliasTextFromButton = profilePage.clickCopyButtonAndGetAliasText();
        String aliasTextFromField = profilePage.getAliasText();
        assertEquals (aliasTextFromButton, aliasTextFromField, "The alias texts do not match.");
    }
    */

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }

    }



