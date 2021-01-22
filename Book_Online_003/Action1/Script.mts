'ID: Book_Online_003 Title: Verify Date Selector
'Expected Result(s):
'1. User should have the ability to select date from Date selector, i.e. it should display calander to choose from and ability to navigate through day, month and year
'2. System should display the selected date in Date Selector on the header of the Scheduler

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strTreat, strProvider

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_011","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	strTreat = Trim(Datatable.Value("Treatment","Global"))
	strProvider = Trim(Datatable.Value("ProviderName","Global"))
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================

'I'll have to login first, add a treatment type, and add in a provider
	Call BOLogin (strUserName, strPass)

'Head to providers/treatment
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click

'Make sure there already isn't any treatment setup
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up")

'Add in a new treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Treatment").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebEdit("name").Set strTreat
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("5 Minutes10 Minutes15").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("60 Minutes").Click 'I'm setting it to an hour, just so the options avail are on the hour
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure the treatment saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Check CheckPoint("TreatmentType")
	
'Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")

'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")

'Check that the schedule page loaded and that we're on today's date
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DayHeader").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf1.xml_;_
	today = Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("TodaysDate").GetROProperty("value")
	If Trim(date) <> Trim(today) Then
		Call EndTest (strEvent, strReason, strDescription) 'Fail the test if today's date didn't load
	End If
	
'Make sure you can open up the calendar and select a day
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DayHeader").Click @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Next").Click @@ script infofile_;_ZIP::ssf3.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Next").Click @@ script infofile_;_ZIP::ssf4.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Next").Click @@ script infofile_;_ZIP::ssf5.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Next").Click @@ script infofile_;_ZIP::ssf6.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("1").Click @@ script infofile_;_ZIP::ssf7.xml_;_
	
'Ensure that whatever date you've selected is now visible in the header
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DayHeader").WaitProperty "visible", true, 3000
	futureday = Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("TodaysDate").GetROProperty("value")
	If datediff("m", date, futureday) <> 4 Then
		Call EndTest (strEvent, strReason, strDescription) 'Fail the test if the future date didn't load, or the date didn't change
	End If
	
'Go to providers/treatment
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click

'Make sure the provider deleted successfully
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")

'Delete the treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("SavedTreatment").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_2")

'Logout and close tabs
	Call BOLogout()
	Call preclearcookies()
'===================================================================================================================================================

'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
'export the results
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_003Results.xlsx","Global","Forms"
