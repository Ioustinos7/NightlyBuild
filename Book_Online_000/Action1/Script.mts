'This is the exact same test as BasicLogin_Test.java in Selenium. This is to prove that the same tests can be created/run in UFT.
'This particular test is just to verify that a practice admin can login, access all of the pages, have elements appear then logoff
'At the end a standard user will attempt to login and that should fail

'hit the login page, login as a practice admin
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Set "AutomatedTestAdmin" @@ script infofile_;_ZIP::ssf1.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("password").SetSecure "5fb2a5e9b6b1c51eca797a8e92db3c2e13ede957532e1a5cc595c578eb1d8fe484fa085c" @@ script infofile_;_ZIP::ssf2.xml_;_
'Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Click @@ script infofile_;_ZIP::ssf3.xml_;_
'make sure we're logged in
'Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").Check CheckPoint("Welcome AutomatedTestAdmin") @@ script infofile_;_ZIP::ssf4.xml_;_
'''''This function will login and verify, it does the same thing as the code above'''''
Call adminlogin("AutomatedTestAdmin", "Welcome55!")
'get to the book online page
Browser("RecallMax™ Login").Page("Key Indicators").Link("Book Online").Click @@ script infofile_;_ZIP::ssf5.xml_;_
'make sure it loads + check that we're logged in
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Book Online - Overview").WebElement("Welcome to RecallMax™").Check CheckPoint("Welcome to RecallMax™ Online Booking.") @@ script infofile_;_ZIP::ssf6.xml_;_
'go to the providers/treatment page
Browser("RecallMax™ Login").Page("Book Online - Overview").Link("Providers / Treatments").Click @@ script infofile_;_ZIP::ssf8.xml_;_
'check that we're on the provider/treatment page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").WebElement("Treatments Offered for").Check CheckPoint("Treatments Offered for Online Booking:") @@ script infofile_;_ZIP::ssf9.xml_;_
'go to the schedule page
Browser("RecallMax™ Login").Page("Book Online - Providers/Treatm").Link("Schedule").Click @@ script infofile_;_ZIP::ssf10.xml_;_
'wait until the page loads + check that we're on the schedule page
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").WaitProperty "visible", true, 10000
Browser("RecallMax™ Login").Page("Book Online - Schedule").WebButton("Enable / Disable Chairs").Check CheckPoint("Enable / Disable Chairs") @@ script infofile_;_ZIP::ssf11.xml_;_
'go to the office closures page
Browser("RecallMax™ Login").Page("Book Online - Schedule").Link("Office Closures").Click @@ script infofile_;_ZIP::ssf13.xml_;_
'check that we're on the office closures page
Browser("RecallMax™ Login").Page("Book Online - Office Closures").WebButton("Add Office Closure").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Book Online - Office Closures").WebButton("Add Office Closure").Check CheckPoint("Add Office Closure") @@ script infofile_;_ZIP::ssf14.xml_;_
'go to the vacation/time off page
Browser("RecallMax™ Login").Page("Book Online - Office Closures").Link("Vacation / Time Off").Click @@ script infofile_;_ZIP::ssf16.xml_;_
'wait until the page loads + check that we're on the vacation/time off page
Browser("RecallMax™ Login").Page("Book Online - Vacations/Time").WebElement("Vacations/Time Off").WaitProperty "visible", true, 3000
Browser("RecallMax™ Login").Page("Book Online - Vacations/Time").WebElement("Vacations/Time Off").Check CheckPoint("Vacations/Time Off") @@ script infofile_;_ZIP::ssf17.xml_;_
'go to the settings page
Browser("RecallMax™ Login").Page("Book Online - Vacations/Time").Link("Settings").Click @@ script infofile_;_ZIP::ssf19.xml_;_
'wait until the page loads
Browser("RecallMax™ Login").Page("Book Online - Settings").WebElement("settingsHeader").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf20.xml_;_
'check that we're on the settings page @@ script infofile_;_ZIP::ssf18.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Settings").WebElement("settingsHeader").Check CheckPoint("settingsHeader") @@ script infofile_;_ZIP::ssf21.xml_;_
'click on the website setup page @@ script infofile_;_ZIP::ssf15.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Settings").Link("Website Setup").Click @@ script infofile_;_ZIP::ssf22.xml_;_
'wait until it loads and verify we landed on the correct page
Browser("RecallMax™ Login").Page("Book Online - Website").WebElement("Installation").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf23.xml_;_
Browser("RecallMax™ Login").Page("Book Online - Website").WebElement("Installation").Check CheckPoint("Installation") @@ script infofile_;_ZIP::ssf24.xml_;_
'Go to the overview page
Browser("RecallMax™ Login").Page("Book Online - Website").Link("Overview").Click @@ script infofile_;_ZIP::ssf25.xml_;_
'check that we landed on the correct page
Browser("RecallMax™ Login").Page("Book Online - Overview_2").WebElement("Review").Check CheckPoint("Review") @@ script infofile_;_ZIP::ssf26.xml_;_
'logout the admin user
Browser("RecallMax™ Login").Page("Book Online - Overview_2").Link("Return to Dashboard").Click @@ script infofile_;_ZIP::ssf27.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").WebElement("Welcome AutomatedTestAdmin").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf28.xml_;_
'logout @@ script infofile_;_ZIP::ssf12.xml_;_
Browser("RecallMax™ Login").Page("Key Indicators").Link("Logout").Click @@ script infofile_;_ZIP::ssf29.xml_;_
'check that we are in fact logged out @@ script infofile_;_ZIP::ssf7.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").Image("loginLogo").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf30.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Check CheckPoint("username") @@ script infofile_;_ZIP::ssf31.xml_;_
'Let's login as the standard user
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("username").Set "AutomatedTestStandard" @@ script infofile_;_ZIP::ssf32.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebEdit("password").SetSecure "5fb2a91239c732217aee402f4ca3b6c11c37624266764ea3a4fe0f374c20" @@ script infofile_;_ZIP::ssf33.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Click @@ script infofile_;_ZIP::ssf34.xml_;_
'Check that they're being told they do not have access
Browser("RecallMax™ Login").Page("https://stagingcentral1.recall").WebElement("Sorry but you need to").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf35.xml_;_
Browser("RecallMax™ Login").Page("https://stagingcentral1.recall").WebElement("Sorry but you need to").Check CheckPoint("Sorry but you need to be a practice administrator or higher to access to this part of the system.") @@ script infofile_;_ZIP::ssf36.xml_;_
'refresh the browser, this should kick the user out and take them back to the login page
Browser("RecallMax™ Login").Refresh @@ script infofile_;_ZIP::ssf37.xml_;_
'ensure we did end up at the login page
Browser("RecallMax™ Login").Page("RecallMax™ Login").Image("loginLogo").WaitProperty "visible", true, 3000 @@ script infofile_;_ZIP::ssf39.xml_;_
Browser("RecallMax™ Login").Page("RecallMax™ Login").WebButton("Login").Check CheckPoint("Login") @@ script infofile_;_ZIP::ssf40.xml_;_
'close the tabs
Browser("RecallMax™ Login").Page("RecallMax™ Login").Sync
Browser("RecallMax™ Login").CloseAllTabs

'This should do it for now, I'll add in more logging and output but if this test passes on it's own it still proves that basic login functionality is fine.
