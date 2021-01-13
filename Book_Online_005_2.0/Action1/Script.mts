'This test is to check if you're able to add treatment/providers and use the 'apply treatments to multiple providers'

'Hit the dashboard and login

Call adminlogin("AutomatedTestAdmin", "Welcome55!")

'head to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf1.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf2.xml_;_

'go to the providers/treatment tab
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf3.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf4.xml_;_

'add 3 different treatment types, one of recall, hygiene, other
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf7.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Hygiene Treatment" @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf9.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("10 Minutes").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15_3").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("15 Minutes").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene").Click @@ script infofile_;_ZIP::ssf16.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf17.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Hygiene Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf18.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Hygiene Treatment").Check CheckPoint("Hygiene Treatment") @@ script infofile_;_ZIP::ssf19.xml_;_

'2 of 3
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf20.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Recall Treatment" @@ script infofile_;_ZIP::ssf21.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf22.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("20 Minutes").Click @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15_4").Click @@ script infofile_;_ZIP::ssf24.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("25 Minutes").Click @@ script infofile_;_ZIP::ssf25.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15_5").Click @@ script infofile_;_ZIP::ssf26.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("30 Minutes").Click @@ script infofile_;_ZIP::ssf27.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf28.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Recall").Click @@ script infofile_;_ZIP::ssf29.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf30.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Recall Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf31.xml_;_

'3 of 3
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Other Treatment" @@ script infofile_;_ZIP::ssf33.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_3").Click @@ script infofile_;_ZIP::ssf34.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("35 Minutes").Click @@ script infofile_;_ZIP::ssf35.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15_6").Click @@ script infofile_;_ZIP::ssf36.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("40 Minutes").Click @@ script infofile_;_ZIP::ssf37.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15_7").Click @@ script infofile_;_ZIP::ssf38.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("45 Minutes").Click @@ script infofile_;_ZIP::ssf39.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene_2").Click @@ script infofile_;_ZIP::ssf40.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Other").Click @@ script infofile_;_ZIP::ssf41.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf42.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Other Treatment").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf43.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Other Treatment").Check CheckPoint("Other Treatment") @@ script infofile_;_ZIP::ssf44.xml_;_

'now add 3 providers, adding the 'hygiene treatment' as the default treatment offered
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf45.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[4]").Click @@ script infofile_;_ZIP::ssf46.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Frank Frankerson" @@ script infofile_;_ZIP::ssf47.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Edit").Click @@ script infofile_;_ZIP::ssf48.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("MzM1MDA2NDk0Nw==?useCached=0").Click @@ script infofile_;_ZIP::ssf49.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebRadioGroup("imageId").Select "1601" @@ script infofile_;_ZIP::ssf50.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown_2").Click @@ script infofile_;_ZIP::ssf51.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_4").Click @@ script infofile_;_ZIP::ssf52.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene Treatment").Click @@ script infofile_;_ZIP::ssf53.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf54.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Frank Frankerson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf55.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Frank Frankerson").Check CheckPoint("Frank Frankerson")

'2 of 3
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf57.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[2]").Click @@ script infofile_;_ZIP::ssf59.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Polly Pollerson" @@ script infofile_;_ZIP::ssf61.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown_2").Click @@ script infofile_;_ZIP::ssf62.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_2").Click @@ script infofile_;_ZIP::ssf63.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene Treatment").Click @@ script infofile_;_ZIP::ssf64.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf65.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Polly Pollerson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf66.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Polly Pollerson").Check CheckPoint("Polly Pollerson")

'3 of 3
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf68.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[1]").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Patti Patterson" @@ script infofile_;_ZIP::ssf69.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_5").Click @@ script infofile_;_ZIP::ssf70.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_6").Click @@ script infofile_;_ZIP::ssf71.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene Treatment").Click @@ script infofile_;_ZIP::ssf72.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf73.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Patti Patterson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf74.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Patti Patterson").Check CheckPoint("Patti Patterson")

'ok, now let's add all of the treatment types to all of the available providers
'first we'll select everything, then cancel, just to see if anything weird happens

Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Apply Treatments to Multiple").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").WaitProperty "visible", true, 3000
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Cancel").Click
Browser("RecallMax™ Login").Page("RecallMax™ Login").CaptureBitmap "nothing_has_been_added.bmp"

'alright, now let's actually add it
'APPLY treatment to multiple providers
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Apply Treatments to Multiple").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").WaitProperty "visible", true, 3000
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "ON"
   ' msgbox Err.Number
Next
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
Browser("RecallMax™ Login").Page("RecallMax™ Login").CaptureBitmap "everything_has_been_added.bmp"
Browser("RecallMax™ Login").Sync
'Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene Treatment ,  Recall").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf77.xml_;_

'Let's delete it all now
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Polly Pollerson").Click @@ script infofile_;_ZIP::ssf78.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Polly Pollerson").Exist(0)
   Wait 1
WEnd

'Delete the 2nd provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Patti Patterson").Click @@ script infofile_;_ZIP::ssf81.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf82.xml_;_
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Patti Patterson").Exist(0)
   Wait 1
WEnd

'Delete the last provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Frank Frankerson").Click @@ script infofile_;_ZIP::ssf83.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf84.xml_;_

'check that they've all been deleted
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf85.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2")

'Delete the treatment types now
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Recall Treatment").Click @@ script infofile_;_ZIP::ssf87.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf88.xml_;_

'Wait until it deleted
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Recall Treatment").Exist(0)
   Wait 1
WEnd

'Delete 2 of 3
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Other Treatment").Click @@ script infofile_;_ZIP::ssf89.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click

'Wait until it deleted
While Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Other Treatment").Exist(0)
   Wait 1
WEnd

'Delete the last treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Hygiene Treatment").Click @@ script infofile_;_ZIP::ssf91.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click

'Check that all of the treatment has been deleted
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf93.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_3")

'Back to the dashboard + logout
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf95.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf96.xml_;_

'check that we made it
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf97.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Check CheckPoint("username")

'Close all tabs

Browser("RecallMax™ Login").CloseAllTabs
