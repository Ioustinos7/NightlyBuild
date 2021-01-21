
'ID: Book_Online_012 Title: Verify Patient Info
'Expected Result 1) Appointment Reason must be available in the services provided by any of the Provider who is scheduled 

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strBOpage, strTreat, strpatfname, strpatlname, intpatnum,  strpatemail, strApptTime, strProvider

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_012","Global"
	
	intRowCount = Datatable.GlobalSheet.GetRowCount

'===================================================================================================================================================
	For intLoop = 1 To intRowCount Step 1
		DataTable.GlobalSheet.SetCurrentRow(intLoop)
	
'Get the values for the variables
	strUserName = Trim(Datatable.Value("Username","Global"))
	strPass = Trim(Datatable.Value("Password","Global"))
	strExecute = Trim(Datatable.Value("Execute","Global"))
	strURL = Trim(Datatable.Value("URL","Global"))
	strBOpage = Trim(Datatable.Value("BOpage","Global"))
	strTreat = Trim(Datatable.Value("Treatment","Global"))
	strpatfname = Trim(Datatable.Value("Pat1Fname","Global"))
	strpatlname = Trim(Datatable.Value("Pat1Lname","Global"))
	intpatnum = Trim(Datatable.Value("Pat1Num","Global"))
	strpatemail = Trim(Datatable.Value("Pat1Email","Global"))
	strApptTime = Trim(Datatable.Value("ApptTime","Global"))
	strProvider = Trim(Datatable.Value("ProviderName","Global"))
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================

'I'll have to login first, add a treatment type, and add in a provider
	Call BOLogin (strUserName, strPass)

'Head to providers/treatment
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf20.xml_;_

'Make sure there already isn't any treatment setup
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf21.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up") @@ script infofile_;_ZIP::ssf22.xml_;_

'Add in a new treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf23.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebEdit("name").Set strTreat @@ script infofile_;_ZIP::ssf24.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf25.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("60 Minutes").Click 'I'm setting it to an hour, just so the options avail are on the hour @@ script infofile_;_ZIP::ssf26.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click @@ script infofile_;_ZIP::ssf27.xml_;_

'Make sure the treatment saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Check CheckPoint("TreatmentType") @@ script infofile_;_ZIP::ssf29.xml_;_
	
'Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf30.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf32.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click @@ script infofile_;_ZIP::ssf33.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider").Click @@ script infofile_;_ZIP::ssf34.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click @@ script infofile_;_ZIP::ssf35.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click @@ script infofile_;_ZIP::ssf36.xml_;_

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf37.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")
 @@ hightlight id_;_65806_;_script infofile_;_ZIP::ssf41.xml_;_
'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click @@ script infofile_;_ZIP::ssf42.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf43.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2") @@ script infofile_;_ZIP::ssf44.xml_;_

'Go to the next day, and add a block for the entire day
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click @@ script infofile_;_ZIP::ssf45.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click @@ script infofile_;_ZIP::ssf46.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click @@ script infofile_;_ZIP::ssf47.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click @@ script infofile_;_ZIP::ssf48.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click @@ script infofile_;_ZIP::ssf49.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click @@ script infofile_;_ZIP::ssf50.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click @@ script infofile_;_ZIP::ssf51.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf53.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock") @@ script infofile_;_ZIP::ssf54.xml_;_

'Go to activate and enable it
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("Activate").Click @@ script infofile_;_ZIP::ssf55.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Activate Online Booking").Click @@ script infofile_;_ZIP::ssf56.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Set "ON" @@ script infofile_;_ZIP::ssf57.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf58.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").Check CheckPoint("Success")
	
'Logout and close tabs
	Call BOLogout()

'Now that it's setup, we'll need to try booking an appt as a patient -- I've found the cookies for online booking to be rather sticky, so I'll clear out the cookies first.
	Call preclearcookies()

'Head to the public facing book online page
	Call BookAppt()

'Add in a patient
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").Set strpatfname
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientLastName").Set strpatlname
	Browser("BookOnline").Page("PatientInfo").WebEdit("DOB").Click
	Browser("BookOnline").Page("PatientInfo").WebList("select").Select "1980"
	Browser("BookOnline").Page("PatientInfo").Link("Cal_Day").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientCellPhone").Set intpatnum
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientEmail").Set  strpatemail
	Browser("BookOnline").Page("PatientInfo").WebElement("AppointmentReason").Click

'If the treatment type I added in earlier is available, select it, and click next to get to the provider selection >> if not, fail the test	
	If Browser("BookOnline").Page("PatientInfo").WebElement("Treatment").Exist(1) Then
		Browser("BookOnline").Page("PatientInfo").WebElement("Treatment").Click
	       Browser("BookOnline").Page("PatientInfo").WebButton("Next").Click
	       Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").WaitProperty "visible", true, 3000
	      Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").Check CheckPoint("Staff Preference")
	      Call clearcookies()
	      Browser("BookOnline").CloseAllTabs
	Else
		Call EndTest (strEvent, strReason, strDescription)	
	End If

'Ok, if we've reached this point we just have to go back and remove what's been added
	Call BOLogin (strUserName, strPass)

'Go to schedule and find that block
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click @@ script infofile_;_ZIP::ssf64.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click @@ script infofile_;_ZIP::ssf65.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("BookedBlock").Click @@ script infofile_;_ZIP::ssf66.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf67.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_3") @@ script infofile_;_ZIP::ssf69.xml_;_

'Go to providers/treatment
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf62.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf63.xml_;_

'Make sure the provider deleted successfully
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2") @@ script infofile_;_ZIP::ssf71.xml_;_

'Delete the treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("SavedTreatment").Click @@ script infofile_;_ZIP::ssf72.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf73.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf74.xml_;_
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_2") @@ script infofile_;_ZIP::ssf75.xml_;_

'Logout and close tabs
	Call BOLogout()
'============================================================================================================================================

'This ends the if statement which runs based on what's in 'execute' in the test data file
 	End  If
'This is for ending the loop through the rows of data, if the last row has completed, the test will finish
	Next
	
'export the results
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_012Results.xlsx","Global","Forms"
