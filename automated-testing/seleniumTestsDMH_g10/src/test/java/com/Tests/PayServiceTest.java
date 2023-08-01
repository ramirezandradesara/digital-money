package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.PayServicePage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import java.io.StringReader;

public class PayServiceTest {

    private WebDriver driver;
    PayServicePage payServicePage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;

    String titleValidated = "Más recientes";
    String businessTitle = "HBO Max";
    String textBankAccount = "Ingrese su número de cuenta";
    String accountNumber = "12345678912";
    String amountToPay = "$14.9";
    String cardInfo = "Terminada en 4567";
    String successPaymentText = "Ya realizaste tu pago";
    String unsuccessfulPaymentText = "Hubo un problema con tu pago";
    String backToPayAgainText = "Dinero en cuenta";

    @BeforeEach
    public void setUp() throws Exception{
        payServicePage = new PayServicePage(driver, null);
        driver = payServicePage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        payServicePage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");
    }

    @DisplayName("Pay Service Page validations")

    @Test
    @Tag("smoke")
    public void successfulPaymentTest() throws InterruptedException {
        test =extent.createTest("Pay service Page, successful payment");
        test.log(Status.INFO, "The test starts...");

        payServicePage.goToLoginPage();
        test.log(Status.INFO, "TESTING LOGIN BUTTON");
        test.log(Status.PASS, "The login form opens");

        payServicePage.completeLoginForm("tester321@gmail.com", "Tester123*" );
        test.log(Status.INFO, "TESTING Filling up login form");
        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        payServicePage.navigateToPayServices();
        test.log(Status.INFO, "TESTING Navigate to pay services");
        test.log(Status.PASS, "The payment interface is present");

        Assertions.assertEquals(titleValidated,payServicePage.validateTitle());
        test.log(Status.INFO, "TESTING validating title for payment dashboard");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(businessTitle,payServicePage.validateBusinessTitle());
        test.log(Status.INFO, "TESTING validating title for business or company");
        test.log(Status.PASS, "The text is correct");

        payServicePage.isInputPresent(businessTitle);
        test.log(Status.INFO, "TESTING validating typing business or company title");
        test.log(Status.PASS, "The text was typed correctly");

        payServicePage.clickOnBusinessButton();
        test.log(Status.INFO, "TESTING selecting a business or company title");
        test.log(Status.PASS, "The selection was made correctly");

        Assertions.assertEquals(textBankAccount,payServicePage.validateTextBankAccount());
        test.log(Status.INFO, "TESTING validating text for payment dashboard");
        test.log(Status.PASS, "The text is correct");

        payServicePage.isInputAccountPresent(accountNumber);
        test.log(Status.INFO, "TESTING validating typing account number");
        test.log(Status.PASS, "The text was typed correctly");

        payServicePage.clickOnContinueButton();
        test.log(Status.INFO, "TESTING selecting continue after typing account");
        test.log(Status.PASS, "The button was clicked correctly");

        Assertions.assertEquals(businessTitle,payServicePage.validateTitleBusiness());
        test.log(Status.INFO, "TESTING validating business title for payment when selecting a card to use");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(amountToPay,payServicePage.validateAmountToPay());
        test.log(Status.INFO, "TESTING validating the amount for payment when selecting a card to use");
        test.log(Status.PASS, "The amount is correct");

        Assertions.assertEquals(cardInfo,payServicePage.CCardText());
        test.log(Status.INFO, "TESTING validating the existence of a card to use");
        test.log(Status.PASS, "The card info is displayed");

        payServicePage.clickOnCardButton();
        test.log(Status.INFO, "TESTING selecting a card to continue payment");
        test.log(Status.PASS, "The card was clicked correctly");

        payServicePage.clickOnPayButton();
        test.log(Status.INFO, "TESTING continue with the payment pressing the continue button");
        test.log(Status.PASS, "The button was clicked correctly");

        Assertions.assertEquals(successPaymentText,payServicePage.validateSucessfulpayment());
        test.log(Status.INFO, "TESTING validating successful payment");
        test.log(Status.PASS, "The payment was successful");

//        payServicePage.clickDownloadButton();
//        test.log(Status.INFO, "TESTING click on download ticket");
//        test.log(Status.PASS, "The button was clicked correctly");

        payServicePage.clickInicioButton();
        test.log(Status.INFO, "TESTING click on download ticket");
        test.log(Status.PASS, "The button was clicked correctly");
    }

    @Test
    @Tag("smoke")
    public void unsuccessfulPaymentTest() throws InterruptedException {
        test =extent.createTest("Pay service Page, unsuccessful payment");
        test.log(Status.INFO, "The test starts...");

        payServicePage.goToLoginPage();
//        test.log(Status.INFO, "TESTING LOGIN BUTTON");
//        test.log(Status.PASS, "The login form opens");

        payServicePage.completeLoginForm("userTest@gmail.com", "12345tE*" );
//        test.log(Status.INFO, "TESTING Filling up login form");
//        test.log(Status.PASS, "The login form opens and data is successfully submitted");

        payServicePage.navigateToPayServices();
        test.log(Status.INFO, "TESTING Navigate to pay services");
        test.log(Status.PASS, "The payment interface is displayed");

        Assertions.assertEquals(titleValidated,payServicePage.validateTitle());
        test.log(Status.INFO, "TESTING validating title for payment dashboard");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(businessTitle,payServicePage.validateBusinessTitle());
        test.log(Status.INFO, "TESTING validating title for business or company");
        test.log(Status.PASS, "The text is correct");

        payServicePage.isInputPresent(businessTitle);
        test.log(Status.INFO, "TESTING validating typing business or company title");
        test.log(Status.PASS, "The text was typed correctly");

        payServicePage.clickOnBusinessButton();
        test.log(Status.INFO, "TESTING selecting a business or company title");
        test.log(Status.PASS, "The selection was made correctly");

        Assertions.assertEquals(textBankAccount,payServicePage.validateTextBankAccount());
        test.log(Status.INFO, "TESTING validating title for payment dashboard");
        test.log(Status.PASS, "The text is correct");

        payServicePage.isInputAccountPresent(accountNumber);
        test.log(Status.INFO, "TESTING validating typing account number");
        test.log(Status.PASS, "The text was typed correctly");

        payServicePage.clickOnContinueButton();
        test.log(Status.INFO, "TESTING selecting continue after typing account");
        test.log(Status.PASS, "The button was clicked correctly");

        Assertions.assertEquals(businessTitle,payServicePage.validateTitleBusiness());
        test.log(Status.INFO, "TESTING validating business title for payment when selecting a card to use");
        test.log(Status.PASS, "The text is correct");

        Assertions.assertEquals(amountToPay,payServicePage.validateAmountToPay());
        test.log(Status.INFO, "TESTING validating the amount for payment when selecting a card to use");
        test.log(Status.PASS, "The amount is correct");

        Assertions.assertEquals(cardInfo,payServicePage.CCardText());
        test.log(Status.INFO, "TESTING validating the existence of a card to use");
        test.log(Status.PASS, "The card info is displayed");

//        payServicePage.clickOnBadCardButton();
//        test.log(Status.INFO, "TESTING selecting a card with no founds to continue payment");
//        test.log(Status.PASS, "The card was clicked correctly");

        payServicePage.clickOnPayButton();
        test.log(Status.INFO, "TESTING continue with the payment pressing the continue button, without selecting a card");
        test.log(Status.PASS, "The button was clicked correctly");

        Assertions.assertEquals(unsuccessfulPaymentText,payServicePage.validateUnSucessfulpayment());
        test.log(Status.INFO, "TESTING validating unsuccessful payment");
        test.log(Status.PASS, "The payment was unsuccessful");

        payServicePage.clickTryAgainButton();
        test.log(Status.INFO, "TESTING click on try again button");
        test.log(Status.PASS, "The button was clicked correctly");

        Assertions.assertEquals(backToPayAgainText,payServicePage.validateBacktopaymentText());
        test.log(Status.INFO, "TESTING validating back to payment dashboard");
        test.log(Status.PASS, "The text is present");
    }

    @AfterEach
    public void tearDown()throws Exception{
        extent.flush();
        driver.quit();
    }
}
