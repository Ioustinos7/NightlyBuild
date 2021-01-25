'ID: Book_Online_000 Title: Basic login test
'Description: This is to verify that a practice admin can login, access all of the pages, then logoff. Also -- A standard user will try to access and that should fail

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_000","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================
'get to the book online page
	Call BOLogin (strUserName, strPass) @@ script infofile_;_ZIP::ssf9.xml_;_
	
'Head to providers/treatments
	Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf11.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf12.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Check CheckPoint("Add New Treatment_2") @@ script infofile_;_ZIP::ssf39.xml_;_
 @@ script infofile_;_ZIP::ssf10.xml_;_
 'Go to the schedule page
 	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click @@ script infofile_;_ZIP::ssf14.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf15.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs") @@ script infofile_;_ZIP::ssf16.xml_;_
	
'Go to the 'practice closures' page
	Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Practice Closures").Click @@ script infofile_;_ZIP::ssf17.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Practice").WebButton("Add Practice Closure").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Practice").WebButton("Add Practice Closure").Check CheckPoint("Add Practice Closure") @@ script infofile_;_ZIP::ssf19.xml_;_
	
'Head to provider time off
	Browser("RecallMax™ Login").Page("Book Online - Practice").Link("Provider Time Off").Click @@ script infofile_;_ZIP::ssf20.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Provider").WebElement("Provider Time Off").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Provider_2").WebElement("Provider Time Off").Check CheckPoint("Provider Time Off") @@ script infofile_;_ZIP::ssf41.xml_;_
		
'Head to settings
	Browser("RecallMax™ Login").Page("Book Online - Provider").Link("Settings").Click @@ script infofile_;_ZIP::ssf23.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Settings").WebElement("settingsHeader").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf24.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Settings").WebElement("settingsHeader").Check CheckPoint("settingsHeader") @@ script infofile_;_ZIP::ssf25.xml_;_
	
'Head to website setup
	Browser("RecallMax™ Login").Page("Book Online - Settings").Link("Website Setup").Click @@ script infofile_;_ZIP::ssf26.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Website").WebButton("View your Patient Book").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf27.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Website").WebButton("View your Patient Book").Check CheckPoint("View your Patient Book Online_2") @@ script infofile_;_ZIP::ssf29.xml_;_
	
'Go to activate
	Browser("RecallMax™ Login").Page("Book Online - Website").Link("Activate").Click @@ script infofile_;_ZIP::ssf30.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate").WebElement("Activate Online Booking").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf31.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate").WebElement("Activate Online Booking").Check CheckPoint("Activate Online Booking") @@ script infofile_;_ZIP::ssf32.xml_;_
	
'Logout + close tabs
	Call clearcookies()	
	Call BOLogout()

'============================================================================================================================================

'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
'export the results
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_000Results.xlsx","Global","Forms"
