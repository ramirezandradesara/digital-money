package com.Tests;

import com.ExtentReports.ExtentFactory;
import com.Pages.ActivityPage;
import com.Pages.LoginPage;
import com.Pages.ProfilePage;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ActivityTest {

    private WebDriver driver;
    ProfilePage profilePage;
    ActivityPage activityPage;
    LoginPage loginPage;
    static ExtentSparkReporter spark = new ExtentSparkReporter("./target/Spark.html");
    static ExtentReports extent;
    ExtentTest test;

    @BeforeEach
    public void setUp() throws Exception {
        profilePage = new ProfilePage(driver, null);
        driver = profilePage.chromeDriverConnection();
        extent = ExtentFactory.getInstance();
        extent.attachReporter(spark);

        profilePage.link("https://digital-money-house-dmhequipo10-gmailcom.vercel.app/");

        //Login
        loginPage = new LoginPage(driver, null);
        loginPage.redirectToLoginPage();
        loginPage.completeLoginProcess("test@test.com", "Test`123");

        //activity page
        activityPage = new ActivityPage(driver, null);
        activityPage.redirectToActivityPage();
        activityPage.verifyInputSearchPresence();
    }



    @Test
    @Tag("smoke")
    public void redirectToDashActivityPage() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.verifyActivityTitleAndActivitys();
        test.log(Status.INFO, "TESTING title 'Tu actividad' presence");
        test.log(Status.PASS, "Activity title is present");
        test.log(Status.PASS, "Activity container is present");
    }


    @Test
    @Tag("smoke")
    public void filterByToday() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByToday();
        test.log(Status.INFO, "TESTING filter by today");
        test.log(Status.PASS, "Filter Activities by day successfully");

        assertTrue(activityPage.verifyFilterTodaySuccess().contains("Hoy"));
        test.log(Status.INFO, "TESTING title 'Hoy' presence");
        test.log(Status.PASS, "The text is present");

    }

    @Test
    @Tag("smoke")
    public void filterByYesterday() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByYesterday();
        test.log(Status.INFO, "TESTING filter by yesterday");
        test.log(Status.PASS, "Filter Activities by yesterday successfully");

        assertTrue(activityPage.verifyFilterYesterdaySuccess().contains("Ayer"));
        test.log(Status.INFO, "TESTING title 'Ayer' presence");
        test.log(Status.PASS, "The text is present");

    }

    @Test
    @Tag("smoke")
    public void filterByLastWeek() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");


        activityPage.filterByLastWeek();
        test.log(Status.INFO, "TESTING filter by last week");
        test.log(Status.PASS, "Filter Activities by last week successfully");

        assertTrue(activityPage.verifyFilterLastWeekSuccess().contains("Última semana"));
        test.log(Status.INFO, "TESTING title 'Última semana' presence");
        test.log(Status.PASS, "The text is present");
    }
    @Test
    @Tag("smoke")
    public void filterByLastFifteenDays() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByLastFifteenDays();
        test.log(Status.INFO, "TESTING filter by last fifteen days");
        test.log(Status.PASS, "Filter Activities successfully");

        assertTrue(activityPage.verifyFilterLastFifteenDaysSuccess().contains("Últimos 15 días"));
        test.log(Status.INFO, "TESTING title 'Últimos 15 días' presence");
        test.log(Status.PASS, "The text is present");
    }

    @Test
    @Tag("smoke")
    public void filterByLastMonth() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByLastMonth();
        test.log(Status.INFO, "TESTING filter by last month");
        test.log(Status.PASS, "Filter Activities by last month successfully");

        assertTrue(activityPage.verifyFilterLastMonthSuccess().contains("Último mes"));
        test.log(Status.INFO, "TESTING title 'Último mes' presence");
        test.log(Status.PASS, "The text is present");
    }

    @Test
    @Tag("smoke")
    public void filterByLastYear() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByLastYear();
        test.log(Status.INFO, "TESTING filter by last year");
        test.log(Status.PASS, "Filter Activities by last year successfully");

        assertTrue(activityPage.verifyFilterLastYearSuccess().contains("Último año"));
        test.log(Status.INFO, "TESTING title 'Último año' presence");
        test.log(Status.PASS, "The text is present");
    }

    @Test
    @Tag("smoke")
    public void clearFilters() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.filterByLastFifteenDays();
        test.log(Status.INFO, "TESTING filter by last fifteen days");
        test.log(Status.PASS, "Filter Activities successfully");

        activityPage.clearFilters();
        test.log(Status.INFO, "TESTING clear filters");
        test.log(Status.PASS, "Clear filters successfully");

    }

    @Test
    @Tag("smoke")
    public void redirectToActivityDetail() throws InterruptedException {
        test =extent.createTest("Dashboard Activity Page");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "TESTING redirect to activity page");
        test.log(Status.PASS, "Go to activity page successfully");

        activityPage.goToActivityDetail();
        test.log(Status.INFO, "TESTING redirect to activity detail page");
        test.log(Status.PASS, "Go to Activity detail page successfully");
    }

    

    @DisplayName("Activity page - Check elements presence")
    @Test
    @Tag("smoke")

    public void testKeywordFilterFieldPresence() throws InterruptedException {
        test = extent.createTest("Verify keyword filter field presence in activity section");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "Redirecting to the activity page...");
        test.log(Status.PASS, "The activity page opens");

        activityPage.verifyInputSearchPresence();
        test.log(Status.INFO, "Verifying if the input to search by keyword is present...");
        test.log(Status.PASS, "Input to search by keyword present");
    }


    @DisplayName("Activity page - Search by keyword")
    @Test
    @Tag("smoke")

    public void searchByKeyword() throws InterruptedException {
        test = extent.createTest("Verify filter with keyword");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "Redirecting to the activity page...");
        test.log(Status.PASS, "The activity page opens");

        activityPage.typeKeyword("Deposito");
        test.log(Status.INFO, "Typing the keyword...");

        test.log(Status.PASS, "Keyword typed successfully");
        test.log(Status.PASS, "Activity with keyword 'Deposito' found");
    }

    @DisplayName("Activity page - Filter button")
    @Test
    @Tag("smoke")

    public void testFilterButtonOperationIsWorking() throws InterruptedException {
        test = extent.createTest("Verify filter button is working");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "Redirecting to the activity page...");
        test.log(Status.PASS, "The activity page opens");

        activityPage.verifyFilterButtonIsWorking();
        test.log(Status.INFO, "Verifying if the filter button is working...");
        test.log(Status.PASS, "The filter button works");

        activityPage.verifyOperationFilterIsRendering();
        test.log(Status.INFO, "Verifying if the operation filter button is rendering...");
        test.log(Status.PASS, "The operation filter button works");
    }
    @DisplayName("Activity page - Filter by income")
    @Test
    @Tag("smoke")

    public void testOperationFilterByIncome() throws InterruptedException{
        test = extent.createTest("Verify filter by income is working");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "Redirecting to the activity page...");
        test.log(Status.PASS, "The activity page opens");

        activityPage.verifyOperationFilter("ingresos");
        test.log(Status.INFO, "Verifying the operation filter by income...");
        test.log(Status.PASS, "The operation filter by income works");

        test.log(Status.PASS, "The operation filter by income works");
    }
    @DisplayName("Activity page - Filter by outgoing")
    @Test
    @Tag("smoke")

    public void testOperationFilterByOutgoing() throws InterruptedException{
        test = extent.createTest("Verify filter by outgoing is working");
        test.log(Status.INFO, "The test starts...");

        activityPage.redirectToActivityPage();
        test.log(Status.INFO, "Redirecting to the activity page...");
        test.log(Status.PASS, "The activity page opens");

        activityPage.verifyOperationFilter("egresos");
        test.log(Status.INFO, "Verifying the operation filter by outgoing...");
        test.log(Status.PASS, "The operation filter by outgoing works");

        test.log(Status.PASS, "The operation filter by outgoing works");
    }
    
    @AfterEach
    public void tearDown() throws Exception {
        extent.flush();
        driver.quit();
    }


}
