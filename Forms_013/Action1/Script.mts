'Test Case ID: Forms_013; Title: Test E-mail functionality for forms pushing
'This is checking that after you've completed a form, and the practice has selected 'E-mail me a copy' that they do receive the E-mail message.

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName, strDashURL, strRMadmin, strRMpwd, strAdminURL, strPatName, strACCT
	Dim strAccName, strPrName, strPatFName, strPatLName
	
'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_013","Global"
	
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
       strDashURL = Trim(Datatable.Value("DashURL","Global"))
       strRMadmin = Trim(Datatable.Value("RMadmin","Global"))
       strRMpwd = Trim(Datatable.Value("RMpwd","Global"))
       strAdminURL = Trim(Datatable.Value("AdminURL","Global"))
       strPatName = Trim(Datatable.Value("PatName","Global"))
       strACCT  = Trim(Datatable.Value("AcctID","Global"))
       strAccName  = Trim(Datatable.Value("AccName","Global"))
       strPrName  = Trim(Datatable.Value("PrName","Global"))
       strPatFName  = Trim(Datatable.Value("PatFName","Global"))
       strPatLName  = Trim(Datatable.Value("PatLName","Global"))
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================

'Before continuing I need to login as an RM admin, and enable messaging if it's not already turned on -- this test has kinda turned into a monster
	Call  RMsettingslogin(strRMadmin, strRMpwd)
	Browser("Patient Message Settings").Page("Account Search").WebEdit("companyId").Set strACCT @@ script infofile_;_ZIP::ssf67.xml_;_
	Browser("Patient Message Settings").Page("Account Search").WebButton("Search").Click @@ script infofile_;_ZIP::ssf68.xml_;_
	Browser("Patient Message Settings").Page("Account Search").Link("Account Name").Click	
	Browser("Patient Message Settings").Page("Account Information_2").Link("Settings").Click @@ script infofile_;_ZIP::ssf133.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebButton("General Settings").Click @@ script infofile_;_ZIP::ssf134.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientTextByDefault").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientTextByDefault").Set "ON" @@ script infofile_;_ZIP::ssf135.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientEmailByDefault").Set "ON" @@ script infofile_;_ZIP::ssf136.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebButton("Save").Click @@ script infofile_;_ZIP::ssf137.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebElement("Success").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf138.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").WebElement("Success").Check CheckPoint("Success_4") @@ script infofile_;_ZIP::ssf139.xml_;_
	Browser("Patient Message Settings").Page("Account Information_2").Link("Practices").Click @@ script infofile_;_ZIP::ssf140.xml_;_
	Browser("Patient Message Settings").Page("Account Information").Link("Practice").Click @@ script infofile_;_ZIP::ssf141.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").Link("Settings").Click @@ script infofile_;_ZIP::ssf142.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebButton("General Settings").Click @@ script infofile_;_ZIP::ssf143.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("allowClientResumeMessagingCd").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("allowClientResumeMessagingCd").Set "ON" @@ script infofile_;_ZIP::ssf144.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("activateEmail").Set "ON" @@ script infofile_;_ZIP::ssf145.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("activateSms").Set "ON" @@ script infofile_;_ZIP::ssf146.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("smsChat").Set "ON" @@ script infofile_;_ZIP::ssf147.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebButton("Save").Click @@ script infofile_;_ZIP::ssf148.xml_;_
	Browser("Patient Message Settings").Page("Practice Information_2").WebElement("Success").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Practice Information_2").WebElement("Success").Check CheckPoint("Success_5") @@ script infofile_;_ZIP::ssf73.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebButton("List Settings").Click @@ script infofile_;_ZIP::ssf74.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebList("stateSettingMap[45].selectedDe").Select "0 min" @@ script infofile_;_ZIP::ssf75.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebCheckBox("stateSettingMap[45].email").Set "ON" @@ script infofile_;_ZIP::ssf76.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebCheckBox("stateSettingMap[45].sms").Set "ON" @@ script infofile_;_ZIP::ssf77.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebButton("Save").Click @@ script infofile_;_ZIP::ssf78.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebElement("Success").WaitProperty "visible", true, 3000	
	Browser("Patient Message Settings").Page("Practice Information").WebElement("Success").Check CheckPoint("Success_3")
	Browser("Patient Message Settings").CloseAllTabs

'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)

'Go to message settings first, enable all of the messages if they aren't already
	Browser("Patient Message Settings").Page("Patient Message Settings").Link("Message Settings").Click
	Browser("Patient Message Settings").Page("Patient Message Settings").WebElement("Patient Message Settings").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Patient Message Settings").WebElement("Patient Message Settings").Check CheckPoint("Patient Message Settings")
	'This will turn on all of the checkboxes on appt messages
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Message Settings").Page("Patient Message Settings").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'Save it
	Browser("Patient Message Settings").Page("Patient Message Settings").WebButton("Save").Click
	Browser("Patient Message Settings").Page("Patient Message Settings_2").WebElement("Success").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Patient Message Settings_2").WebElement("Success").Check CheckPoint("Success")

'Head to patient forms
	 Browser("Patient Message Settings").Page("Patient Message Settings_2").Link("Patient Forms").Click
	 
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
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Check CheckPoint("Consent for Endodontic Treatment")

'If forms are setup, click on a form name
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Click
	
'If 'email a copy of completed form' isn't checked, check that off
	  If Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("sendEmail").exist(1) Then
       		Browser("Patient Message Settings").Page("Patient Form").WebCheckBox("sendEmail").Set "ON"
       End If

'Set the E-mail to the Gmail account so the message can be found later
	'Browser("Patient Form").Page("Patient Form").WebEdit("PTformsemailAddress").Set ""
	Browser("Patient Form").Page("Patient Form").WebEdit("PTformsemailAddress").Set "testerdude404@gmail.com" @@ script infofile_;_ZIP::ssf112.xml_;_
	Browser("Patient Message Settings").Page("Patient Form").WebButton("Save").Click
	wait 1
	Browser("Patient Message Settings").Page("Patient Form").Link("FormName").Click
	Browser("Patient Form").Page("Patient Form").WebEdit("PTformsemailAddress").WaitProperty "value", "testerdude404@gmail.com", 3000 @@ script infofile_;_ZIP::ssf113.xml_;_
	Browser("Patient Form").Page("Patient Form").WebEdit("PTformsemailAddress").Check CheckPoint("emailAddress") @@ script infofile_;_ZIP::ssf114.xml_;_

'enable everything
	wait 1
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Message Settings").Page("Patient Form").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'Save it
      	Browser("Patient Message Settings").Page("Patient Form").WebButton("Save").Click

'Make sure it saved
	Browser("Patient Message Settings").Page("Patient Form").WebElement("yui-gen29").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Patient Form").WebElement("yui-gen29").Check CheckPoint("YES")
	Browser("Patient Message Settings").CloseAllTabs
	
'At this point a new appt needs to be created	  @@ script infofile_;_ZIP::ssf81.xml_;_
	Window("Dentrix Appointment Book").WinMenu("Menu").Select "File;Select Patient - New Appt...	Shift+F2"
	Set WshShell = CreateObject("WScript.Shell")
	WshShell.SendKeys "{TAB 7}"
	wait 1
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_1641400_;_script infofile_;_ZIP::ssf17.xml_;_
	Window("Dentrix Appointment Book").Dialog("Enter New Patient Information").WinEdit("Last").Set strPatLName @@ hightlight id_;_1772458_;_script infofile_;_ZIP::ssf18.xml_;_
	Window("Dentrix Appointment Book").Dialog("Enter New Patient Information").WinEdit("First").Set strPatFName @@ hightlight id_;_6883878_;_script infofile_;_ZIP::ssf20.xml_;_
	Window("Dentrix Appointment Book").Dialog("Enter New Patient Information").WinEdit("Email:").Set "testerdude404@gmail.com" @@ hightlight id_;_1379230_;_script infofile_;_ZIP::ssf21.xml_;_
	Window("Dentrix Appointment Book").Dialog("Enter New Patient Information").WinEdit("Mobile #:").Set "8257127753" @@ hightlight id_;_4589684_;_script infofile_;_ZIP::ssf22.xml_;_
	Window("Dentrix Appointment Book").Dialog("Enter New Patient Information").WinButton("OK").Click @@ hightlight id_;_1182616_;_script infofile_;_ZIP::ssf23.xml_;_
	wait 1
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">").Click @@ hightlight id_;_4523924_;_script infofile_;_ZIP::ssf24.xml_;_
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_4720440_;_script infofile_;_ZIP::ssf25.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Appointment Description").Set "Scaling" @@ hightlight id_;_4655220_;_script infofile_;_ZIP::ssf26.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Edit").Set "60" @@ hightlight id_;_5900600_;_script infofile_;_ZIP::ssf27.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_2").Click @@ hightlight id_;_7014902_;_script infofile_;_ZIP::ssf28.xml_;_
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_2230180_;_script infofile_;_ZIP::ssf29.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Click @@ hightlight id_;_8391140_;_script infofile_;_ZIP::ssf33.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight @@ hightlight id_;_5179214_;_script infofile_;_ZIP::ssf35.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight @@ hightlight id_;_5179214_;_script infofile_;_ZIP::ssf36.xml_;_
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight @@ hightlight id_;_5179214_;_script infofile_;_ZIP::ssf37.xml_;_
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_3934872_;_script infofile_;_ZIP::ssf41.xml_;_
	wait 1
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_4").Click @@ hightlight id_;_5244810_;_script infofile_;_ZIP::ssf45.xml_;_
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_4065964_;_script infofile_;_ZIP::ssf46.xml_;_
	wait 1
	WshShell.SendKeys "{TAB 4}"
	WshShell.SendKeys "{ENTER}" @@ hightlight id_;_2951788_;_script infofile_;_ZIP::ssf42.xml_;_
	If Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("OK").Exist(1) Then
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("OK").Click
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Click @@ hightlight id_;_6818038_;_script infofile_;_ZIP::ssf128.xml_;_
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight  @@ hightlight id_;_133644_;_script infofile_;_ZIP::ssf129.xml_;_
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micReturn  @@ hightlight id_;_133644_;_script infofile_;_ZIP::ssf130.xml_;_
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Type  micTab  @@ hightlight id_;_6818038_;_script infofile_;_ZIP::ssf131.xml_;_
            Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Staff:").Type  micReturn  @@ hightlight id_;_1837460_;_script infofile_;_ZIP::ssf132.xml_;_
	End If
		
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("Yes").Click @@ hightlight id_;_198686_;_script infofile_;_ZIP::ssf44.xml_;_


'Now, it should automatically send out a new patient welcome message, which is going to have a forms link on it, and I'm going to use that to tie it all together.

'In order to speed this up, login as a RM admin and do a mini delta, wait 10s, then a process data
	Call  RMsettingslogin(strRMadmin, strRMpwd)
	Browser("Patient Message Settings").Page("Account Search").WebEdit("companyId").Set strACCT
	Browser("Patient Message Settings").Page("Account Search").WebButton("Search").Click @@ script infofile_;_ZIP::ssf68.xml_;_
	Browser("Patient Message Settings").Page("Account Search").Link("Account Name").Click
	Browser("Patient Message Settings").Page("Account Information").Link("Support").Click @@ script infofile_;_ZIP::ssf47.xml_;_
	Browser("Patient Message Settings").Page("Account Information").WebButton("Mini-Delta").Click @@ script infofile_;_ZIP::ssf48.xml_;_
	wait 2
	Browser("Patient Message Settings").HandleDialog micOK @@ hightlight id_;_6424112_;_script infofile_;_ZIP::ssf49.xml_;_
	wait 8
	Browser("Patient Message Settings").Page("Account Information").WebButton("Process Data").Click @@ script infofile_;_ZIP::ssf50.xml_;_
	wait 2
	Browser("Patient Message Settings").HandleDialog micOK @@ hightlight id_;_6424112_;_script infofile_;_ZIP::ssf51.xml_;_
	Browser("Patient Message Settings").Page("Practice Information").WebButton("Logout").Click @@ script infofile_;_ZIP::ssf52.xml_;_
	Browser("Patient Message Settings").CloseAllTabs


'Check the Gmail account, and see if we've received the new patient welcome message
	SystemUtil.Run "chrome.exe", ""
	Call clearcookies()
	SystemUtil.Run "chrome.exe", "https://gmail.com/"	
	Browser("SignForms - Client Admin").Page("Gmail").WebEdit("Email or phone").Set "testerdude404"
	Browser("SignForms - Client Admin").Page("Gmail").WebElement("WebElement").Click
	Browser("SignForms - Client Admin").Page("Gmail_2").WebEdit("Enter your password").SetSecure "600703861fda1d3183319962deb6f6f649fe32c79f8cadbdff1ffebf328a"
	Browser("SignForms - Client Admin").Page("Gmail_2").WebElement("WebElement").Click
	Browser("SignForms - Client Admin").Page("Inbox").WebButton("Compose").WaitProperty "visible", true, 3000 
	Browser("SignForms - Client Admin").Page("Inbox").WebButton("Compose").Check CheckPoint("Compose") @@ script infofile_;_ZIP::ssf99.xml_;_
	
	'Let's try finding and filling out that form
		Browser("SignForms - Client Admin").Page("Inbox").Link("Welcome to Jerry's Mobile_2").Click @@ script infofile_;_ZIP::ssf100.xml_;_
		Browser("SignForms - Client Admin").Page("Inbox").Link("click here").Click @@ script infofile_;_ZIP::ssf101.xml_;_
		Browser("FormsPage").Page("TheForm").WebEdit("patient_email").Set "testerdude404@gmail.com"
		Browser("FormsPage").Page("TheForm").WebEdit("patient_name").Set "John Doe"
		Browser("FormsPage").Page("TheForm").WebElement("Signature").Click
		Browser("FormsPage").Page("TheForm").WebEdit("Answer").Set "3"
		Browser("FormsPage").Page("TheForm").WebButton("Send").Click
		Browser("FormsPage").Page("TheForm").WebElement("Thank you! Your form was").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf115.xml_;_
		Browser("FormsPage").Page("TheForm").WebElement("Thank you! Your form was").Check CheckPoint("Thank you! Your form was sent successfully! Go to my forms landing page by clicking Here_2") @@ script infofile_;_ZIP::ssf116.xml_;_
		Browser("FormsPage").Page("TheForm").Sync
		Browser("FormsPage").Close 

	'Need to refresh the inbox and we should have our completed form
 		wait 10
 		Browser("SignForms - Client Admin").Refresh  				
		Browser("SignForms - Client Admin").Page("Inbox").Link("Form submitted").Click @@ script infofile_;_ZIP::ssf120.xml_;_
		Browser("SignForms - Client Admin").Page("Inbox").Link("view the completed form").Click @@ script infofile_;_ZIP::ssf121.xml_;_
		Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Set strUserName @@ script infofile_;_ZIP::ssf122.xml_;_
		Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("password").SetSecure strPass @@ script infofile_;_ZIP::ssf123.xml_;_
		Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Click
		Browser("FormsPage").Page("formDownloadPdf.pdf").WebElement("EMBED FORM").WaitProperty "visible", true, 3000		 
		Browser("FormsPage").Page("formDownloadPdf.pdf").WebElement("EMBED FORM").Check CheckPoint("Form") @@ script infofile_;_ZIP::ssf126.xml_;_
		
'Clear cookies one last time and close it down
		Call clearcookies()
		Browser("FormsPage").CloseAllTabs
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_013Results.xlsx","Global","Forms"
