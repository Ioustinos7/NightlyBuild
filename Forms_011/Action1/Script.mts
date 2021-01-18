'Test Case ID: Forms_011; Title: Add forms to just E-mail or just SMS
'Test Description: This test will just verify that you're able to add a form to both 'just e-mail' and 'just sms' (this was a bug)

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName, strKey, strRMadmin, strRMpwd, strDashURL, strMSGtoChk

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_011","Global"
	
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
       strMSGtoChk = Trim(Datatable.Value("MSGtoChk","Global"))
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================


'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)

'Go to message settings first, enable all of the messages if they aren't already
	Browser("Patient Message Settings").Page("Patient Message Settings").Link("Message Settings").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	Browser("Patient Message Settings").Page("Patient Message Settings").WebElement("Patient Message Settings").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("Patient Message Settings").Page("Patient Message Settings").WebElement("Patient Message Settings").Check CheckPoint("Patient Message Settings") @@ script infofile_;_ZIP::ssf3.xml_;_
	'This will turn on all of the checkboxes on appt messages
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Message Settings").Page("Patient Message Settings").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'Save it
	Browser("Patient Message Settings").Page("Patient Message Settings").WebButton("Save").Click @@ script infofile_;_ZIP::ssf4.xml_;_
	Browser("Patient Message Settings").Page("Patient Message Settings_2").WebElement("Success").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf5.xml_;_
	Browser("Patient Message Settings").Page("Patient Message Settings_2").WebElement("Success").Check CheckPoint("Success") @@ script infofile_;_ZIP::ssf6.xml_;_
	
'Head to patient forms
	 Browser("Patient Message Settings").Page("Patient Message Settings_2").Link("Patient Forms").Click @@ script infofile_;_ZIP::ssf7.xml_;_
	 
'If forms aren't setup I'll need to add in the key
	If Browser("Patient Message Settings").Page("Patient Form").Link("Click here to create a").exist(1) Then
		Call  clearcookies()
		Call exitforms()
		Browser("CreationTime:=0").CloseAllTabs()		
		Call RMadminlogin(strRMadmin, strRMpwd)
		Browser("Patient Form").Page("Key Indicators").Link("Patient Forms").Click
		Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").Set strKey
		Browser("Patient Form").Page("Patient Form").WebButton("Save_2").Click
		Browser("Patient Form").Page("Patient Form").WebEdit("marketDentalKey1").WaitProperty "value", strKey, 3000
		Browser("Patient Form").Page("Patient Form_2").WebEdit("marketDentalKey").Check CheckPoint("marketDentalKey_3")
		Call  clearcookies()
		Call exitforms()
		Browser("CreationTime:=0").CloseAllTabs()
		Call pradminlogin(strUserName, strPass)
		 Browser("Patient Message Settings").Page("Patient Message Settings_2").Link("Patient Forms").Click		
	End If
		
'Go back to patient forms, and ensure that they're there now
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf23.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Check CheckPoint("Consent for Endodontic Treatment") @@ script infofile_;_ZIP::ssf24.xml_;_

'If forms are setup, click on a form name
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Click @@ script infofile_;_ZIP::ssf8.xml_;_

'Disable all of the selections first
	wait 1
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Message Settings").Page("Patient Form").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "OFF" 
	   ' msgbox Err.Number
	Next

'If 'email a copy of completed form' isn't checked, check that off
	  If Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("sendEmail").exist(1) Then
       		Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("sendEmail").Set "ON"
       End If

'Enable just E-mail for all messages
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("newPatientEmail").Set "ON" @@ script infofile_;_ZIP::ssf12.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("todaysPatientEmail").Set "ON" @@ script infofile_;_ZIP::ssf13.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("reminderEmail").Set "ON" @@ script infofile_;_ZIP::ssf14.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("oneWeekEmail").Set "ON" @@ script infofile_;_ZIP::ssf15.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("twoWeekEmail").Set "ON" @@ script infofile_;_ZIP::ssf16.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebButton("Save").Click @@ script infofile_;_ZIP::ssf22.xml_;_

'Make sure it saved
	Browser("Patient Message Settings").Page("Patient Form").WebElement("yui-gen29").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Patient Form").WebElement("yui-gen29").Check CheckPoint("YES") @@ script infofile_;_ZIP::ssf25.xml_;_

'Head to patient messages
	Browser("Patient Message Settings").Page("Patient Form").Link("Patient Messages").Click @@ script infofile_;_ZIP::ssf26.xml_;_
	Browser("Patient Message Settings").Page("Patient Messages").WebElement("Email Preview:").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf27.xml_;_

'Click on one of the messages
	Browser("Patient Message Settings").Page("Patient Messages").WebList("select").Select strMSGtoChk @@ script infofile_;_ZIP::ssf28.xml_;_

'Check that the forms link is visible
	Browser("Patient Message Settings").Page("Patient Messages").Frame("Frame").Link("click here").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf29.xml_;_
	Browser("Patient Message Settings").Page("Patient Messages").Frame("Frame").Link("click here").Check CheckPoint("click here_2") @@ script infofile_;_ZIP::ssf56.xml_;_

'Click it, and verify the form appears
	Browser("Patient Message Settings").Page("Patient Messages").Frame("Frame").Link("click here").Click @@ script infofile_;_ZIP::ssf31.xml_;_
	Browser("SignForms - Client Admin").Page("Forms").WebElement("Patient Forms").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf32.xml_;_
	Browser("SignForms - Client Admin").Page("Forms").Link("Outstanding").Click @@ script infofile_;_ZIP::ssf33.xml_;_
	Browser("SignForms - Client Admin").Page("Forms2").Link("SignForms").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf34.xml_;_
	Browser("SignForms - Client Admin").Page("Forms2").Link("SignForms").Check CheckPoint("SignForms_2") @@ script infofile_;_ZIP::ssf35.xml_;_
	Browser("SignForms - Client Admin").Page("Forms2").Sync
	Browser("SignForms - Client Admin").Close @@ hightlight id_;_2754254_;_script infofile_;_ZIP::ssf36.xml_;_
	
'Ensure there's no link added to the SMS version of that message, if so end test
	Browser("Patient Message Settings").Page("Patient Messages").Sync
	Browser("Patient Message Settings").Refresh @@ hightlight id_;_2951704_;_script infofile_;_ZIP::ssf37.xml_;_
	Browser("Patient Message Settings").Page("Patient Messages").WebList("select").Select strMSGtoChk @@ script infofile_;_ZIP::ssf38.xml_;_
	If Browser("Patient Message Settings").Page("Patient Messages").WebElement("smsPreview").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	End If
	
'Head back to patient forms
	Browser("Patient Message Settings").Page("Patient Messages").Link("Patient Forms").Click
	Browser("Patient Message Settings").Page("Patient Form").WebElement("Integrated Patient Forms").WaitProperty "visible", true, 3000

'Click on the form
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Click @@ script infofile_;_ZIP::ssf51.xml_;_

'Remove from all of the E-mail messages, and add to all of the SMS messages
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("newPatientEmail").Set "OFF"
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("todaysPatientEmail").Set "OFF" @@ script infofile_;_ZIP::ssf43.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("reminderEmail").Set "OFF" @@ script infofile_;_ZIP::ssf44.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("oneWeekEmail").Set "OFF" @@ script infofile_;_ZIP::ssf45.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("twoWeekEmail").Set "OFF" @@ script infofile_;_ZIP::ssf46.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("twoWeekSms").Set "ON" @@ script infofile_;_ZIP::ssf47.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("oneWeekSms").Set "ON" @@ script infofile_;_ZIP::ssf48.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("reminderSms").Set "ON" @@ script infofile_;_ZIP::ssf49.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("todaysPatientSms").Set "ON" @@ script infofile_;_ZIP::ssf50.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("newPatientSms").Set "ON"
	Browser("Patient Message Settings").Page("Patient Form").WebButton("Save").Click
	Browser("Patient Message Settings").Page("Patient Form").WebElement("yui-gen29").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Sync
	
'Go to patient messages
	Browser("Patient Message Settings").Page("Patient Form").Link("Patient Messages").Click
'Click on a message
       Browser("Patient Message Settings").Page("Patient Messages").WebList("select").Select strMSGtoChk
       Browser("Patient Message Settings").Page("Patient Messages").WebElement("smsPreview").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf55.xml_;_
	Browser("Patient Message Settings").Page("Patient Messages").WebButton("Edit Wording").Click @@ script infofile_;_ZIP::ssf57.xml_;_
	Browser("Patient Message Settings").Page("Message Wording - Reminder").WebElement("New Message").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf58.xml_;_
'Ensure the link is visible on the SMS version
	Browser("Patient Message Settings").Page("Message Wording - Reminder").WebElement("existingSmsPreview").Check CheckPoint("existingSmsPreview")
	Browser("Patient Message Settings").Page("Message Wording - Reminder").Link("Back").Click @@ script infofile_;_ZIP::ssf60.xml_;_

'Check that there's no 'click here' link on the E-mail message
	If Browser("Patient Message Settings").Page("Patient Messages").Frame("Frame").WebElement("Email Preview").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	End If
	
'Logout
	Call exitforms()
	
'Close all the tabs
	Call closealltabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_011Results.xlsx","Global","Forms"
