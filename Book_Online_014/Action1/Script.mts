'ID: Book_Online_014 Title: Verify Staff Preference page
'Description: This test is verifying the staff preference page, and that you can select providers for all your patients, and that everything works on this page
'Expected Result(s): 1. System should allow user to select provider by clicking anywhere on the Patient/Any Staff
'2. No selection should allow the system to pick any provider + 3. System should display Any Staff if more than 2 providers or none selected
'4. System should display Provider Name if one provider selected
'5. Previous- should navigate to patients info page + 6. Next- should navigate to Booking Assistant page 

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strBOpage, strTreat, strpatfname, strpatlname, intpatnum,  strpatemail, strApptTime, strProvider
	Dim strpatfname2, strpatlname2, strProvider2
	
'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_014","Global"
	
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
	strProvider = Trim(Datatable.Value("ProviderName","Global"))
	strpatfname2 = Trim(Datatable.Value("Pat2Fname","Global"))
	strpatlname2 = Trim(Datatable.Value("Pat2Lname","Global"))
	strProvider2 = Trim(Datatable.Value("Provider2","Global"))                     

	
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
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("5 Minutes10 Minutes15").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("60 Minutes").Click 'I'm setting it to an hour, just so the options avail are on the hour
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure the treatment saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType").Check CheckPoint("TreatmentType")
	
'Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")
	
'I'll need to add in another provider for this test	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider2_2").WaitProperty "visible", true, 4000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider2_2").Check CheckPoint("Provider2_2") @@ script infofile_;_ZIP::ssf2.xml_;_

'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")

'Go to the next day, and add a block for the entire day
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")
	
'Add the second provider to the schedule, so there's more than 1 provider to pick from as a patient	
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("2nd_ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("2nd_ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("2nd_ProviderBlock").Check CheckPoint("SchBlock2") @@ script infofile_;_ZIP::ssf3.xml_;_
	
'Go to activate and enable it
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").Link("Activate").Click
	Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").WaitProperty "visible", true, 3000
	actstatus = Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").GetROProperty("value")		
	If actstatus = "on" Then
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Set "OFF"
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Set "ON"
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").WaitProperty "visible", true, 3000
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").Check CheckPoint("Success")
	ELSE
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebCheckBox("bookOnlineOn").Set "ON"
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").WaitProperty "visible", true, 3000
		Browser("RecallMax™ Login").Page("Book Online - Activate_2").WebElement("Success").Check CheckPoint("Success")		
	End If	
	
'Logout and close tabs
	Call BOLogout()

'Now that it's setup, we'll need to try booking an appt as a patient -- I've found the cookies for online booking to be rather sticky, so I'll clear out the cookies first.
	Call preclearcookies()

'Head to the public facing book online page
	Call BookAppt()
	
'Add in a patient
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").WaitProperty "visible", true, 3000
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
	Else
		Call EndTest (strEvent, strReason, strDescription)	
	End If
	
'Click add patient, and ensure you're able to see the fields to enter in a new patient
	Browser("BookOnline").Page("PatientInfo").WebButton("AddPatient").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebEdit("currentPatient.firstName").Check CheckPoint("FirstNameField") @@ script infofile_;_ZIP::ssf4.xml_;_
'HERE	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").Check CheckPoint("currentPatient.firstName_2")

'Check that the earlier added patient is on the side
	Browser("BookOnline").Page("PatientInfo").WebButton("Patient1").Check CheckPoint("Patient1") @@ script infofile_;_ZIP::ssf5.xml_;_
'HERE	Browser("BookOnline").Page("PatientInfo").WebButton("Patient1").Check CheckPoint("Patient1")

'Let's add in another patient
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").Set strpatfname2
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientLastName").Set strpatlname2
	Browser("BookOnline").Page("PatientInfo").WebEdit("DOB").Click
	Browser("BookOnline").Page("PatientInfo").WebList("select").Select "1980"
	Browser("BookOnline").Page("PatientInfo").Link("Cal_Day").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientCellPhone").Set intpatnum
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientEmail").Set  strpatemail
	Browser("BookOnline").Page("PatientInfo").WebElement("AppointmentReason").Click
	
'If the treatment type I added in earlier is available, select it
	If Browser("BookOnline").Page("PatientInfo").WebElement("Treatment").Exist(1) Then
		Browser("BookOnline").Page("PatientInfo").WebElement("Treatment").Click
	Else
		Call EndTest (strEvent, strReason, strDescription)	
	End If	
	
'Click add patient again, this should force both names onto the right side of the page, check that they're both there
	Browser("BookOnline").Page("PatientInfo").WebButton("AddPatient").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebButton("Patient2").Check CheckPoint("Patient2")

'Click next and just see that the staff preferences came up and that we were able to save out 2 patients
	Browser("BookOnline").Page("PatientInfo").WebButton("Next").Click
	Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").Check CheckPoint("Staff Preference")

'Click on 'any staff', go and select a provider and ensure their name is present on the page after selection (1,4)
	Browser("BookOnline").Page("StaffPreference").WebElement("Any Staff").Click
	Browser("BookOnline").Page("StaffPreference").WebElement("Provider1").Click
	Browser("BookOnline").Page("StaffPreference").WebButton("OK").Click
	Browser("BookOnline").Page("StaffPreference").WebElement("RemainingProvider2").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("StaffPreference").WebElement("SelectedProvider").Check CheckPoint("SelectedProvider")
 @@ script infofile_;_ZIP::ssf11.xml_;_
 'Click 'any staff' then 'OK', this patient should still have 'any staff' listed (2,3)
	Browser("BookOnline").Page("StaffPreference").WebElement("Any Staff").Click
	Browser("BookOnline").Page("StaffPreference").WebButton("OK").Click
	Browser("BookOnline").Page("BookingAssistant").WebElement("Any Staff").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("BookingAssistant").WebElement("Any Staff").Check CheckPoint("Any Staff_2") @@ script infofile_;_ZIP::ssf13.xml_;_

'Click previous to go to the previous page, ensure our patients are still there on the side
	Browser("BookOnline").Page("BookingAssistant").WebButton("Previous").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebButton("Patient1").Check CheckPoint("Patient1")
	Browser("BookOnline").Page("PatientInfo").WebButton("Patient2").Check CheckPoint("Patient2")


'Click next and ensure you can see times available, and that the 2 family members are being booked together
	Browser("BookOnline").Page("BookingAssistant").WebButton("Next").Click
	Browser("BookOnline").Page("BookingAssistant").WebButton("Next").Click
	Browser("BookOnline").Page("BookingAssistant").WebElement("Booking Assistant").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("BookingAssistant").WebElement("2 family members").Check CheckPoint("2 family members")
	Browser("BookOnline").Page("BookingAssistant").WebElement("120 mins").Check CheckPoint("Time in Office: 120 mins")

'Clear the cookies again
	Call clearcookies()
	Browser("BookOnline").CloseAllTabs
	
'At this point we'll need to log back into admin and remove the test data that was added to run this
	Call BOLogin (strUserName, strPass)

'Go to schedule and find that block
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	wait 2 'This can probably be removed once the fix for activating accounts is up on pre-prod
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("BookedBlock").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_3")
	
'We have a 2nd provider to delete
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("BookedBlock").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_3")

'Go to providers/treatment + delete provider
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click

'Delete the 2nd provider as well
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider2_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider2_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click

'Make sure the providers deleted successfully
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")

'Delete the treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("SavedTreatment").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
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
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_014Results.xlsx","Global","Forms"
