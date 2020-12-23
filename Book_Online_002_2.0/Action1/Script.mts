'This is the exact same test as Schedule.java in Selenium. This is to prove that the same tests can be created/run in UFT.
'This one would mark my first test that you should be able to run against any account. and it works!!!! yay, this will work anywhere. Some of the hard-coded values have been removed, there's 
'still some things I'd like to change about how the test is run, like using 'random' login credentials, or 'random' treatment/dr names, just so it's not just testing the same 2 names, and checking if they saved
'anyways, this is an improvement for sure, moving this in the right direction.

'This function will login and verify,
Call adminlogin("AutomatedTestAdmin2", "Carbanktire4567")

'check that we're logged in and that book online is even on the page (may not be setup in admin)
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Check CheckPoint("Book Online") @@ script infofile_;_ZIP::ssf3.xml_;_

'head to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click
'wait until it's loaded
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf4.xml_;_

'go to the providers/treatment tab -- in order to add multiple treatments and utilize the schedule page we'll need some treatment & providers.
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf5.xml_;_
'check that we're working with a blank slate
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_3") @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf7.xml_;_

'add new treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Root Canal" @@ script infofile_;_ZIP::ssf9.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("25 Minutes").Click @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Other").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf14.xml_;_
'make sure it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Check CheckPoint("Root Canal") @@ script infofile_;_ZIP::ssf16.xml_;_

'2/2
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf17.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "BW X-ray" @@ script infofile_;_ZIP::ssf18.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("20 Minutes").Click @@ script infofile_;_ZIP::ssf20.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf21.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Recall").Click @@ script infofile_;_ZIP::ssf22.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf23.xml_;_
'make sure it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("BW X-ray").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf24.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("BW X-ray").Check CheckPoint("BW X-ray") @@ script infofile_;_ZIP::ssf25.xml_;_

'add in a provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf26.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[2]").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Generic Dentist"
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown_2").Click @@ script infofile_;_ZIP::ssf27.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_3").Click @@ script infofile_;_ZIP::ssf28.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    	allObjs(0).Set "ON"
	'allObjs(3).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf29.xml_;_

'verify that the provider saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dentist").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf30.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dentist").Check CheckPoint("Generic Dentist_3") @@ script infofile_;_ZIP::ssf31.xml_;_

'add a second provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[3]").Click @@ script infofile_;_ZIP::ssf32.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Super Dentist"
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown_2").Click @@ script infofile_;_ZIP::ssf34.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_4").Click @@ script infofile_;_ZIP::ssf35.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    	allObjs(0).Set "ON"
	'allObjs(3).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click

'verify that the provider saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Super Dentist").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf36.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Super Dentist").Check CheckPoint("Super Dentist_3") @@ script infofile_;_ZIP::ssf37.xml_;_

'APPLY treatment to multiple providers
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Apply Treatments to Multiple").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").WaitProperty "visible", true, 3000 @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf150.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "ON"
   ' msgbox Err.Number
Next

'save it
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
Browser("RecallMax™ Login").Refresh @@ script infofile_;_ZIP::ssf38.xml_;_
 'check that it saved properly
'Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("BW X-ray ,  Root Canal").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf39.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("BW X-ray ,  Root Canal").Check CheckPoint("BW X-ray ,  Root Canal") @@ script infofile_;_ZIP::ssf40.xml_;_

'head to the schedule page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click

'check the instructions
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("(Show Instructions)").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Schedule").Check CheckPoint("Schedule_2") @@ script infofile_;_ZIP::ssf41.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("(Hide Instructions)").Click @@ script infofile_;_ZIP::ssf42.xml_;_


'disable the chairs
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").Click @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf152.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf153.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "OFF"
'    msgbox Err.Number @@ script infofile_;_ZIP::ssf154.xml_;_
Next

'save it
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click

'check that it failed to save
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Must select at least 1").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf43.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Must select at least 1").Check CheckPoint("Must select at least 1 Chair_2") @@ script infofile_;_ZIP::ssf44.xml_;_

'click ok on the pop-up
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Ok").Click

'enable all of the chairs
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "ON"
   ' msgbox Err.Number
Next

'save it
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click

'click into the schedule @@ script infofile_;_ZIP::ssf55.xml_;_

Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_16").Click @@ script infofile_;_ZIP::ssf57.xml_;_

'select a chair
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[3]").Click

'select a provider

Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[2]").Click

'enter a description
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "Dentist numero uno"

'select services, only have the first treatment available for this provider
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebCheckBox("WebCheckBox").Set "OFF"
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    	allObjs(1).Set "ON"
	'allObjs(3).Set "ON"
   ' msgbox Err.Number
Next

'set a start time/end time 
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_2").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("9").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_3").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("00").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("14").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("001020304050 00001020304050").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("30").Click

'select a repeat option, I'll let this one just be a weekly repeat for Wednesday's
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='repeatDayOfWeek']//parent::div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Wednesday").Click

'open up the start date calendar, click next month, select the first Wednesday of the next month in this case
Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='startDateCal']").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("2").Click

'select has end date
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@id='yesEndDate']").Click

'open up the calendar
Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='endDateCal']").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("30").Click

'save it all
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click

'Navigate to where that provider was saved
Browser("RecallMax™ Login").Refresh
Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='scheduleDateCal']").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("2").Click

'check that it saved
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Super Dentist").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf58.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Super Dentist").Check CheckPoint("Super Dentist_4") @@ script infofile_;_ZIP::ssf59.xml_;_

'add the second provider with 'single day' availability
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_8").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[1]").Click

'select a provider

Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[1]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "This dentist rocks"

'de-select all, then select-all
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebCheckBox("WebCheckBox").Set "OFF"
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebCheckBox("WebCheckBox").Set "ON"

'set start/end times
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021_2").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("7").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("001020304050 40001020304050").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("10").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("9_2").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("001020304050 00001020304050_2").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("40").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Single Day").Click

'save it
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click

'check that it saved
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Generic Dentist").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf61.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Generic Dentist").Check CheckPoint("Generic Dentist_4") @@ script infofile_;_ZIP::ssf62.xml_;_

'Let's just reload all the elements on the page
Browser("RecallMax™ Login").Refresh

'Delete everything
'Navigate back to where they're entered into the schedule
Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='scheduleDateCal']").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("2").Click

'click into our first Dr, then delete and verify
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@class='booking-block-body'] //*[contains(text(), 'Generic')]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Click
While Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@class='booking-block-body'] //*[contains(text(), 'Generic')]").Exist(0)
   Wait 1
WEnd

'2nd doctor
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@class='booking-block-body'] //*[contains(text(), 'Super')]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Ok").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Click
While Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@class='booking-block-body'] //*[contains(text(), 'Super')]").Exist(0)
   Wait 1
WEnd

'Go back to the providers/treatment page
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf63.xml_;_

'delete the providers
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Super Dentist").Click @@ script infofile_;_ZIP::ssf64.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf65.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Super Dentist").Exist(0)
   Wait 1
WEnd

'2/2
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dentist").Click @@ script infofile_;_ZIP::ssf66.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf67.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dentist").Exist(0)
   Wait 1
WEnd
 @@ hightlight id_;_133442_;_script infofile_;_ZIP::ssf92.xml_;_
'check that they both deleted
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf68.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2") @@ script infofile_;_ZIP::ssf69.xml_;_

'Delete the treatment

Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Click @@ script infofile_;_ZIP::ssf70.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf71.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Exist(0) @@ hightlight id_;_5665809_;_script infofile_;_ZIP::ssf106.xml_;_
   Wait 1
    'msgbox Err.Number
WEnd

'2/2
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("BW X-ray").Click @@ script infofile_;_ZIP::ssf72.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf73.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf74.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_4") @@ script infofile_;_ZIP::ssf75.xml_;_

'back to the dashboard
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf76.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf77.xml_;_
Browser("RecallMax™ Login").CloseAllTabs

 @@ script infofile_;_ZIP::ssf149.xml_;_
