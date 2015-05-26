Adobe Premiere Pro HTML5 extension certificate problem
=======

This is a solution for self signed certificate problems in Adobe HTML5 extensions. I tested this only in Adobe Premiere Pro, but it should probably work in other Adobe applications. You need just to edit manifest.xml file if you want to be able to launch it elsewhere.

# Problem

Adobe applications have a build in HTML5 web browser. We can open there any web page we want. You can test that by opening any extension in Adobe Application and dragging to it a tab from normal browser like Firefox or Google Chrome. After dropping this tab into our extension this webpage should be visible inside the Adobe panel.

This is useful when we want to build something that allows us to load content into Adobe application from remote web server.

But what will happen if our webserver use a https connection and self signed certificate. If certificate is not configured correctly on the server and on the client PC Adobe will use silent error, which means that there will be no error message and nothing will change (In Adobe Premiere Pro 9.0 it should show an error message. In 8.0 and lower there will be a silent error).

# Solution

This extensions have a node.js http proxy server. It is launched every time when you open it in Adobe application. Http server redirects our requests to the url that we enter in the text field and returns all the data from the url. Node.js server is set to ignore any ssl errors, so it doesn't matter if the certificate is wrong.

Thanks to that Adobe don't need to make a connection to https website. It's connecting to the http server, so there is no error.

To test that please try to enter an url of a webpage that have a self signed certificate and shows a security risk info in your browser.  
Probably the page will not look exactly the same as in the browser, because resources like css or img files need to have relatives urls so the extension would be able to direct them to the proxy, but at least it will work.

# How to build

This works as a normal front-end javascript application. It has own build system that can create a package ready to add to the adobe application. 

Steps to build:

1. Set an output folder in Gruntfile.js file:  
var outputFolder = "...";  
*Hint! If we set the debug mode we can set the output folder under the CEP/extensions/[ourName] folder. If you want to read more about the debug mode please check this url:  
http://www.adobe.com/devnet/creativesuite/articles/a-short-guide-to-HTML5-extensions.html*
2. Run:  
npm install
3. Run:  
bower install
4. Run:  
grunt

# How to run

We can then build extension normally and add to our Extension Manager, or just use the output folder as in Step 1 of building instructions.