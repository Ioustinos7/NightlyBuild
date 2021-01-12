'Test Case ID: Forms_006; Title: Verify that forms link gets added to message after it's been enabled
'This is checking that after you've gone and added a form, that you can add the form to one of the messages, and that the URL for the link does show up

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strFormName
	
'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_006","Global"
	
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
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================

'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)

'Go to message settings, enable all messages if they're not already
	Browser("Dashboard").Page("Key Indicators").Link("Message Settings").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	Browser("Patient Form").Page("Patient Message Settings").WebElement("Patient Message Settings").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("Patient Form").Page("Patient Message Settings").WebElement("Patient Message Settings").Check CheckPoint("Patient Message Settings") @@ script infofile_;_ZIP::ssf3.xml_;_
	'This will turn on all of the checkboxes on appt messages
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Form").Page("Patient Message Settings").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'Save it
	Browser("Patient Form").Page("Patient Message Settings").WebButton("Save").Click	

'Head to patient forms
	 Call gettopatientforms()
	 
'Check that none of the forms are already attached to messages, if so exit the test
        If Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessages").Exist(1) Then
	     Call EndTest
        End If
 
'Click on a form name
       Browser("Patient Form").Page("Patient Form").Link("FormName").Click

'enable send E-mail if it's not already turned on
       If Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").exist(1) Then
       	Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").Set "ON"
       End If
       
'Add the form to all of the messages
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Form").Page("Patient Form").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'save it
	Browser("Patient Form").Page("Patient Form").WebButton("Save").Click @@ script infofile_;_ZIP::ssf5.xml_;_

'Verify that the form is used in messages now.
	Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessages").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessages").Check CheckPoint("yui-gen21") @@ script infofile_;_ZIP::ssf6.xml_;_

'Go to patient messages
	Browser("Patient Form").Page("Patient Form").Link("Patient Messages").Click @@ script infofile_;_ZIP::ssf8.xml_;_
	Browser("Patient Form").Page("Patient Messages").WebElement("Patient Messages").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf9.xml_;_
	Browser("Patient Form").Page("Patient Messages").WebElement("Patient Messages").Check CheckPoint("Patient Messages") @@ script infofile_;_ZIP::ssf10.xml_;_
	
'Verify that the rcmx link is available on the E-mail & SMS message
	Browser("Patient Form").Page("Patient Messages").WebButton("Edit Wording").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf11.xml_;_
	Browser("Patient Form").Page("Patient Messages").Frame("Frame").Link("click here").Check CheckPoint("click here")

'Click the links and ensure the forms preview loads
	Browser("Patient Form").Page("Patient Messages").Frame("Frame").Link("click here").Click
	Browser("SignForms - Client Admin").Page("https://stagingnormal.recallma").WebElement("Please fill out the following").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf13.xml_;_
	Browser("SignForms - Client Admin").Page("https://stagingnormal.recallma").Link("Outstanding").Check CheckPoint("Outstanding") @@ script infofile_;_ZIP::ssf14.xml_;_
	Browser("SignForms - Client Admin").Page("https://stagingnormal.recallma").Link("Outstanding").Click @@ script infofile_;_ZIP::ssf15.xml_;_
	Browser("SignForms - Client Admin").Page("Dental Insurance - SignForms").WebElement("RecallMax - 2304, 8561").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf16.xml_;_
	Browser("SignForms - Client Admin").Page("Dental Insurance - SignForms").WebElement("© 2021 SignForms. All").Check CheckPoint("© 2021 SignForms. All right reserved.   ›   Privacy Policy")

'Close the form
	Browser("SignForms - Client Admin").Page("Dental Insurance - SignForms").Sync
	Browser("SignForms - Client Admin").Close @@ hightlight id_;_3475838_;_script infofile_;_ZIP::ssf18.xml_;_

'Head back to patient forms
	Browser("Patient Form").Page("Patient Messages").Link("Patient Forms").Click @@ script infofile_;_ZIP::ssf20.xml_;_
	Browser("Patient Form").Page("Patient Form").WebElement("Patient Forms").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf21.xml_;_
	Browser("Patient Form").Page("Patient Form").WebElement("Integrated Patient Forms").Check CheckPoint("Integrated Patient Forms")
	
'Remove the form link from all of the messages
	Browser("Patient Form").Page("Patient Form").Link("FormName").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Patient Form").Link("FormName").Click
	wait 1
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Form").Page("Patient Form").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "OFF" 
	   'msgbox Err.Number
	Next

	
'save it
	Browser("Patient Form").Page("Patient Form").WebButton("Save").Click
	
'Ok, it's very touchy here, it looks for the webelement before it completes what's above. Of course it'll still exist until it doesn't?
	While Browser("Patient Form").Page("Patient Form").WebButton("Save").Exist(1)
   		Wait 1
	WEnd 
	
'Check that none of the forms are still attached to messages, if so exit the test
        If Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessages").Exist(1) Then
	     Call EndTest (strEvent, strReason, strDescription)
        End If

'Go to patient messages
	Browser("Patient Form").Page("Patient Form").Link("Patient Messages").Click @@ script infofile_;_ZIP::ssf23.xml_;_
	Browser("Patient Form").Page("Patient Messages").WebElement("Patient Messages").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf9.xml_;_
	Browser("Patient Form").Page("Patient Messages").WebElement("Patient Messages").Check CheckPoint("Patient Messages")

'Verify that the link is no longer visible on the messages
	If Browser("Patient Form").Page("Patient Messages").Frame("Frame").Link("click here").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	End If

'Head to message settings
       Browser("Patient Form").Page("Patient Messages").Link("Message Settings").Click @@ script infofile_;_ZIP::ssf24.xml_;_

'Disable the messages from going out
        Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Form").Page("Patient Messages").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "OFF" 
	   ' msgbox Err.Number
	Next

'save it	
	Browser("Patient Form").Page("Patient Message Settings").WebButton("Save").Click @@ script infofile_;_ZIP::ssf25.xml_;_
	Browser("Patient Form").Page("Patient Message Settings_2").WebElement("Success").WaitProperty "visible", true, 3000
	
'Logout
	Call exitforms()
	
'Close all the tabs
	Call closealltabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_006Results.xlsx","Global","Forms"
