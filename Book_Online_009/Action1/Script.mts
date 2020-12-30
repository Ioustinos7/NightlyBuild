'This test is called Book_Online_009 in the documentation, and is titled 'verify add block'. A lot of this functionality is tested with other tests, but I'll make this one to just focus on the 
'add-block pop-up
'1. The user should have the ability to Select Chair and Provider from the dropdowns
'2. The system should display the services provided by the provider and allow the ability to check all the services or individualy 
'3. The user should have the ability to select start and end time and dates from the drop down selections respectively  
'4. The should check the Repeat checkbox by default, whihc means the appointment is repeated for same day of every week until the repeat date
'5. The system should display Add Block window when clicked on the scheduler for any provider
'6. Fields with Astrick are to be filled to save the selection
'7. If a provider blocks certain time on a perticular day in the scheduler, it cannot be blocked by another provider

'This function will login and verify,
Call pradminlogin("AutomatedTestAdmin2", "Carbanktire4567")
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").WaitProperty "visible", true, 3000

'check that we're logged in and that book online is even on the page (may not be setup in admin)
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf82.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Check CheckPoint("Book Online") @@ script infofile_;_ZIP::ssf83.xml_;_

'Head to the providers/treatment tab, as we'll need to create the provider/treatment that we'll end up using on the schedule page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click

'Add in a treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf1.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Add block test" @@ script infofile_;_ZIP::ssf2.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_3").Click @@ script infofile_;_ZIP::ssf3.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("65 Minutes").Click @@ script infofile_;_ZIP::ssf4.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf5.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Other").Click @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf7.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add block test").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add block test").Check CheckPoint("Add block test") @@ script infofile_;_ZIP::ssf9.xml_;_

'add a second treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Secondary Treatment" @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("80 Minutes").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Recall").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Secondary Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf16.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Secondary Treatment").Check CheckPoint("Secondary Treatment") @@ script infofile_;_ZIP::ssf17.xml_;_

'add in a provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf18.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[1]").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Spider Man" @@ script infofile_;_ZIP::ssf21.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(0).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Spider Man").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Spider Man").Check CheckPoint("Spider Man") @@ script infofile_;_ZIP::ssf24.xml_;_

'add in a second provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[2]").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Batman"
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(1).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf25.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").Check CheckPoint("Batman") @@ script infofile_;_ZIP::ssf26.xml_;_

'head to the schedule page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click @@ script infofile_;_ZIP::ssf27.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_

'click into the table to add a block
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_11").Click @@ script infofile_;_ZIP::ssf29.xml_;_

'select the op + provider
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[3]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[1]").Click

'enter a description
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "Block Test"

'Un-check select-all, and then select whatever the first treatment is
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Schedule").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(0).Set "OFF"
   ' msgbox Err.Number
Next
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Schedule").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(1).Set "ON"
   ' msgbox Err.Number
Next @@ script infofile_;_ZIP::ssf30.xml_;_

'select times, leave the end time hour blank @@ script infofile_;_ZIP::ssf32.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021_3").Click @@ script infofile_;_ZIP::ssf33.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("10_2").Click @@ script infofile_;_ZIP::ssf34.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_3").Click @@ script infofile_;_ZIP::ssf35.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("00").Click @@ script infofile_;_ZIP::ssf36.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_12").Click @@ script infofile_;_ZIP::ssf37.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("30").Click @@ script infofile_;_ZIP::ssf38.xml_;_

'Select weekly, leave day default so a refresh should take you back to where the provider is saved
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Weekly").Click @@ script infofile_;_ZIP::ssf39.xml_;_

'save the provider, check that it failed to save
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("End time hour must be").CaptureBitmap "Endtimemustbeselected.bmp"
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("End time hour must be").Check CheckPoint("End time hour must be selected") @@ script infofile_;_ZIP::ssf41.xml_;_

'fix the time, then save it again
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021_4").Click @@ script infofile_;_ZIP::ssf42.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("21").Click @@ script infofile_;_ZIP::ssf43.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click @@ script infofile_;_ZIP::ssf44.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf45.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").Check CheckPoint("Spider Man_2") @@ script infofile_;_ZIP::ssf46.xml_;_


'open the provider again, and  use select-all
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").Click @@ script infofile_;_ZIP::ssf47.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Ok").Click @@ script infofile_;_ZIP::ssf48.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Schedule").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(0).Set "ON"
   ' msgbox Err.Number
Next

'save it
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click @@ script infofile_;_ZIP::ssf49.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf85.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").Check CheckPoint("Spider Man_3") @@ script infofile_;_ZIP::ssf86.xml_;_

'add in 2nd provider, try to book it for the same time and chair as the other provider
 @@ script infofile_;_ZIP::ssf50.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("WebElement_11").Click 
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//select[@id='selectedOperatory']//following-sibling::i").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[2]/div/div[2]/div[3]").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("xpath:=//*[@id='blockForm']/div[3]/div/div[2]/div[2]").Click
'description
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebEdit("name").Set "Collision Test"
'Times
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021_5").Click @@ script infofile_;_ZIP::ssf51.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("8").Click @@ script infofile_;_ZIP::ssf52.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("001020304050 40001020304050").Click @@ script infofile_;_ZIP::ssf53.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("00").Click @@ script infofile_;_ZIP::ssf54.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("- 6789101112131415161718192021").Click @@ script infofile_;_ZIP::ssf55.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("12").Click @@ script infofile_;_ZIP::ssf56.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("001020304050 40001020304050").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("30").Click
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Save").Click @@ script infofile_;_ZIP::ssf57.xml_;_

'verify that it failed to save
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("There were some errors").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf58.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("There were some errors").CaptureBitmap "Therewassomeerrors.bmp"
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("There were some errors").Check CheckPoint("There were some errors with your submission") @@ script infofile_;_ZIP::ssf59.xml_;_

'Cancel the add of the 2nd provider
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Cancel_2").Click @@ script infofile_;_ZIP::ssf60.xml_;_

'delete the first provider
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebElement("Spider Man").Click @@ script infofile_;_ZIP::ssf61.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Ok").Click @@ script infofile_;_ZIP::ssf62.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf63.xml_;_
Browser("RecallMax™ Login").Refresh

'head back to the provider/treatment page
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf64.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf65.xml_;_

'delete the providers
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Spider Man").Click @@ script infofile_;_ZIP::ssf66.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf67.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Spider Man").Exist(0)
   Wait 1
WEnd


Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").Click @@ script infofile_;_ZIP::ssf68.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf69.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf70.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2") @@ script infofile_;_ZIP::ssf71.xml_;_

'now delete the treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Secondary Treatment").Click @@ script infofile_;_ZIP::ssf72.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf73.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Secondary Treatment").Exist(0)
   Wait 1
WEnd


Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add block test").Click @@ script infofile_;_ZIP::ssf74.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf75.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf76.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_3") @@ script infofile_;_ZIP::ssf77.xml_;_

'back to the dashboard
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf78.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf79.xml_;_

'logout + close
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf80.xml_;_
Browser("RecallMax™ Login").CloseAllTabs

 @@ script infofile_;_ZIP::ssf81.xml_;_


