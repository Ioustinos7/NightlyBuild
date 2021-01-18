'Test Case ID: Forms_007; Title: Verify you can add forms to a 'new' market dental account
'Test Description 
'** This should be a reusable action with data for all PMS's supported for forms that just iterates through and tests each one (Dentrix, Tracker, Eagle etc)
'This is just to test that you can add in a MarketDental key, and that the forms pull in. Other tests will verify that forms are added to messages

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName, strKey, strRMadmin, strRMpwd, strDashURL

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_007","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	strFormName = Trim(Datatable.Value("FormName","Global"))
	strKey = Trim(Datatable.Value("MDKey","Global"))
	strRMadmin = Trim(Datatable.Value("RMadmin","Global"))
	strRMpwd = Trim(Datatable.Value("RMpwd","Global"))
       strDashURL = Trim(Datatable.Value("DashURL","Global"))
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================

'Login as RecallMax admin, and remove MDKey if it's present
	Call RMadminlogin(strRMadmin, strRMpwd)
	Browser("Patient Form").Page("Key Indicators").Link("Patient Forms").Click @@ script infofile_;_ZIP::ssf25.xml_;_
	strDashKey = Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").GetROProperty("value") @@ script infofile_;_ZIP::ssf10.xml_;_
	If strDashKey= strKey Then
			Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").Set ""
			Browser("Patient Form").Page("Patient Form").WebButton("Save_2").Click		
		End If

'Make sure	that it's been set to an empty string
	Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").WaitProperty "value", "", 3000 @@ script infofile_;_ZIP::ssf14.xml_;_
	Browser("Patient Form").Page("Patient Form_2").WebEdit("marketDentalKey").Check CheckPoint("marketDentalKey_3")

	
'Close all the tabs, UFT gets confused very easily if there's 2 of the same tabs open
	Browser("CreationTime:=0").CloseAllTabs()
 
'Login as pr admin, see that it's not integrated, and click the link to 'sign-up'
	Call pradminlogin(strUserName, strPass)
	Call gettopatientforms()
	Browser("Patient Form").Page("Patient Form").Link("Click here to create a").Click @@ script infofile_;_ZIP::ssf16.xml_;_

'Ensure the market dental site comes up
	Browser("SignForms - Client Admin").Page("RecallMax ™ - Dental Marketing").WebElement("logo").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf36.xml_;_
	Browser("SignForms - Client Admin").Page("RecallMax ™ - Dental Marketing").WebElement("Connect SignForms to your").Check CheckPoint("Connect SignForms to your Dental Software in 2 minutes_2") @@ script infofile_;_ZIP::ssf37.xml_;_
	Browser("SignForms - Client Admin").Page("RecallMax ™ - Dental Marketing").Sync
 @@ hightlight id_;_66632_;_script infofile_;_ZIP::ssf48.xml_;_
	
'Close all of the open tabs
	Browser("CreationTime:=0").CloseAllTabs()

'Login as RecallMax admin again, enter MDKey
	Call RMadminlogin(strRMadmin, strRMpwd)
	Browser("Patient Form").Page("Key Indicators").Link("Patient Forms").Click
	strDashKey = Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").GetROProperty("value")
	If strDashKey <> strKey Then
	Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").Set strKey
	Browser("Patient Form").Page("Patient Form").WebButton("Save_2").Click
	Else
		Call EndTest (strEvent, strReason, strDescription)		
	End If
	Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").WaitProperty "value", strKey, 3000 @@ script infofile_;_ZIP::ssf26.xml_;_
	Browser("Patient Form").Page("Patient Form_2").WebEdit("marketDentalKey").Check CheckPoint("marketDentalKey_3") @@ script infofile_;_ZIP::ssf27.xml_;_
	
'Logout
	Call exitforms()

'Go back to practice login, refresh the page
	Call pradminlogin(strUserName, strPass)
	Call gettopatientforms()

'Verify forms are listed here
	Browser("Patient Form").Page("Patient Form").Link("Form").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_
	Browser("Patient Form").Page("Patient Form").Link("Form").Check CheckPoint("Forms") @@ script infofile_;_ZIP::ssf29.xml_;_

'Click on a form to preview, ensure it appears
	'Browser("Patient Form").Page("Patient Form").Link("Form").Click
	Browser("Patient Form").Page("Patient Form").Image("ViewForm").Click @@ script infofile_;_ZIP::ssf30.xml_;_
	Browser("MarketDental").Page("SignForms").Link("SignForms").WaitProperty "visible", true, 3000
	Browser("MarketDental").Page("SignForms").Link("SignForms").Check CheckPoint("SignForms") @@ hightlight id_;_3211354_;_script infofile_;_ZIP::ssf33.xml_;_

'Logout and close tabs
	'Call exitforms()
	 	
'Close all the tabs
	Call clearcookies()
	Browser("CreationTime:=0").CloseAllTabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_007Results.xlsx","Global","Forms"


