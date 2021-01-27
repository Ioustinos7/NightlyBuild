'ID: Book_Online_016 Title: Verify Group Booking, Description: Verify the availability of appointments and time slots to a group of patients:
'1. System should show available time slots to the user.
'2. System should prioritize the time slots for the group with the immediate available Provider from the respective Chairs on the same day

'Declare the variables
	Dim strUserName, strPass, intRowCount, intLoop, strExecute, strURL, strBOpage, strTreat, strpatfname, strpatlname, intpatnum,  strpatemail, strProvider
	Dim strTreat2, strPat2Fname, strPat2Lname, strFindPat2, strPat3Fname, strPat3Lname, strFindPat3, strProvider2, strProvider3
'That's a lot of variables...

'Import the test data
	Datatable.ImportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\BookOnlineData_2.0.xlsx","Book_Online_016","Global"
	
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
	strTreat2 = Trim(Datatable.Value("Treatment2","Global"))
	strProvider2 = Trim(Datatable.Value("Provider2","Global"))
	strProvider3 = Trim(Datatable.Value("Provider3","Global"))
	strPat2Fname = Trim(Datatable.Value("Pat2Fname","Global"))
	strPat2Lname = Trim(Datatable.Value("Pat2Lname","Global"))
	strFindPat2 = Trim(Datatable.Value("findpat2","Global"))
	strPat3Fname = Trim(Datatable.Value("Pat3Fname","Global"))
	strPat3Lname = Trim(Datatable.Value("Pat3Lname","Global"))
	strFindPat3 = Trim(Datatable.Value("findpat3","Global"))
	
'Execute based on what test data is setup
	If ucase(strExecute) = "Y" Then

'=============================================================================================================================================

'This test will require at least 2 treatment types, 3 providers on 3 different chairs, and 3 patients (yay)

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

'Add in the 2nd treatment type
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Treatment").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebEdit("name").Set strTreat2
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("5 Minutes10 Minutes15").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("60 Minutes").Click 'I'm setting it to an hour, just so the options avail are on the hour
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure the treatment saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("TreatmentType_2").Check CheckPoint("TreatmentType_2")

'We'll need to add in 3 different providers here >> Ensure there's not already a provider setup	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up")	
	
'Now add in a provider (this provider will just have the first treatment type)
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Check CheckPoint("Provider")


'Add in a second provider (this provider will have both treatment types)
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").Check CheckPoint("Provider_2")
	
'Add in the 3rd provider, this provider will just have the 2nd treatment assigned
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Add New Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Select Provider").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("Provider_3").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("TreatmentType_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Save").Click
	
'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_3").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_3").Check CheckPoint("Provider_3")
	
'Head to the schedule page
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_2")
	
'Go forward 1 day, and add a block for the entire day
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair1").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Check CheckPoint("SchBlock")
	
'Add in another provider
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").Check CheckPoint("SchBlock_2")
	
'Add in our 3rd provider
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Chair3").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("SelectProvider").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderDropDown_3").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("WebElement_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("21").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("Single Day").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Save").Click	

'Make sure it saved
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_3").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_3").Check CheckPoint("SchBlock_3")

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
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").Check CheckPoint("FirstNameBlank")

'Check that the earlier added patient is on the side
	Browser("BookOnline").Page("PatientInfo").WebButton("SavedPatient1").Check CheckPoint("SavedPatient1") @@ script infofile_;_ZIP::ssf3.xml_;_

'Let's add in another patient
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").Set strPat2Fname
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientLastName").Set strPat2Lname
	Browser("BookOnline").Page("PatientInfo").WebEdit("DOB").Click
	Browser("BookOnline").Page("PatientInfo").WebList("select").Select "1980"
	Browser("BookOnline").Page("PatientInfo").Link("Cal_Day").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientCellPhone").Set intpatnum
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientEmail").Set  strpatemail
	Browser("BookOnline").Page("PatientInfo").WebElement("AppointmentReason").Click
	Browser("BookOnline").Page("PatientInfo").WebElement("Treatment_2").Click 'Select the 2nd type of treatment available
	
'Click add patient again, this should force both names onto the right side of the page, check that they're both there
	Browser("BookOnline").Page("PatientInfo").WebButton("AddPatient").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").Check CheckPoint("FirstNameBlank")
	
'Make sure our second patient is saved and visible	
	Browser("BookOnline").Page("PatientInfo").WebButton("SavedPatient2").Check CheckPoint("SavedPatient2")

'Let's add in our 3rd patient for this test	
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientFirstName").Set strPat3Fname
	Browser("BookOnline").Page("PatientInfo").WebEdit("PatientLastName").Set strPat3Lname
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

'Click add patient again, this should force both names onto the right side of the page,
	Browser("BookOnline").Page("PatientInfo").WebButton("AddPatient").Click
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("PatientInfo").WebEdit("FirstNameField").Check CheckPoint("FirstNameBlank")

'Make sure our second patient is saved and visible	
	Browser("BookOnline").Page("PatientInfo").WebButton("SavedPatient3").Check CheckPoint("SavedPatient3")

'Click next and just see that the staff preferences came up and that we were able to save our patient
	Browser("BookOnline").Page("PatientInfo").WebButton("Next").Click
	Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("StaffPreference").WebElement("Staff Preference").Check CheckPoint("Staff Preference")

'Click next and ensure you can see that we landed on the booking assistant page
	Browser("BookOnline").Page("PatientInfo").WebButton("Next").Click
	Browser("BookOnline").Page("BookingAssistant").WebElement("Booking Assistant").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("BookingAssistant").WebElement("Booking Assistant").Check CheckPoint("Booking Assistant")
	 @@ script infofile_;_ZIP::ssf4.xml_;_
'Check that there's an opening available for our selection. Check that the first appt is available, and last for the day	
	Browser("BookOnline").Page("BookingAssistant").WebList("preferredTimeSelected").Select "Morning"
	Browser("BookOnline").Page("BookingAssistant").WebElement("FirstAppt").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("BookingAssistant").WebElement("FirstAppt").Check CheckPoint("FirstAppt")
	Browser("BookOnline").Page("BookingAssistant").WebList("preferredTimeSelected").Select "Evening"
	Browser("BookOnline").Page("BookingAssistant").WebElement("LastAppt").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("BookingAssistant").WebElement("LastAppt").Check CheckPoint("LastAppt")
	Browser("BookOnline").Page("BookingAssistant").WebElement("Time in Office: 60 mins").Check CheckPoint("Time in Office: 60 mins")

'Select an appointment, I'll pick the last one for the day, I have to enter everything carefully for this, so we're looking for the 8PM Appt here
	Browser("BookOnline").Page("BookingAssistant").WebElement("LastAppt").Click
	Browser("BookOnline").Page("AppointmentReview").WebElement("Appointment Review").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("AppointmentReview").WebElement("Appointment Review").Check CheckPoint("Appointment Review")
	Browser("BookOnline").Page("AppointmentReview").WebEdit("sessionModel.dentalNotes").Set "This was reserved as part of an automated test"
	Browser("BookOnline").Page("AppointmentReview").WebButton("Reserve Appointments").Click
	Browser("BookOnline").Page("ThankYouPage").WebElement("Thank You").WaitProperty "visible", true, 3000
	Browser("BookOnline").Page("ThankYouPage").WebElement("Thank You").Check CheckPoint("THANKYOUPAGE")
 @@ script infofile_;_ZIP::ssf14.xml_;_
'Output the booked appt details into the results spreadsheet
	bookedappt = Browser("BookOnline").Page("ThankYouPage").WebElement("Confirmation").GetROProperty ("innertext")
	Datatable.Value("BookedAppt","Global") = bookedappt

'After doing whatever I need to on the book online page, the below will go back into the dashboard and clean up what's been added
	
'Clear the cookies again
	Call clearcookies()
	Browser("BookOnline").CloseAllTabs
	
'At this point we'll need to log back into admin and remove the test data that was added to run this
	Call BOLogin (strUserName, strPass)

'Go to schedule and find that block
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").Link("Schedule").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	wait 1 'This can probably be removed once the fix for activating accounts is up on pre-prod
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	
'Delete the 2nd provider	
	'Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	'wait 1 'This can probably be removed once the fix for activating accounts is up on pre-prod
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd

'Delete the 3rd provider	
	'Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("WebButton").Click
	'wait 1 'This can probably be removed once the fix for activating accounts is up on pre-prod
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebElement("ProviderBlock_3").Click
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	
'They should all be gone now, just make sure there's no pop-ups or anything, and you can see the 'enable/disable' chairs button
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Schedule_2").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs_3")

'Go to providers/treatment + delete provider
	Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Providers / Treatments").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd

'Delete the 2nd provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_2").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd
	
'Delete the last  provider
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_3").WaitProperty "visible", true, 3000		
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Provider_3").Click	
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd

'Make sure the providers deleted successfully
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")

'Delete treatment now
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("SavedTreatment_2").Click
	Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Click
	While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm_2").WebButton("Delete").Exist(1)
   		Wait 1
	WEnd

'Delete the 2nd treatment type
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
	Datatable.ExportSheet "D:\!UFT Scripts\TestData\BookOnlineData_2.0\Book_Online_016Results.xlsx","Global","Forms"
