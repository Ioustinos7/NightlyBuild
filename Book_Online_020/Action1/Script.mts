'ID: Book_Online_020 Title: Verify if you're unable to delete a provider who is still scheduled in the future
'Description: On the providers/treatments page you're able to delete a provider who still has future blocks in the schedule. IF* the provider was added using repeat 'monthly' & the start date is before the date it was added. 
'This test is rather specific as this came up during testing, and required some fixing -- so this test will just go and confirm that the system is still performing the appropriate checks in this specific instance

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strTreat, strProvider

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_020","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	strTreat = Trim(Datatable.Value("Treatment","Global"))
	strProvider = Trim(Datatable.Value("ProviderName","Global"))            
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================

'I'll have to login first, add a treatment type, and add in a provider
	Call BOLogin (strUserName, strPass)

'Head to providers/treatment
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click

'Make sure there already isn't any treatment setup -- fail the test if there's already something here
	If Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Exist(1) Then
		Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000
	       Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up")
	ELSE
		Call EndTest (strEvent, strReason, strDescription)	
	End If

'Add in a new treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Treatment").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebEdit("name").Set strTreat
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("MinuteDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentTime").Click 'This is a variable now, you can change the appt length with the treatmenttime column in excel for this test
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure the treatment saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Check CheckPoint("TreatmentType")
	
'We're only adding in one provider for this one >> Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider (this provider will just have the first treatment type)
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click
	
'Make sure it saved and is present on the page	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")
	
'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")	

'Since we'll be using the enable/disable chairs button and there's a parameter to pick 'x' chair, I'll need to ensure they're all turned on before continuing 
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule_2").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Exist(1)
   		Wait 1
	WEnd

'Go forward 1 day, and add monthly repeating block, with a start date in the past
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SchCell").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectChairDropDown").Click @@ script infofile_;_ZIP::ssf19.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_1").Click	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("EndTimeHourDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Monthly").Click @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WeekDropDown").Click
	'Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("First").Click @@ script infofile_;_ZIP::ssf10.xml_;_
	Set WshShell = CreateObject("WScript.Shell")
	WshShell.SendKeys "{TAB 3}"
	wait 1
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Prev").Click @@ script infofile_;_ZIP::ssf11.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Exist(1)
   		Wait 1
	WEnd
	
'Now let's go back to provider/treatment and try to delete our provider
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	
'Verify that the error comes up, if there's no error this test should fail
	If Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	ELSE
		Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("There were some errors").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf12.xml_;_
		Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("There were some errors").Check CheckPoint("ProviderDeleteError")
		Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Cancel").Click @@ hightlight id_;_66656_;_script infofile_;_ZIP::ssf18.xml_;_
	End If	
	
'Now we need to go and delete this provider. Instead of trying to find the date in the calendar, I'm going to disable their chair and let the system get rid of the blocks
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")	
	
'Click into enable/disable and disable the chair we had previously selected for our provider
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_01").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf21.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").Check CheckPoint("DisableError") @@ script infofile_;_ZIP::ssf22.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Continue").Click @@ script infofile_;_ZIP::ssf23.xml_;_
	
'Ok, now let's head back to provider/treatment and delete that provider for real
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	
'Make sure the providers deleted successfully
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")	
	
'Delete treatment now
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click

'Make sure there's no treatment left on the page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_2")	
		
'Logout and close tabs
	Call BOLogout()

'============================================================================================================================================

'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
'export the results
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_020Results.xlsx","Global","Forms"
