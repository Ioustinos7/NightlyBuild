'This is another test on the providers/treatment page. This is more to test that you can add a provider, picture, colour etc
'!!!!Ok, this one works but there is hard-coded waits in here. I'm trying to wait based off of the image and colour changing, can't find a good way of handling this at the moment

'Get to the dashboard
Call adminlogin("AutomatedTestAdmin", "Welcome55!")
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf55.xml_;_

'Head to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf56.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf57.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").Check CheckPoint("Welcome to RecallMax™ Online Booking._2") @@ script infofile_;_ZIP::ssf58.xml_;_

'Go to providers/treatment
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf59.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf60.xml_;_

'Add 1 treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf61.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Remove teeth and replace with tic tacs" @@ script infofile_;_ZIP::ssf62.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_3").Click @@ script infofile_;_ZIP::ssf63.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("120 Minutes").Click @@ script infofile_;_ZIP::ssf64.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("HygieneRecallOther HygieneHygi").Click @@ script infofile_;_ZIP::ssf65.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Other").Click @@ script infofile_;_ZIP::ssf66.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf14.xml_;_

'make sure it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Remove teeth and replace").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf68.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Remove teeth and replace").Check CheckPoint("Remove teeth and replace with tic tacs") @@ script infofile_;_ZIP::ssf69.xml_;_

'add a provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf70.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[4]").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Ronald McDonald" @@ script infofile_;_ZIP::ssf71.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Edit").Click @@ script infofile_;_ZIP::ssf72.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf73.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("MzczNjUyNjQ1MA==?useCached=0").Click @@ script infofile_;_ZIP::ssf74.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebRadioGroup("imageId").Select "1611" @@ script infofile_;_ZIP::ssf75.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown").Click @@ script infofile_;_ZIP::ssf76.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_4").Click @@ script infofile_;_ZIP::ssf77.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Remove teeth and replace").Click @@ script infofile_;_ZIP::ssf78.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf79.xml_;_

'check that it's there, and their picture was updated
Browser("RecallMax™ Login").Sync
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ronald McDonald").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf80.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("Njk4NTg0NjA3?useCached=0_2").Check CheckPoint("MzczNjUyNjQ1MA==?useCached=0") @@ script infofile_;_ZIP::ssf29.xml_;_

'change the pic
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ronald McDonald").Click @@ script infofile_;_ZIP::ssf82.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Edit").Click @@ script infofile_;_ZIP::ssf83.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("NDI5MTczNDA=?useCached=0").Click @@ script infofile_;_ZIP::ssf86.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebRadioGroup("imageId").Select "1633" @@ script infofile_;_ZIP::ssf87.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("Njk4NTg0NjA3?useCached=0_2").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf112.xml_;_
wait(2)
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Image("Njk4NTg0NjA3?useCached=0_2").Check CheckPoint("NDI5MTczNDA=?useCached=0") @@ script infofile_;_ZIP::ssf89.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ronald McDonald").Click @@ script infofile_;_ZIP::ssf90.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_5").Click @@ script infofile_;_ZIP::ssf91.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_6").Click @@ script infofile_;_ZIP::ssf92.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
wait(2)
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ronald McDonald").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf94.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_7").Check CheckPoint("WebElement_2") @@ script infofile_;_ZIP::ssf95.xml_;_

'let's delete the provider now
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Ronald McDonald").Click @@ script infofile_;_ZIP::ssf96.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf97.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf98.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up_2") @@ script infofile_;_ZIP::ssf99.xml_;_

'and now the treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Remove teeth and replace").Click @@ script infofile_;_ZIP::ssf100.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf101.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_3") @@ script infofile_;_ZIP::ssf103.xml_;_

'back to the dashboard
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf104.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf105.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Check CheckPoint("Logout")

'Logout + close
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf107.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").Link("Forgot Password").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf108.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").Link("Forgot Password").Check CheckPoint("Forgot Password") @@ script infofile_;_ZIP::ssf109.xml_;_
Browser("RecallMax™ Login").CloseAllTabs


 @@ script infofile_;_ZIP::ssf48.xml_;_
 @@ script infofile_;_ZIP::ssf102.xml_;_
