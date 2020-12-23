'This is the exact same test as JustinsProviderTest.java in Selenium. This is to prove that the same tests can be created/run in UFT. Took ~30 minutes start to finish to record and create the script. 
'This particular test is to verify that a practice administrator is able to login, add treatment, add a provider, then delete those items. 
'I don't know if I'm actually starting to figure this out or not...but it actually ran succesfully on the first attempt.

'Get to the login page and enter practice admin credentials to access the dashboard
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Set "AutomatedTestAdmin" @@ script infofile_;_ZIP::ssf1.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("password").SetSecure "5fb29e7ff4a291f540443400ef7b6528ed10b1191bcb69fa63cbee34c4bb8a6b7bf4dfca" @@ script infofile_;_ZIP::ssf2.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Click @@ script infofile_;_ZIP::ssf3.xml_;_
'check that we're logged in
'Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").Check CheckPoint("Welcome AutomatedTestAdmin") @@ script infofile_;_ZIP::ssf4.xml_;_
'Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf5.xml_;_
'''''This function will login and verify, it does the same thing as the code above'''''
Call adminlogin("AutomatedTestAdmin", "Carbanktire7410")
'get to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf6.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf7.xml_;_
'check that we're on the Providers/Treatment page @@ script infofile_;_ZIP::ssf8.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Check CheckPoint("Add New Treatment") @@ script infofile_;_ZIP::ssf9.xml_;_
'add a new treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Treatment Hygiene" @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene_2").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("50 Minutes").Click @@ script infofile_;_ZIP::ssf15.xml_;_
'save it
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click
'Make sure it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Treatment Hygiene").Check CheckPoint("Treatment Hygiene") @@ script infofile_;_ZIP::ssf18.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Treatment Hygiene").WaitProperty "visible", true, 10000 @@ script infofile_;_ZIP::ssf17.xml_;_
'add a new provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click @@ script infofile_;_ZIP::ssf20.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[1]").Click @@ script infofile_;_ZIP::ssf21.xml_;_
'set a display name
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Batman" @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("colorDropdown").Click @@ script infofile_;_ZIP::ssf24.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement").Click @@ script infofile_;_ZIP::ssf25.xml_;_
'add treatment to the provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Treatment Hygiene_2").Click @@ script infofile_;_ZIP::ssf26.xml_;_
'save it
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf27.xml_;_
'make sure it saved and is visable
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").Check CheckPoint("Batman") @@ script infofile_;_ZIP::ssf29.xml_;_
'Let's delete the provider now
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Batman").Click @@ script infofile_;_ZIP::ssf30.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf31.xml_;_
'wait until it's been deleted
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 10000 @@ script infofile_;_ZIP::ssf32.xml_;_
'delete the treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Treatment Hygiene").Click @@ script infofile_;_ZIP::ssf33.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf34.xml_;_
'wait until it's deleted and confirm it's gone
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 10000 @@ script infofile_;_ZIP::ssf35.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up") @@ script infofile_;_ZIP::ssf36.xml_;_
'go back to the dashboard and logout
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf37.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").WaitProperty "visible", true, 10000 @@ script infofile_;_ZIP::ssf38.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf39.xml_;_
'close the tabs
Browser("RecallMax™ Login").Page("RecallMax™ Login").Sync
Browser("RecallMax™ Login").CloseAllTabs @@ hightlight id_;_67858_;_script infofile_;_ZIP::ssf40.xml_;_


