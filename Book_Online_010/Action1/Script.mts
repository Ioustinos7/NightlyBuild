
'ID: Book_Online_010 Title: Disabling chair when there's future blocks scheduled + verify enable/disable chairs button,
'Description: If you go to 'enable/disable' chairs and disable a chair that has future blocks scheduled, it should ask you if you want to delete them, and then it should remove them from the schedule.
'You also shouldn't be able to save without selecting at least 1 chair

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strTreat, strProvider

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_010","Global"
	
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
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("SavedProvider")

'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")
	
'We're really testing the 'enable/disable' chairs button here, so we'll need to make sure ALL of the chairs are enabled before we continue
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

'Add the provider in for today, but put them on a repeating weekly block
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SchCell").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectChairDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("PickChair").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("PickProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("EndTimeHourDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Weekly").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")
	
'Let's try to disable all of the chairs, which should give us an error message
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click @@ script infofile_;_ZIP::ssf2.xml_;_
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule_2").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "OFF" 
	   ' msgbox Err.Number
	Next
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	If Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Must select at least 1").Exist(1) Then
		Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("UsedOp").Click
		Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Else
		Call EndTest (strEvent, strReason, strDescription)	
	End If
	 @@ script infofile_;_ZIP::ssf3.xml_;_
'Make sure it saved and the provider is still present on the page	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")	
	
'Ok, let's re-enable all of the chairs, and try to disable the one with my provider on a repeating block
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule_2").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next

'But disable the one chair that my provider is in
	wait 1
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("UsedOp").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf12.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("DisableChairError").Check CheckPoint("DeletingFutureBlocks") @@ script infofile_;_ZIP::ssf13.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Continue").Click
	If Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	End If	
	
'Before we try to delete the provider, go to activate and see that there's no blocks scheduled
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("Activate").Click @@ script infofile_;_ZIP::ssf14.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Review").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf16.xml_;_
	If Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("1 Blocks Scheduled").Exist(1) Then
		Call EndTest (strEvent, strReason, strDescription)
	End If
		
'Ok, let's head back to providers, and try to delete that provider now. If there's still a block in the future this should fail
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
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_010Results.xlsx","Global","Forms"
