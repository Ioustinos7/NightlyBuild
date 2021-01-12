'Title: Add/remove a MarketDental form from your account

'Declaring variables
Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName, strAdditionalForm

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_005","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
		
	'Get the values for the variables
	strFormName = Trim(Datatable.Value("FormName","Global"))
	strAdditionalForm = Trim(Datatable.Value("ExtraForm","Global"))
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	
	'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then
	
'===================================================================================================================================================

'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)
		
'Head to patient forms
	 Call gettopatientforms()
	
'Click on the 'add forms here' button
	Browser("Patient Form").Page("Patient Form").Link("Add/Edit Forms").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("My Forms").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Add New Forms").Check CheckPoint("Add New Forms") @@ script infofile_;_ZIP::ssf3.xml_;_

'Select a 'new' form and add it to your account
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("SignForm").Click @@ script infofile_;_ZIP::ssf4.xml_;_
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebButton("Submit").Click @@ script infofile_;_ZIP::ssf5.xml_;_
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Your forms were succesfuly").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf6.xml_;_
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Your forms were succesfuly").Check CheckPoint("Your forms were succesfuly added. Review them below!") @@ script infofile_;_ZIP::ssf7.xml_;_

'Close the extra tab
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").Sync
	Browser("SignForms - Client Admin").Close @@ hightlight id_;_199306_;_script infofile_;_ZIP::ssf8.xml_;_

'Head back to the dashboard
	Browser("Patient Form").Page("Patient Form").Sync
	Browser("Patient Form").Refresh @@ hightlight id_;_199306_;_script infofile_;_ZIP::ssf9.xml_;_

'Make sure that form is listed in your list
	Browser("Patient Form").Page("Patient Form").Link("Form").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Patient Form").Link("Form").Check CheckPoint("AddedForm") @@ script infofile_;_ZIP::ssf10.xml_;_

'Click on 'add forms here' again
	Browser("Patient Form").Page("Patient Form").Link("Add/Edit Forms").Click
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("My Forms").WaitProperty "visible", true, 3000
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Add New Forms").Check CheckPoint("Add New Forms")
	
'Remove the previously added form
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("SignForm").Click
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebButton("Submit").Click
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Your forms were succesfuly").WaitProperty "visible", true, 3000
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Your forms were succesfuly").Check CheckPoint("Your forms were succesfuly added. Review them below!")

'Close the extra tab
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").Sync
	Browser("SignForms - Client Admin").Close
	
'Refresh the page to load changes
	Browser("Patient Form").Page("Patient Form").Sync
	Browser("Patient Form").Refresh

'Go back and ensure it's gone
	If Browser("Patient Form").Page("Patient Form").Link("Form").Exist(0) Then
	    Call exitforms()
	    ElseIf Browser("Patient Form").Page("Patient Form").Link("Form").Exist(1) Then
	    Call EndTest (strEvent, strReason, strDescription)
	End If
	
'Logout
	'Call exitforms()
	
'Close all the tabs
	Call closealltabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_005Results.xlsx","Global","Forms"
