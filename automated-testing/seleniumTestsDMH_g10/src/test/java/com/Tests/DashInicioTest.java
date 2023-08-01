package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.DashInicioPage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;


public class DashInicioTest {
    private WebDriver driver;
    DashInicioPage dashInicioPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;
    String availableMoneyTitleText = "Dinero disponible";
    String activityDeposit = "Deposito de dinheiro";
    String activityPayment = "pago une";
    String availableMoney = "$ 2,091,400.00";

    @BeforeEach
    public void setUp() throws Exception{
        dashInicioPage = new DashInicioPage(driver, null);
        driver = dashInicioPage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        dashInicioPage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
    }

    @Test
    @Tag("smoke")
    public void dashInicioInformation() throws InterruptedException {
        test =extent.createTest("Dashboard Inicio Page");
        test.log(Status.INFO, "The test starts...");

        dashInicioPage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        dashInicioPage.completeLoginForm("sofiaEriraOrozco11@gmail.com", "ataque77*A" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        Assertions.assertEquals(availableMoneyTitleText,dashInicioPage.displayedTitleText());
        test.log(Status.INFO, "TESTING Dashboard Title Dinero Disponible");
        test.log(Status.PASS, "The title text is correct");

        dashInicioPage.inactiveButtonsPresent();
        test.log(Status.INFO, "TESTING Dashboard buttons: Cargar dinero / Pago de servicios");
        test.log(Status.PASS, "The buttons are present");

        Assertions.assertEquals(activityDeposit,dashInicioPage.activityDepositInfoPresent());
        test.log(Status.INFO, "TESTING Activity deposit info");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(activityPayment,dashInicioPage.activityWithdrawInfoPresent());
        test.log(Status.INFO, "TESTING Activity withdraw/payment info");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(availableMoney,dashInicioPage.availableMoneyInfo());
        test.log(Status.INFO, "TESTING available Money info");
        test.log(Status.PASS, "The amount is correct");

        dashInicioPage.quickAccessButtons();
        test.log(Status.INFO, "TESTING Dashboard Inicio Quick Access Buttons");
        test.log(Status.PASS, "The buttons are working");

        dashInicioPage.isInputPresent(activityDeposit);
        test.log(Status.INFO, "TESTING Input for activity");
        test.log(Status.PASS, "The allows text to be written");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
