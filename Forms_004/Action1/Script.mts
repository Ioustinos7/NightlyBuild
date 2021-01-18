'This test is going to verify that practice admins, and standard users ARE NOT able to access the forms they shouldn't have access to

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, dloadform, viewform

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_004","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================

'Iterate through rows of data in the excel spreadsheet	
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	

'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	dloadform = Trim(Datatable.Value("DloadForm","Global"))
	viewform = Trim(Datatable.Value("ViewForm","Global"))
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================

'Try to open a 'view form' link
	Call gettoURL(viewForm)
	
'Wait until it redirects to the login page
	Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").WaitProperty "visible", true, 3000
	
'Login with valid credentials of someone at another practice
	Call formlogin(strUserName,strPass)
	
'Check that we were not able to access the form
	Browser("Forms Browser").Page("Forms Page").WebElement("Error").WaitProperty "visible", true, 3000
	Browser("Forms Browser").Page("https://stagingnormal.recallma").WebElement("There was a problem processing").Check CheckPoint("There was a problem") @@ script infofile_;_ZIP::ssf10.xml_;_
	
'Clear cookies and close the browser
	 Call clearcookies()
	 Browser("Forms Browser").CloseAllTabs
	 
'Try to open a 'download form' link
  	Call gettoURL(dloadform)
  	
'Wait until it redirects to the login page	
	Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").WaitProperty "visible", true, 3000
	
'Login with valid credentials of someone at another practice
	Call formlogin(strUserName,strPass)
	
'Check that we are not able to access the form
	Browser("Forms Browser").Page("Forms Page").WebElement("Error").WaitProperty "visible", true, 3000
	Browser("Forms Browser").Page("https://stagingnormal.recallma").WebElement("There was a problem processing").Check CheckPoint("There was a problem")	
	
'Clear the cookies and close all tabs
	 Call clearcookies()
	 Browser("Forms Browser").CloseAllTabs
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
 	
 'This ends the loop so the test can continue onto the next row
 	Next
 
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_004Results.xlsx","Global","Forms"
