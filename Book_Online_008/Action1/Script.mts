'ID: Book_Online_008 Title: Verify the Schedule tab, Description: Verify you're able to add blocks, use the enable/disable chairs button, that the calendar works, etc

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strTreat, strTreat2, strProvider

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_008","Global"
	
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
	strTreat2 = Trim(Datatable.Value("Treatment2","Global"))
	
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


'Now add in a provider (this provider will just have the first treatment type)
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure it saved and is present on the page	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider2")

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
	
'Go forward 1 day, and add a block for the entire day	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")
	
'Go forward 1 day, and add a weekly block that repeats on whatever day it is
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Weekly").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").Check CheckPoint("SchBlock_2")

'Ok, next is adding someone that's in on a bi-weekly
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Bi-Weekly").Click @@ script infofile_;_ZIP::ssf1.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")
	
'Lastly we'll do one on a monthly repeat (I'll move forward a day in the schedule before adding them)
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Monthly").Click @@ script infofile_;_ZIP::ssf2.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").Check CheckPoint("SchBlock_2")
	
'This will give us 4 different types of blocks, 3 repeating, one for just that day >>> Head to activate and see that there's '4' blocks scheduled
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("Activate").Click @@ script infofile_;_ZIP::ssf3.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Review").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf4.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Review").Check CheckPoint("Review") @@ script infofile_;_ZIP::ssf5.xml_;_
	If Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("4 Blocks Scheduled").Exist(1) Then
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Click
		wait [500]
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Click
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").WaitProperty "visible", true, 3000
	Else
		Call EndTest (strEvent, strReason, strDescription)		
	End If
	
'Ok we were able to add all types of blocks to the schedule and they've been saved successfully >> let's delete our providers blocks'
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")

'Click enable/disable chairs and de-select the 2 OP's where we've saved our providers
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP1 Chair").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("OP2 Chair").Click
	
'Save it, and make sure the error came up that you're deleting blocks	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Disabeling them will permanent").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf6.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Disabeling them will permanent").Check CheckPoint("DisableError") @@ script infofile_;_ZIP::ssf7.xml_;_
	
'Click Continue	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Continue").Click @@ script infofile_;_ZIP::ssf8.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")
	
'Ok, the blocks are gone, but let's try disabling all of the chairs
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Click
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule_2").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "OFF" 
	   ' msgbox Err.Number
	Next
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Must select at least 1").WaitProperty "visible", true, 3000
	If Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Must select at least 1").Exist(1) Then
		Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Must select at least 1").Check CheckPoint("Must select at least 1 Chair")
	ELSE
		Call EndTest (strEvent, strReason, strDescription)		
	End If

'Let's enable all the chairs again, and save it
	Set myObj=Description.Create
	myObj("micclass").value="WebCheckBox"
	Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule_2").ChildObjects(myObj)
	For i=0 to allObjs.count -1
	    allObjs(i).Set "ON" 
	   ' msgbox Err.Number
	Next
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click @@ script infofile_;_ZIP::ssf11.xml_;_
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Exist(1)
   		Wait 1
	WEnd
	
'Alright, we can go back to providers/treatments and delete the rest of the test data
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	
'And the 2nd provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd	
	
'Verify that they've both been deleted now
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
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_008Results.xlsx","Global","Forms"
