package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.LandingPage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

public class LandingTest {

    private WebDriver driver;
    LandingPage landingPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;
    String card1Message="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual.";
    String card2Message="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel.";
    String card3Message="De ahora en adelante, hacés más con tu dinero";

    @BeforeEach
    public void setUp() throws Exception{
        landingPage = new LandingPage(driver, null);
        driver = landingPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        landingPage.link("https://digital-money-house-10.vercel.app/");
    }
    @DisplayName("Landing Page validations")

    @Test
    @Tag("smoke")
    public void landingPageTestLogin() throws InterruptedException {
        test =extent.createTest("Landing Page");
        test.log(Status.INFO, "The test starts...");
        landingPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");
    }

    @Test
    @Tag("smoke")
    public void landingPageTestRegister() throws InterruptedException {
        test =extent.createTest("Landing Page");
        test.log(Status.INFO, "The test starts...");
        landingPage.goToRegisterPage();
        test.log(Status.INFO, "TESTING REGISTER BUTTON");
        test.log(Status.PASS, "The login form opens");
    }

    @Test
    @Tag("smoke")
    public void landingPageTestMessages() throws InterruptedException {
        test =extent.createTest("Landing Page Messages");
        test.log(Status.INFO, "The test starts...");
        Assertions.assertEquals(card1Message,landingPage.displayedCard1Text());
        test.log(Status.INFO, "TESTING CARD1 MESSAGE");
        test.log(Status.PASS, "The message is correct");
        Assertions.assertEquals(card2Message,landingPage.displayedCard2Text());
        test.log(Status.INFO, "TESTING CARD2 MESSAGE");
        test.log(Status.PASS, "The message is correct");
        Assertions.assertEquals(card3Message,landingPage.displayedCard3Text());
        test.log(Status.INFO, "TESTING CARD3 MESSAGE");
        test.log(Status.PASS, "The message is correct");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
