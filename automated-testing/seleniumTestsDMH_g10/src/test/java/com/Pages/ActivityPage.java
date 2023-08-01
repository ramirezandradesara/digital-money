package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ActivityPage extends BasePage {

    //Locators

    By activityMenuButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/p[2]");

    By yourActivityTitle = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/h5");

    By buttonFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[1]/div[2]/div/button");

    By modalFilter = By.xpath("/html/body/div[2]/div[3]");

    By periodTypeFilter = By.xpath("//*[@id=\"vertical-tab-1\"]");

    By todayFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[1]");

    By yesterdayFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[2]");

    By lastWeekFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[3]");

    By lastFifteenDaysFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[4]");

    By lastMonthFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[5]");

    By lastYearFilter = By.xpath("//*[@id=\"vertical-tabpanel-1\"]/div/div/div/label[6]");


    By applyFilterButton = By.xpath("/html/body/div[2]/div[3]/div[2]/button[2]");

    By deleteFiltersButton = By.xpath("/html/body/div[2]/div[3]/div[2]/button[1]");

    By clearFilterButtonActivityHome = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/div[1]/div[2]/div/div/button");
    By activityContainer = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[1]/div[2]/div/div");

    By firstActivity = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div[1]/div");

    By activityNumber = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[1]/div[2]/p[5]");

    By todayTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");

    By yesterdayTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");

    By lastWeekTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");

    By lastFifteenDaysTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");

    By lastMonthTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");

    By lastYearTitleFilter = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[2]/div/div");


    //Locators
    By inputSearch = By.xpath("/html/body/div/div/div[1]/div[2]/div/div[2]/div[1]/div[1]/div/div/div/input");
    // By activityMenuButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/p[2]");
    By activityItemDeposit = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[3]/div/div[1]/div/div[1]/p");
    By activityItemOutgoing = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[3]/div/div[1]/div");
    By filterButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div/div[2]/div[1]/div[2]/div/button");
    By filterModal = By.xpath("/html/body/div[2]/div[3]");
    // By deleteFiltersButton = By.xpath("/html/body/div[2]/div[3]/div[2]/button[1]");
    By applyFiltersButton =By.xpath("/html/body/div[2]/div[3]/div[2]/button[2]");
    By operationOption = By.xpath("//*[@id=\"vertical-tab-0\"]");
    By incomingButton = By.xpath("//*[@id=\"vertical-tabpanel-0\"]/div/div/div/label[1]");
    By outgoingButton = By.xpath("//*[@id=\"vertical-tabpanel-0\"]/div/div/div/label[2]");

    public ActivityPage(WebDriver driver, WebDriverWait wait) {
    }

    public void redirectToActivityPage() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(activityMenuButton));
        click(activityMenuButton);
    }

    public String verifyTitle(By locator){
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
        return findElement(locator).getText();
    }

    public boolean verifyActivityTitleAndActivitys() {
        wait.until(ExpectedConditions.presenceOfElementLocated(yourActivityTitle));
        assertTrue(verifyTitle(yourActivityTitle).contains("Tu actividad"));

        if (isDisplayed(activityContainer)){
            return true;

        }else{
            return false;
        }
    }

    public void filterByToday() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(todayFilter));
        click(todayFilter);
        click(applyFilterButton);
    }

    public void filterByYesterday() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(yesterdayFilter));
        click(yesterdayFilter);
        click(applyFilterButton);
    }

    public void filterByLastWeek() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(lastWeekFilter));
        click(lastWeekFilter);
        click(applyFilterButton);
    }

    public void filterByLastFifteenDays() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(lastFifteenDaysFilter));
        click(lastFifteenDaysFilter);
        click(applyFilterButton);
    }

    public void filterByLastMonth() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(lastMonthFilter));
        click(lastMonthFilter);
        click(applyFilterButton);
    }

    public void filterByLastYear() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(modalFilter));
        click(periodTypeFilter);
        wait.until(ExpectedConditions.presenceOfElementLocated(lastYearFilter));
        click(lastYearFilter);
        click(applyFilterButton);
    }

    public void clearFilters() throws InterruptedException{
        filterByLastFifteenDays();
        click(clearFilterButtonActivityHome);
    }

    public void goToActivityDetail() throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfElementLocated(firstActivity));
        click(firstActivity);
        wait.until(ExpectedConditions.presenceOfElementLocated(activityNumber));
        assertTrue(isDisplayed(activityNumber));
    }
    public String verifyFilterTodaySuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(todayTitleFilter));
        WebElement dashboardText = findElement(todayTitleFilter);
        return dashboardText.getText();
    }

    public String verifyFilterYesterdaySuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(yesterdayTitleFilter));
        WebElement dashboardText = findElement(yesterdayTitleFilter);
        return dashboardText.getText();
    }

    public String verifyFilterLastWeekSuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(lastWeekTitleFilter));
        WebElement dashboardText = findElement(lastWeekTitleFilter);
        return dashboardText.getText();
    }

    public String verifyFilterLastFifteenDaysSuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(lastFifteenDaysTitleFilter));
        WebElement dashboardText = findElement(lastFifteenDaysTitleFilter);
        return dashboardText.getText();
    }

    public String verifyFilterLastMonthSuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(lastMonthTitleFilter));
        WebElement dashboardText = findElement(lastMonthTitleFilter);
        return dashboardText.getText();
    }

    public String verifyFilterLastYearSuccess()throws InterruptedException{
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(lastYearTitleFilter));
        WebElement dashboardText = findElement(lastYearTitleFilter);
        return dashboardText.getText();
    }
    
    public void verifyInputSearchPresence() {
        WebElement inputElement = wait.until(ExpectedConditions.elementToBeClickable(inputSearch));
        String actualPlaceholder = inputElement.getAttribute("placeholder");
        String expectedPlaceholder = "Buscar en tu actividad";
        assertEquals(expectedPlaceholder, actualPlaceholder);
    }


    public void typeKeyword(String keyWord) {
        wait.until(ExpectedConditions.elementToBeClickable(inputSearch));
        click(inputSearch);
        writeField(keyWord, inputSearch);
        wait.until(ExpectedConditions.presenceOfElementLocated(activityItemDeposit));
    }

    public void verifyFilterButtonIsWorking() {
        wait.until(ExpectedConditions.elementToBeClickable(buttonFilter));
        click(buttonFilter);
        wait.until(ExpectedConditions.elementToBeClickable(filterModal));
        wait.until(ExpectedConditions.elementToBeClickable(deleteFiltersButton));
        click(deleteFiltersButton);
    }
    public void verifyOperationFilterIsRendering() {
        wait.until(ExpectedConditions.elementToBeClickable(filterButton));
        click(filterButton);
        wait.until(ExpectedConditions.elementToBeClickable(operationOption));
        click(operationOption);
        wait.until(ExpectedConditions.elementToBeClickable(incomingButton));
        wait.until(ExpectedConditions.elementToBeClickable(outgoingButton));
        click(deleteFiltersButton);
    }
    public void verifyOperationFilter(String operation) {
        wait.until(ExpectedConditions.elementToBeClickable(filterButton));
        click(filterButton);
        wait.until(ExpectedConditions.elementToBeClickable(operationOption));
        click(operationOption);
        if(operation == "ingresos"){
            wait.until(ExpectedConditions.elementToBeClickable(incomingButton));
            click(incomingButton);
            wait.until(ExpectedConditions.presenceOfElementLocated(activityItemDeposit));
        }
        if(operation == "egresos"){
            wait.until(ExpectedConditions.elementToBeClickable(outgoingButton));
            click(outgoingButton);
            wait.until(ExpectedConditions.presenceOfElementLocated(activityItemOutgoing));

        }
        click(applyFiltersButton);
    }


}
