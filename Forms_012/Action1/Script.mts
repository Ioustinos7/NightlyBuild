
'Test Case ID: Forms_012; Title: Test doc-drop functionality for pushing form into PMS (Dentrix in this case)
'This is checking that after you've completed a form, and the practice has selected a location for the file to drop, that the files makes it to the PMS.

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName, strRMadmin, strRMpwd, strPatName
	Dim strAccName, strPrName, strPatFName, strPatLName, strACCT, strPushDest, strSearchName
	
'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_012","Global"
	
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
       strRMadmin = Trim(Datatable.Value("RMadmin","Global"))
       strRMpwd = Trim(Datatable.Value("RMpwd","Global"))
       strPatName = Trim(Datatable.Value("PatName","Global"))
       strACCT  = Trim(Datatable.Value("AcctID","Global"))
       strAccName  = Trim(Datatable.Value("AccName","Global"))
       strPrName  = Trim(Datatable.Value("PrName","Global"))
       strPatFName  = Trim(Datatable.Value("PatFName","Global"))
       strPatLName  = Trim(Datatable.Value("PatLName","Global"))
       strPushDest = Trim(Datatable.Value("PushDest","Global"))
       strSearchName = Trim(Datatable.Value("SearchName","Global"))
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================
	
'Before continuing I need to login as an RM admin, and enable messaging if it's not already turned on -- this test has kinda turned into a monster
	Call  RMsettingslogin(strRMadmin, strRMpwd)
	Browser("Patient Message Settings").Page("Account Search").WebEdit("companyId").Set strACCT
	Browser("Patient Message Settings").Page("Account Search").WebButton("Search").Click
	Browser("Patient Message Settings").Page("Account Search").Link("Account Name").Click	
	Browser("Patient Message Settings").Page("Account Information_2").Link("Settings").Click
	Browser("Patient Message Settings").Page("Account Information_2").WebButton("General Settings").Click
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientTextByDefault").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientTextByDefault").Set "ON"
	Browser("Patient Message Settings").Page("Account Information_2").WebCheckBox("patientEmailByDefault").Set "ON"
	Browser("Patient Message Settings").Page("Account Information_2").WebButton("Save").Click
	Browser("Patient Message Settings").Page("Account Information_2").WebElement("Success").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Account Information_2").WebElement("Success").Check CheckPoint("Success_4")
	Browser("Patient Message Settings").Page("Account Information_2").Link("Practices").Click
	Browser("Patient Message Settings").Page("Account Information").Link("Practice").Click
	Browser("Patient Message Settings").Page("Practice Information_2").Link("Settings").Click
	Browser("Patient Message Settings").Page("Practice Information_2").WebButton("General Settings").Click
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("allowClientResumeMessagingCd").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("allowClientResumeMessagingCd").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("activateEmail").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("activateSms").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information_2").WebCheckBox("smsChat").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information_2").WebButton("Save").Click
	Browser("Patient Message Settings").Page("Practice Information_2").WebElement("Success").WaitProperty "visible", true, 3000
	Browser("Patient Message Settings").Page("Practice Information_2").WebElement("Success").Check CheckPoint("Success_5")
	Browser("Patient Message Settings").Page("Practice Information").WebButton("List Settings").Click
	Browser("Patient Message Settings").Page("Practice Information").WebList("stateSettingMap[45].selectedDe").Select "0 min"
	Browser("Patient Message Settings").Page("Practice Information").WebCheckBox("stateSettingMap[45].email").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information").WebCheckBox("stateSettingMap[45].sms").Set "ON"
	Browser("Patient Message Settings").Page("Practice Information").WebButton("Save").Click
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
	Browser("Patient Form").Page("Patient Form_2").WebList("completedFormDestination").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_

'Select the drop-down, and set it to store somewhere in Dentrix, for now it can be misc
	Browser("Patient Form").Page("Patient Form_2").WebList("completedFormDestination").Select strPushDest @@ script infofile_;_ZIP::ssf1.xml_;_
 @@ script infofile_;_ZIP::ssf4.xml_;_
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

'Check that a form is selected to push somewhere into the scheduler
	Browser("Patient Form").Page("Patient Form_2").WebElement("LocationofForms").WaitProperty "visible", true, 3000
	'Browser("Patient Form").Page("Patient Form_2").WebElement("yui-gen26").Check CheckPoint("yui-gen26") @@ script infofile_;_ZIP::ssf40.xml_;_
	'Browser("Patient Form").Page("Patient Form_2").WebElement("LocationofForms").Check CheckPoint("yui-gen19")
	
'Clear cookies and close everything for now
	Browser("Patient Form").Page("Patient Form_2").Link("Logout").Click @@ script infofile_;_ZIP::ssf23.xml_;_
	Call clearcookies()
	Browser("Patient Form").CloseAllTabs
	
'At this point we need to create a family file for a patient in Dentrix
	SystemUtil.Run "Famfile.exe", ""
	wait 5
Set WshShell = CreateObject("WScript.Shell")
	WshShell.SendKeys "{TAB 8}"
	wait 1
	WshShell.SendKeys "{ENTER}"
	wait 2
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("Last").Set strPatLName @@ hightlight id_;_199968_;_script infofile_;_ZIP::ssf8.xml_;_
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("First").Set strPatFName @@ hightlight id_;_199942_;_script infofile_;_ZIP::ssf9.xml_;_
	WshShell.SendKeys "{TAB 9}"
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("Birthdate").Set "01011970" @@ hightlight id_;_199980_;_script infofile_;_ZIP::ssf10.xml_;_
	WshShell.SendKeys "{TAB 8}"
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("E-Mail").Set "testerdude404@gmail.com" @@ hightlight id_;_199928_;_script infofile_;_ZIP::ssf11.xml_;_
	WshShell.SendKeys "{TAB 6}"
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("Mobile").Set "8257127753"
	wait 1
'	WshShell.SendKeys "{TAB 4}"
'	wait 1
	Window("Dentrix Family File").Dialog("Head-of-House Information").WinEdit("Prov1").Set "AP01"
	WshShell.SendKeys "{ENTER}"
	

'At this point a new appt needs to be created	
	SystemUtil.Run "Apptbook.exe", ""
	wait 3
	Window("Dentrix Appointment Book").WinMenu("Menu").Select "File;Select Patient - New Appt...	Shift+F2"
	Set WshShell = CreateObject("WScript.Shell")
	Window("Dentrix Appointment Book").Window("Select Patient").WinObject("WindowsForms10.EDIT.app.0.a0f9").Type strSearchName @@ hightlight id_;_6489868_;_script infofile_;_ZIP::ssf19.xml_;_
	wait 2
	WshShell.SendKeys "{TAB 2}"
	WshShell.SendKeys "{ENTER}"
	wait 1
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Appointment Description").Set "Scaling"
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Edit").Set "60"
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_2").Click
	WshShell.SendKeys "{ENTER}"
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Click
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight
	WshShell.SendKeys "{ENTER}"
	wait 1
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_4").Click
	WshShell.SendKeys "{ENTER}"
	wait 1
	WshShell.SendKeys "{TAB 4}"
	WshShell.SendKeys "{ENTER}"
		If Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("OK").Exist(1) Then
          		Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("OK").Click
           		Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Click
           		Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micRight 
           		Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Window("Select Date Setup").Type  micReturn 
           		Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinButton(">_3").Type  micTab 
                     Window("Dentrix Appointment Book").Dialog("Appointment Information_2").WinEdit("Staff:").Type  micReturn 
		End If
	Window("Dentrix Appointment Book").Dialog("Appointment Information_2").Dialog("Appointment Book").WinButton("Yes").Click
'
'Now, it should automatically send out a new patient welcome message, which is going to have a forms link on it, and I'm going to use that to tie it all together.

'In order to speed this up, login as a RM admin and do a mini delta, wait 10s, then a process data
	Call  RMsettingslogin(strRMadmin, strRMpwd)
	Browser("Patient Message Settings").Page("Account Search").WebEdit("companyId").Set strACCT
	Browser("Patient Message Settings").Page("Account Search").WebButton("Search").Click
	Browser("Patient Message Settings").Page("Account Search").Link("Account Name").Click
	Browser("Patient Message Settings").Page("Account Information").Link("Support").Click
	Browser("Patient Message Settings").Page("Account Information").WebButton("Mini-Delta").Click
	wait 2
	Browser("Patient Message Settings").HandleDialog micOK
	wait 8
	Browser("Patient Message Settings").Page("Account Information").WebButton("Process Data").Click
	wait 2
	Browser("Patient Message Settings").HandleDialog micOK
	Browser("Patient Message Settings").Page("Practice Information").WebButton("Logout").Click
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
	Browser("SignForms - Client Admin").Page("Inbox").WebButton("Compose").Check CheckPoint("Compose")
	
'Let's try finding and filling out that form
	Browser("SignForms - Client Admin").Page("Inbox").Link("Welcome to Jerry's Mobile_2").Click
	Browser("SignForms - Client Admin").Page("Inbox").Link("click here").Click
	Browser("FormsPage").Page("TheForm").WebEdit("patient_email").Set "testerdude404@gmail.com"
	Browser("FormsPage").Page("TheForm").WebEdit("patient_name").Set "John Doe"
	Browser("FormsPage").Page("TheForm").WebElement("Signature").Click
	Browser("FormsPage").Page("TheForm").WebEdit("Answer").Set "3"
	Browser("FormsPage").Page("TheForm").WebButton("Send").Click
	Browser("FormsPage").Page("TheForm").WebElement("Thank you! Your form was").WaitProperty "visible", true, 3000
	Browser("FormsPage").Page("TheForm").WebElement("Thank you! Your form was").Check CheckPoint("Thank you! Your form was sent successfully! Go to my forms landing page by clicking Here_2")
	Browser("FormsPage").Page("TheForm").Sync
	Browser("FormsPage").CloseAllTabs

'Now we have to head back into Dentrix to see if it came in
	wait 120
	Window("Dentrix Appointment Book").Activate @@ hightlight id_;_1640266_;_script infofile_;_ZIP::ssf39.xml_;_
'	Window("Dentrix Appointment Book").WinMenu("ContextMenu").Select "File;Switch To;Document Center"
	wait 2
	Set WshShell = CreateObject("WScript.Shell") @@ hightlight id_;_12126154_;_script infofile_;_ZIP::ssf33.xml_;_
	WshShell.SendKeys "%F"
	WshShell.SendKeys "W"
	WshShell.SendKeys "M"	
	Window("DocumentCentre").WinObject("FormsList").WaitProperty "visible", true, 5000 @@ hightlight id_;_4261702_;_script infofile_;_ZIP::ssf24.xml_;_
	'Window("ApptWindowDentrix").Check CheckPoint("DocumentCentre") @@ hightlight id_;_1246980_;_script infofile_;_ZIP::ssf38.xml_;_
	WshShell.SendKeys "{DOWN 2}"
	WshShell.SendKeys "{ENTER}"
	Window("CompletedForm").WinObject("AVPageView").WaitProperty "visible", true, 3000
	If Window("CompletedForm").WinObject("AVPageView").Exist(1) Then
		Window("DocumentCentreWindow").Close
		Window("Dentrix Appointment Book").Close
		Window("Dentrix Family File").Close
			ELSE		
				Call EndTest (strEvent, strReason, strDescription)
	End If	
	'Window("ApptWindowDentrix").WinObject("AVPageView").Check CheckPoint("AVPageView") @@ hightlight id_;_5310734_;_script infofile_;_ZIP::ssf32.xml_;_
	'Window("ApptWindowDentrix").Close
	'Window("DocumentCentreWindow").Close
	'Window("Dentrix Appointment Book").Close

'========================================================================================================================================	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_012Results.xlsx","Global","Forms"
