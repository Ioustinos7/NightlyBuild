'ID: Book_Online_021 Title: Verify that when deleting a provider with a repeating block, that the error message references the date for the block closest to today, not the 1st in the series
'ie: Repeating Monday block added on Nov 1, 2020, and I go in Feb 2, 2021 and try to delete that provider, the date given should be Feb 9, NOT Nov 2nd

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strTreat, strProvider, strChair1

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_021","Global"
	
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
	strChair1 = Trim(Datatable.Value("Chair1","Global"))            	 
	
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


'We're going to add in 2 different providers though. I'll assign one to 2 types of blocks >> Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider 
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
	
'Just in case, I'm going to enable all of the chairs on the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
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
	
'Go forward 1 day, and add a block for the entire day >> set the start date in the past
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("HourDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Weekly").Click
	Set WshShell = CreateObject("WScript.Shell")
	WshShell.SendKeys "{TAB 2}"
	wait 1
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("CalPrev").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("CalPrev").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("1st").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Because the block may go to another day, I'm going to activate to check that the block was scheduled successfully
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").Link("Activate").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Review").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_
	If Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("1Block").Exist(1) Then
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Click
		wait [500]
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Click
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").WaitProperty "visible", true, 3000
	ELSE
		Call EndTest (strEvent, strReason, strDescription)
	End If
	
'Alright, let's head back to providers/treatments and try to delete our provider
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	
'Check that it failed to delete	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("ThereWereSomeErrors").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf4.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("ProviderError").Check CheckPoint("ProviderCannotBeDeleted") @@ script infofile_;_ZIP::ssf5.xml_;_
	If Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription) 'Fail if it did delete the provider
	End If
	
'I'll have to check that the date given is in the future	
	ErrorDate = Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("ProviderError").GetROProperty ("innertext")
	VarDate = Right(ErrorDate, 13)
	MyDate = Trim(VarDate)
	MyShortDate = CDate(MyDate)
	If date > MyShortDate Then
		Call EndTest (strEvent, strReason, strDescription) 'Fail the test if the date given in the error is prior to today's date
	End If

'Click cancel, make sure the provider is still present on the page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Cancel").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")
	
'Let's go to the schedule page and delete our provider now
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")

'Click into enable/disable and disable the chair we had previously selected for our provider
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_01").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").Check CheckPoint("DisableChairError") @@ script infofile_;_ZIP::ssf7.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Continue").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Continue").Exist(1)
   		Wait 1
	WEnd
	
'Just in case, I'm going to enable all of the chairs (again...) on the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
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
	
'Ok, back to the treatment/provider page to delete the remining test data	
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	
'Verify that they've been deleted now
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")		
	
'Now, to delete the treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd

'Make sure it's gone
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
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_021Results.xlsx","Global","Forms"
