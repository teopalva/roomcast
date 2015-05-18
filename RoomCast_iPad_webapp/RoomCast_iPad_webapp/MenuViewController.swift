//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class MenuViewController: UIViewController, UIWebViewDelegate { //WKNavigationDelegate {
    
    var webView: UIWebView!
    @IBOutlet var launchView: UIView!
    
    // Channel's url
    var url: String? = nil
    
    // Package (resource) id, i.e. rid
    var package_id: String? = nil
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        // TODO: currently using UIWebView because of bug of WK when loading local files
        self.webView = BasicWebView()
        self.webView.scrollView.bounces = false
        self.webView.scalesPageToFit = false
        self.webView.multipleTouchEnabled = false
        self.webView.delegate = self

    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadInterface()
    }
    
    func loadInterface() {
        // Load main menu from local files
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/menu")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile as String, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView.loadHTMLString(htmlString as String, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/menu")!)
            } else {
                println("Bundle not found.")
            }
        } else {
            println("File not found.")
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
    // Controller for the web view
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        // These need to match the values defined in JavaScript: roomcast://playChannel
        var appScheme: NSString = "roomcast"
        
        // Ignore legit webview requests so they load normally
        if(request.URL!.scheme! != appScheme) {
            return true;
        }
        
        // Get the action from the path
        var actionType: NSString = request.URL!.host!
        
        // Deserialize the request JSON
        var jsonDictString: String? = request.URL!.fragment?.stringByReplacingPercentEscapesUsingEncoding(NSASCIIStringEncoding)
        
        var parameters = Dictionary<String, String>()
        // Deserialize JSON fragment string into Swift dictionary
        if let jsonDictString = jsonDictString {
            var error : NSError?
            let JSONData = jsonDictString.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)
            
            if let JSONDictionary = NSJSONSerialization.JSONObjectWithData(JSONData!, options: nil, error: &error) as? NSDictionary {
                for (key, value) in JSONDictionary {
                    let keyName = key as! String
                    let keyValue: String = value as! String
                    parameters[keyName] = keyValue
                }
            }
            
        }
        
        // Act based on actionType
        switch actionType {
        case "playChannel":
            playChannel(parameters)
        case "promptNewActivityScreen":
            promptNewActivityScreen()
        case "discardNewActivityScreen":
            discardNewActivityScreen()
        case "getResourceIdentity":
            getResourceIdentity()
        case "setResourceIdentity":
            let rid = parameters["rid"] as String!
            setResourceIdentity(rid)
        case "login":
            nutellaInit()
        case "logout":
            logout()
        case "requestLogin":
            reactLogin()
        case "responsePackageId":
            self.package_id = parameters["package_id"] as String!
        default:
            return false
        }
        
        return false
    }
    
    func playChannel(parameters: Dictionary<String, String>) {
        url = parameters["url"] as String?
        if let url = url {
            if(count(url) < 7) {
                return
            }
            if (url.substringWithRange(Range<String.Index>(start: url.startIndex, end: advance(url.startIndex, 7))) == "http://") {
                
                // Pass extra info to the web channel
                self.url = url + "&package_id=\(self.package_id)"
                println(self.url)
                
                // Play web channel
                self.performSegueWithIdentifier("playChannelSegue", sender: self)
                
            } else {
                
                // Play native channel
                let customUrl: NSURL = NSURL(string:url)!
                if (UIApplication.sharedApplication().canOpenURL(customUrl)) {
                    UIApplication.sharedApplication().openURL(customUrl)
                } else {
                    println("Could not open " + url)
                }
                
            }
        } else {
            println("Empty Channel!")
        }
    }
    
    func promptNewActivityScreen() {
        self.performSegueWithIdentifier("newActivitySegue", sender: self)
    }
    
    func discardNewActivityScreen() {
        
    }
    
    func getResourceIdentity() {
        let rid = retrieveResourceIdentity()
        if let rid = rid {
            handleUpdatedRid(rid)
        } else {
            setModalRightNav();
        }
        //componentDidMountCallback()
    }
    
    func setResourceIdentity(rid: String) {
        self.package_id = rid
        storeResourceIdentity(rid)
        handleUpdatedRid(rid)
    }
    
    func webViewDidFinishLoad(webView: UIWebView) {
        self.view = self.webView
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        switch (segue.identifier!) {
        case "playChannelSegue":
            var nextVC = segue.destinationViewController as! ChannelViewController
            nextVC.url = url
            break
        case "newActivitySegue":
            // do nothing
            break
        default:
            // do nothing
            break
        }
        
    }
    
    @IBAction func unwindToMenu(unwindSegue: UIStoryboardSegue) {
        
    }
    
    func retrieveResourceIdentity() -> String? {
        println("fetching rid")
        let (dictionary, error) = Locksmith.loadDataForUserAccount("roomcast")
        if let dictionary = dictionary {
            return dictionary.objectForKey("rid") as? String
        } else {
            return nil
        }
    }
    
    func storeResourceIdentity(rid: String) {
        println("storing \(rid)")
        if let storedRid = retrieveResourceIdentity() {
            let error = Locksmith.updateData(["rid": rid], forUserAccount: "roomcast")
        } else {
            let error = Locksmith.saveData(["rid": rid], forUserAccount: "roomcast")
        }
    }
    
    func logout() {
        Locksmith.deleteDataForUserAccount("roomcast")
        Locksmith.deleteDataForUserAccount("roomcast_broker")
        Locksmith.deleteDataForUserAccount("roomcast_app_id")
        Locksmith.deleteDataForUserAccount("roomcast_run_id")
        self.performSegueWithIdentifier("unwindToLoginSegue", sender: self)
    }
    
    //////////// REACT.js METHODS ////////////
    
    func handleUpdatedRid(rid: String) {
        let script: String = "ReactMain.handleSelectedResource('\(rid)')"
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func setModalRightNav() {
        let script: String = "ReactMain.setModalRightNav()"
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func handleLogout() {
        let script: String = "ReactMain.handleLogout()";
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func reactLogin() {
        
        let broker = LoginViewController.retrieveBroker()
        let app_id = LoginViewController.retrieveAppId()
        let run_id = LoginViewController.retrieveRunId()
        
        let script: String = "ReactLogin('\(broker!)', '\(app_id!)', '\(run_id!)')";
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func requestPackageId() {
        let script: String = "ReactMain.requestPackageId()";
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func nutellaInit() {
        let broker = LoginViewController.retrieveBroker()
        let app_id = LoginViewController.retrieveAppId()
        let run_id = LoginViewController.retrieveRunId()
        //let script: String = "window.nutella = NUTELLA.init('\(broker!)', '\(app_id!)', '\(run_id!)', 'main-interface')";
        //let script: String = "window.nutella = NUTELLA.init('52.1.142.215', 'test_0.4.20', 'run3', 'main-interface', function(connected){if(connected){ document.location.href = 'roomcast://loadMenu'; }})";
        //let script: String = "var nutella = NUTELLA.init('52.1.142.215', 'test_0.4.20', 'run3', 'main-interface'); var action = function() {document.location.href = 'roomcast://loadMenu';}; setTimeout(action, 2000);";
        //self.webView.stringByEvaluatingJavaScriptFromString(script)
        
    }
    
    //////////////////////////////////////////
    
}

