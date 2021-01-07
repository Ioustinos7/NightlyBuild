'This test is going to verify that practice admins, and standard users ARE able to access the forms they should have access to

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, dloadform, viewform

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_003","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount
'===================================================================================================================================================
'Iterate through rows of data in the excel spreadsheet
	
	For intLoop = 1 To intRowCount
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
	Call gettoURL(viewform)

'Wait until it redirects to the login page
	Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").WaitProperty "visible", true, 3000

'Login with valid credentials 
	Call formlogin(strUserName,strPass)

'Wait until the form loads
	Browser("formDownloadPdf.pdf").Page("formDownloadPdf.pdf").WebElement("PdfForm").WaitProperty "visible", true, 3000	

'Check that it's really there
	Browser("formDownloadPdf.pdf").Page("formDownloadPdf.pdf").WebElement("PdfForm").Check CheckPoint("FormVisible") @@ script infofile_;_ZIP::ssf19.xml_;_

'Delete all our cookies, as this can cause issues	
	Call clearcookies()
	
'Close all the tabs
	Browser("formDownloadPdf.pdf").CloseAllTabs

'Let's try downloading the form as well
	Call gettoURL(dloadform)
	
'Wait until it redirects to the login page
	Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").WaitProperty "visible", true, 3000

'Login with valid credentials 
	Call formlogin(strUserName,strPass)

'Check that you were able to access the form and that it started downloading
	Browser("formDownloadPdf.pdf").TextObject("Downloading the completed").WaitProperty "visible", true, 3000

'Delete all our cookies, as this can cause issues	
	Call clearcookies()
	
'Close all the tabs
	Browser("formDownloadPdf.pdf").CloseAllTabs
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
 'Go to the next row of data if there is any	
 	Next
 
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_003Results.xlsx","Global","Forms"
