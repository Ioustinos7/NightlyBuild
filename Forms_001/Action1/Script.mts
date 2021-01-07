'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strFormName1

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\FormsData\Forms.xlsx","Forms_001","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	'Get the values for the variables
	strFormName1 = Trim(Datatable.Value("FormName1","Global"))
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	
'Execute based on what test data is setup
	For intLoop = 1 To intRowCount Step 1
	DataTable.GlobalSheet.SetCurrentRow(intLoop)
	Next
	
	If ucase(strExecute) = "Y" Then

'===================================================================================================================================================

'Login to the dashboard as a practice administrator
	Call pradminlogin(strUserName, strPass)
		
'Head to patient forms
	 Call gettopatientforms()
	
'Verify you can see that forms are available to use
	Browser("Patient Form").Page("Patient Form").Link("Form1").WaitProperty "visible", true, 3000
	Browser("Patient Form").Page("Patient Form").Link("Form1").Check CheckPoint("AvailableForm")

'verify you can click the 'view form' link
	Browser("Patient Form").Page("Patient Form").Image("ViewForm").Click

'check that the signforms page loads
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").Link("SignForms").WaitProperty "visible", true, 3000

'close the sign forms tab
	Browser("SignForms - Client Admin").Close

'Click on an available form
	Browser("Patient Form").Page("Patient Form").Link("Form1").Click
	
'enable 'send E-mail if it's not already turned on
	If Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").exist(3) Then	
	Browser("Patient Form").Page("Patient Form").WebCheckBox("sendEmail").Set "ON"
End If 	

'Enable all message types
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("Patient Form").Page("Patient Form").WebTable("Message").ChildObjects(myObj)
	For i=0 to allObjs.count -1
    	allObjs(i).Set "ON"
   ' msgbox Err.Number
	Next
	Browser("Patient Form").Page("Patient Form").WebButton("Save").Click
	  While  Browser("Patient Form").Page("Patient Form").WebButton("Save").Exist(1)
   Wait 1
WEnd 

'ensure the 'used in messages column changes to 'YES'
Browser("Patient Form").Page("Patient Form").WebElement("UsedInMessagesYES").WaitProperty "visible", true, 3000


'Disable all forms that were enabled
	Browser("Patient Form").Page("Patient Form").Link("Form1").Click
		Set myObj=Description.Create
		myObj("micclass").value="WebCheckBox"
		Set allObjs= Browser("Patient Form").Page("Patient Form").WebTable("Message").ChildObjects(myObj)
		For i=0 to allObjs.count -1
    		allObjs(i).Set "OFF"
   		' msgbox Err.Number
		Next
	Browser("Patient Form").Page("Patient Form").WebButton("Save").Click
	  While  Browser("Patient Form").Page("Patient Form").WebButton("Save").Exist(1)
   Wait 1
WEnd 

'See that it changed back to 'no' - For now I'm just going to grab a screenshot, but I'll re-do this once I think of a way to do what I want
Browser("Patient Form").Page("Patient Form").WebTable("Form Name").CaptureBitmap "EverythingShouldBeNo.png"


'Check the 'add/edit forms' link to see that it takes you to your account
	Browser("Patient Form").Page("Patient Form").Link("Add/Edit Forms").Click
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("My Forms").WaitProperty "visible", true, 3000
	Browser("SignForms - Client Admin").Page("SignForms - Client Admin").WebElement("Manage your forms").Check CheckPoint("Manage your forms")
	Browser("SignForms - Client Admin").Close
	
'Logout
	Call exitforms()
	
'Close all the tabs
	Call closealltabs()
	
 'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
 
 'export the results
 Datatable.ExportSheet "D:\!UFT Scripts\TestResults\Forms\Forms_001Results.xlsx","Global","Forms"

