'This test is just to verify that you can add a new provider, treatment, and add them to the schedule. Also ensuring you cannot delete a provider if they've got time assigned in the schedule

'Head to the dashboard + login
Call adminlogin("AutomatedTestAdmin", "Welcome55!")

'Head to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").Check CheckPoint("Welcome to RecallMax™ Online Booking.") @@ script infofile_;_ZIP::ssf7.xml_;_
'Go to the providers/treatment page
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Treatments Offered for").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf9.xml_;_
'add in a treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Generic Dental Work" @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("35 Minutes").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Recall").Click @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf16.xml_;_
'check that it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dental Work").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf17.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dental Work").Check CheckPoint("Generic Dental Work") @@ script infofile_;_ZIP::ssf18.xml_;_
'add a provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[1]").Click @@ script infofile_;_ZIP::ssf21.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Ted Tedderson" @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement").Click @@ script infofile_;_ZIP::ssf24.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_2").Click @@ script infofile_;_ZIP::ssf25.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Generic Dental Work").Click @@ script infofile_;_ZIP::ssf26.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf27.xml_;_
'check that it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ted Tedderson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ted Tedderson").Check CheckPoint("Ted Tedderson") @@ script infofile_;_ZIP::ssf29.xml_;_
'head to the schedule page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click @@ script infofile_;_ZIP::ssf30.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf31.xml_;_
'Add in a time-block @@ script infofile_;_ZIP::ssf53.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='scheduleDateCal']").Click @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf54.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click @@ script infofile_;_ZIP::ssf55.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("15").Click @@ script infofile_;_ZIP::ssf56.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_11").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf180.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_5").Click @@ script infofile_;_ZIP::ssf57.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[1]").Click @@ script infofile_;_ZIP::ssf59.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[1]").Click @@ script infofile_;_ZIP::ssf61.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "Teddy" @@ script infofile_;_ZIP::ssf62.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "OFF"
   ' msgbox Err.Number
Next
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    	allObjs(1).Set "ON"
	'allObjs(3).Set "ON"
   ' msgbox Err.Number
Next @@ script infofile_;_ZIP::ssf64.xml_;_
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("StartTimeHourDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("zz_starthr_9").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("StartMinuteDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("zz_startmin_00").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("EndHourDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("ZZ_endhr_18").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("EndMinuteDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("ZZ_endmin_30").Click @@ script infofile_;_ZIP::ssf66.xml_;_

Browser("Book Online - Schedule").Page("Book Online - Schedule").WebElement("Weekly").Click @@ script infofile_;_ZIP::ssf67.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("FirstSecondThirdFourthLast").Click @@ script infofile_;_ZIP::ssf68.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Third").Click @@ script infofile_;_ZIP::ssf69.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Wednesday").Click @@ script infofile_;_ZIP::ssf71.xml_;_
'Hit the calendar to specify the start date
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='startDateCal']").Click @@ hightlight id_;_2_;_script infofile_;_ZIP::ssf147.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click @@ script infofile_;_ZIP::ssf73.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("1").Click
''select has end date
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//div[@id='yesEndDate']").Click

'open up the calendar
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='endDateCal']").Click
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click @@ script infofile_;_ZIP::ssf73.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("28").Click @@ script infofile_;_ZIP::ssf76.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click @@ script infofile_;_ZIP::ssf77.xml_;_
wait(2)

'Alright let's try to find and delete that
While Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Exist(0)
   Wait 1
WEnd @@ script infofile_;_ZIP::ssf78.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Webedit("xpath:=//INPUT[@id='scheduleDateCal']").Click @@ hightlight id_;_1_;_script infofile_;_ZIP::ssf79.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Next").Click @@ script infofile_;_ZIP::ssf80.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("15").Click @@ script infofile_;_ZIP::ssf81.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("OK").Click @@ script infofile_;_ZIP::ssf83.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Check CheckPoint("name")
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf86.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Exist(0)
   Wait 1
WEnd @@ script infofile_;_ZIP::ssf85.xml_;_
'We'll add another block just for today, then try to delete the provider
Browser("RecallMax™ Login").Refresh @@ hightlight id_;_4786540_;_script infofile_;_ZIP::ssf87.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_6").Click @@ script infofile_;_ZIP::ssf88.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[2]").Click @@ script infofile_;_ZIP::ssf90.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[1]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "Ted" @@ script infofile_;_ZIP::ssf91.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs= Browser("RecallMax™ Login").Page("Book Online - Schedule").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "OFF"
   ' msgbox Err.Number
Next
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    	allObjs(1).Set "ON"
	'allObjs(3).Set "ON"
   ' msgbox Err.Number
Next @@ script infofile_;_ZIP::ssf156.xml_;_
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("StartTimeHourDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("zz_starthr_10").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("StartMinuteDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("zz_startmin_20").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("EndHourDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("ZZ_endhr_17").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("EndMinuteDropdown").Click
Browser("Key Indicators").Page("Book Online - Schedule").WebElement("ZZ_endmin_40").Click @@ script infofile_;_ZIP::ssf170.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Single Day").Click @@ script infofile_;_ZIP::ssf171.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click @@ script infofile_;_ZIP::ssf172.xml_;_
wait(2)
 
'check that it saved
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson").WaitProperty "visible", true, 3000
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("(6:50-13:00) Ted Generic").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf97.xml_;_
'Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson (6:50-13:00)").Check CheckPoint("Ted Tedderson (6:50-13:00) Ted Generic Dental Work") @@ script infofile_;_ZIP::ssf98.xml_;_
'let's go to the providers/treatment page
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf100.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ted Tedderson").Click @@ script infofile_;_ZIP::ssf101.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf102.xml_;_
'Check that it failed to delete the provider @@ script infofile_;_ZIP::ssf105.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("There were some errors").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf176.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("There were some errors").Check CheckPoint("There were some errors with your submission_2")
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Cancel").Click @@ script infofile_;_ZIP::ssf106.xml_;_
'Check that our provider is still available
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ted Tedderson").Check CheckPoint("Ted Tedderson_2") @@ script infofile_;_ZIP::ssf107.xml_;_
'Go back to the schedule page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click @@ script infofile_;_ZIP::ssf108.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").Sync
'delete the time-block
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf112.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Ted Tedderson").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf113.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf173.xml_;_
wait(1)

'back to the providers/treatment page
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf115.xml_;_
'delete the provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ted Tedderson").Click @@ script infofile_;_ZIP::ssf116.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf117.xml_;_
'check that it successfully deleted
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf118.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up") @@ script infofile_;_ZIP::ssf119.xml_;_
'Delete the treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Generic Dental Work").Click @@ script infofile_;_ZIP::ssf120.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf121.xml_;_
'check that it was deleted successfully
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf122.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up") @@ script infofile_;_ZIP::ssf123.xml_;_
'back to the dashboard
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf124.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf174.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Check CheckPoint("Logout") @@ script infofile_;_ZIP::ssf175.xml_;_

'logout + close
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf127.xml_;_
Browser("RecallMax™ Login").Close
