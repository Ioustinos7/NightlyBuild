'This is a smaller test, also the first test totally built in UFT, there is no Selenium version of this test. I hope we end up picking this solution now...
'All I'm doing in this test is adding a treatment, provider. Then just checking that I can't add treatment without a description, and also to test that I can't delete treatment if it's assigned to a provider

'get to the dashboard
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Set "AutomatedTestAdmin" @@ script infofile_;_ZIP::ssf1.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("password").SetSecure "5fb2d24bc64292280b82f117ce2f4394a1f8aae5d19f795808b43d18112b7070b5a089a2" @@ script infofile_;_ZIP::ssf2.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Click
'Wait + check that I'm really logged in
'Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf4.xml_;_
'Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").Check CheckPoint("Welcome AutomatedTestAdmin")
'''''This function will login and verify, it does the same thing as the code above'''''
Call adminlogin("AutomatedTestAdmin", "Welcome55!")
'head to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf6.xml_;_
'click provider/treatment
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf7.xml_;_
'check that we're on the correct page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Treatments Offered for").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf8.xml_;_
'make sure we're starting with a clean table
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up") @@ script infofile_;_ZIP::ssf9.xml_;_
'add a treatment
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf10.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("name").Set "Root Canal" @@ script infofile_;_ZIP::ssf11.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("90 Minutes").Click @@ script infofile_;_ZIP::ssf13.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene").Click @@ script infofile_;_ZIP::ssf14.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Other").Click @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf16.xml_;_
'check that it saved ok
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf17.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Check CheckPoint("Root Canal") @@ script infofile_;_ZIP::ssf18.xml_;_
'Try to add in a treatment type without entering a description
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Treatment").Click @@ script infofile_;_ZIP::ssf19.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("5 Minutes10 Minutes15").Click @@ script infofile_;_ZIP::ssf20.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("30 Minutes").Click @@ script infofile_;_ZIP::ssf21.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Hygiene").Click @@ script infofile_;_ZIP::ssf22.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Recall").Click @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf24.xml_;_
'check that it fails and tells us that the name cannot be empty
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Service Name cannot be").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf25.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Service Name cannot be").Check CheckPoint("Service Name cannot be empty") @@ script infofile_;_ZIP::ssf26.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Cancel").Click @@ script infofile_;_ZIP::ssf27.xml_;_
'let's add a provider, and assign the one treatment type I did successfully create
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Add New Provider").Click @@ script infofile_;_ZIP::ssf28.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//form[@id='providerForm']/div[2]/div/i").Click @@ script infofile_;_ZIP::ssf29.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("xpath:=//*[@id='providerForm']/div[2]/div/div[2]/div[2]").Click @@ script infofile_;_ZIP::ssf31.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebEdit("displayName").Set "Juan Juanson" @@ script infofile_;_ZIP::ssf32.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement").Click @@ script infofile_;_ZIP::ssf33.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("WebElement_2").Click @@ script infofile_;_ZIP::ssf34.xml_;_
Set myObj=Description.Create
myObj("micclass").value="WebCheckBox"
Set allObjs=Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").ChildObjects(myObj)
For i=0 to allObjs.count -1
    allObjs(i).Set "ON"
   ' msgbox Err.Number
Next @@ script infofile_;_ZIP::ssf35.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Save").Click @@ script infofile_;_ZIP::ssf36.xml_;_
'wait + check that it saved
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Juan Juanson").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf37.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Juan Juanson").Check CheckPoint("Juan Juanson") @@ script infofile_;_ZIP::ssf38.xml_;_
'try to delete that treatment type now
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Click @@ script infofile_;_ZIP::ssf39.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf40.xml_;_
'wait + check that it did not allow us to delete that treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Root Canal is assigned").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf41.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Root Canal is assigned").Check CheckPoint("Root Canal is assigned to 1 providers and therefore cannot be deleted.") @@ script infofile_;_ZIP::ssf42.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Cancel").Click @@ script infofile_;_ZIP::ssf43.xml_;_
'delete the provider
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Juan Juanson").Click @@ script infofile_;_ZIP::ssf44.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf45.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf46.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Providers Set Up").Check CheckPoint("No Providers Set Up") @@ script infofile_;_ZIP::ssf47.xml_;_
'then delete that treatment type
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Root Canal").Click @@ script infofile_;_ZIP::ssf48.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebButton("Delete").Click @@ script infofile_;_ZIP::ssf49.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf50.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("No Treatments Set Up").Check CheckPoint("No Treatments Set Up_2") @@ script infofile_;_ZIP::ssf51.xml_;_
'back to the dashboard
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf52.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf53.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").Check CheckPoint("Welcome AutomatedTestAdmin_2") @@ script infofile_;_ZIP::ssf54.xml_;_
'logout + close the tab
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf55.xml_;_
Browser("RecallMax™ Login").CloseAllTabs

