package com.ExtentReports;

import com.aventstack.extentreports.ExtentReports;

public class ExtentFactory {

    public static ExtentReports getInstance() {

        ExtentReports extent = new ExtentReports();
        extent.setSystemInfo("Selenium Version", "4.9.1");
        extent.setSystemInfo("Platform","Windows");

        return extent;
    }
}
