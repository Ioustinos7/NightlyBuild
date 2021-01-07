'This is just a real quick one to ensure you cannot use an invalid E-mail address and that you can't bypass the SMS length check

'Import the environment settings
	'Environment.LoadFromFile "D:\!UFT Scripts\TestData\ENVIRONMENT\Environment.xml" 
	
'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strInvEmail, strmsgtext, strURL

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_002","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strFormName1 = Trim(Datatable.Value("FormName1","Global"))
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strInvEmail = Trim(Datatable.Value("Bad_Email","Global"))
	strmsgtext  = Trim(Datatable.Value("MessageText","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
       
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================

'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)
		
'Head to patient forms
	 Call gettopatientforms()
	 
'Click on an available form
	Browser("Patient Form").Page("Patient Form").Link("Form1").Click

'Enter an invalid E-mail address
	Browser("Patient Form").Page("Patient Form").WebEdit("PtFormsEmailAddress").Set strInvEmail

'Try to save it
	 Browser("Patient Form").Page("Patient Form").WebButton("Save").Click

	If Browser("Patient Form").Page("Patient Form").WebElement("Email address is invalid").exist(1) Then
		'DataTable.Value("strchk1", dtGlobalSheet) = "We were not able to save an invalid E-mail address"
		Print ("We were not able to save an invalid E-mail address") 
		Browser("Patient Form").Page("Patient Form").WebButton("Cancel").Click
	ELSEIf Browser("Patient Form").Page("Patient Form").WebElement("Email address is invalid").exist(0) Then
		'DataTable.Value("strchk2", dtGlobalSheet) = "We were able to save an invalid E-mail address"
		Print ("We were able to save an invalid E-mail address")
	End If
	
	'Ok, let's try to get another negative case in here as this script is still tiny..we'll try to edit our messages so that we're less than 50 chars available, then try to save it

'Head to patient messages
	Browser("Patient Form").Page("Message Wording - Reminder").Link("Patient Messages").Click
	Browser("Patient Form").Page("Patient Messages").WebList("select").Select "Reminder" @@ script infofile_;_ZIP::ssf4.xml_;_
	
'Make sure the limit on my account is still set to 320 characters
	Browser("Patient Form").Page("Patient Messages").WebElement("Text Limit: 320 characters").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Patient Messages").WebElement("Text Limit: 320 characters").Check CheckPoint("Text Limit: 320 characters")
	
'Click edit wording on the reminder SMS message
	Browser("Patient Form").Page("Patient Messages").WebButton("Edit Wording").Click @@ script infofile_;_ZIP::ssf5.xml_;_
	
'Make sure nothing custom has been added
	Browser("Patient Form").Page("Message Wording - Reminder").WebElement("characterCount_3").Check CheckPoint("characterCount_3")
	
'Copy the string of text that's exactly as long as I want it to be 
	Browser("Patient Form").Page("Message Wording - Reminder").WebEdit("WebEdit").Set strmsgtext @@ script infofile_;_ZIP::ssf9.xml_;_
	 @@ script infofile_;_ZIP::ssf29.xml_;_
'Make sure I have exactly 49 characters remaining
	Browser("Patient Form").Page("Message Wording - Reminder").WebElement("characterCount_4").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Message Wording - Reminder").WebElement("characterCount_4").Check CheckPoint("characterCount_4") @@ script infofile_;_ZIP::ssf11.xml_;_
	
'Save it up
	Browser("Patient Form").Page("Message Wording - Reminder").WebButton("Save").Click
	Browser("Patient Form").Page("Patient Messages").WebElement("Patient Messages").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf13.xml_;_
	
'Head to patient forms
	
	Browser("Patient Form").Page("Patient Messages").Link("Patient Forms").Click

'This will fail the test, but I really want to test when NOTHING has been added to messages yet.
	If Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessagesYES").exist(1) Then
		ExitTest
	End If
	
'Click on a form
	Browser("Patient Form").Page("Patient Form").Link("Form1").Click
	
'Enable the reminder E-mail/SMS	
If Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").exist(3) Then	
	Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").Set "ON"
End If 	
	Browser("Patient Form").Page("Patient Form").WebCheckBox("reminderEmail").Set "ON" @@ script infofile_;_ZIP::ssf15.xml_;_
	Browser("Patient Form").Page("Patient Form").WebCheckBox("reminderSms").Set "ON" @@ script infofile_;_ZIP::ssf16.xml_;_
	Browser("Patient Form").Page("Patient Form").WebElement("Please go to Patient Messaging").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf17.xml_;_
	Browser("Patient Form").Page("Patient Form").WebElement("reminderSmsComment").Check CheckPoint("reminderSmsComment") @@ script infofile_;_ZIP::ssf18.xml_;_

'Try to hit enter in the E-mail box to bypass the check
	Browser("Patient Form").Page("Patient Form").WebEdit("PtFormsEmailAddress").Submit @@ script infofile_;_ZIP::ssf21.xml_;_

'Make sure it fails
	Browser("Patient Form").Page("Page").WebElement("{'status':'fail','errorMap':{}_2").Check CheckPoint("{'status':'fail','errorMap':{},'pageErrorList':['Reminder - Increase Text Limit required.']}") @@ script infofile_;_ZIP::ssf22.xml_;_

'Back to patient forms
	Browser("Patient Form").Page("Page").Sync
	Browser("Patient Form").Back

'Wait until the page loads
	Browser("Patient Form").Page("Patient Form").WebElement("Patient Forms").WaitProperty "visible", true, 3000
	
'Check that everything is still set to no
If Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessagesYES").exist(1) Then
		Print ("Somehow we were able to save without increasing our text limit") 
	ElseIf Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessagesYES").exist(0) Then
		Print ("We were not able to bypass the check, working as expected") 
	End If

'Let's head to patient messages to set the message back to default
	Browser("Patient Form").Page("Message Wording - Reminder").Link("Patient Messages").Click
	Browser("Patient Form").Page("Patient Messages").WebList("select").Select "Reminder"

'Click edit wording on the reminder SMS message
	Browser("Patient Form").Page("Patient Messages").WebButton("Edit Wording").Click

'Remove the custom message
	Browser("Patient Form").Page("Message Wording - Reminder").WebTable("Your existing message").Click @@ script infofile_;_ZIP::ssf26.xml_;_
	Browser("Patient Form").Page("Message Wording - Reminder").WebEdit("WebEdit").Set ""

'save it
	Browser("Patient Form").Page("Message Wording - Reminder").WebButton("Save").Click
	
'Logout
	Call exitforms()
	
'Close all the tabs
	Call closealltabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_002Results.xlsx","Global","Forms"

