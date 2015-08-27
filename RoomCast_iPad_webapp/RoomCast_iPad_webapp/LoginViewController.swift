//
//  LoginViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 16/05/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class LoginViewController: UIViewController, WKNavigationDelegate, UIWebViewDelegate {
    
    var webView: WKWebView!
    var loadingWebView: UIWebView!
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.webView = WKWebView()
        self.webView.navigationDelegate = self
        self.loadingWebView = UIWebView()
        self.loadingWebView.delegate = self
    }
    
    func webViewDidFinishLoad(webView: UIWebView) {
    }
    
    func webView(webView: WKWebView, didFinishNavigation navigation: WKNavigation!) {
        self.view = self.webView
    }
    
    func pathForBuggyWKWebView(filePath: String?) -> String? {
        let fileMgr = NSFileManager.defaultManager()
        let tmpPath = NSTemporaryDirectory().stringByAppendingPathComponent("www")
        var error: NSErrorPointer = nil
        if !fileMgr.createDirectoryAtPath(tmpPath, withIntermediateDirectories: true, attributes: nil, error: error) {
            println("Couldn't create www subdirectory. \(error)")
            return nil
        }
        let dstPath = tmpPath.stringByAppendingPathComponent(filePath!.lastPathComponent)
        if !fileMgr.fileExistsAtPath(dstPath) {
            if !fileMgr.copyItemAtPath(filePath!, toPath: dstPath, error: error) {
                println("Couldn't copy file to /tmp/www. \(error)")
                return nil
            }
        }
        return dstPath
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view = self.loadingWebView
        
        // Load loading page
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/loading")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile as String, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                loadingWebView.loadHTMLString(htmlString as String, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/loading")!)
            } else {
                println("Bundle not found.")
            }
        } else {
            println("File not found.")
        }
        
        // Load login page
        let orgFolder = NSBundle.mainBundle().resourcePath! + "/assets/login";
        var newFilePath = pathForBuggyWKWebView(orgFolder)
        self.webView.loadRequest(NSURLRequest(URL: NSURL.fileURLWithPath(newFilePath! + "/index.html")!))
        
    }
    
    override func didReceiveMemoryWarning() {
        println("memory warning")
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
    // Controller for the WK web view
    func webView(webView: WKWebView, decidePolicyForNavigationAction navigationAction: WKNavigationAction, decisionHandler: (WKNavigationActionPolicy) -> Void) {
        
        var request = navigationAction.request
        
        // These need to match the values defined in JavaScript: roomcast://playChannel
        var appScheme: NSString = "roomcast"

        // Ignore legit webview requests so they load normally
        if(request.URL!.scheme! != appScheme) {
            decisionHandler(WKNavigationActionPolicy.Allow)
            return
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
        case "storeLoginValues":
            storeLoginValues(parameters)
            break
        default:
            decisionHandler(WKNavigationActionPolicy.Cancel)
            return
        }
        
        decisionHandler(WKNavigationActionPolicy.Cancel)
    }
    
    func storeLoginValues(parameters: Dictionary<String, String>) {
        let broker = parameters["broker"] as String!
        let app_id = parameters["app_id"] as String!
        let run_id = parameters["run_id"] as String!
                
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setValue(broker, forKey: DefaultsKeys.broker)
        defaults.setValue(app_id, forKey: DefaultsKeys.app_id)
        defaults.setValue(run_id, forKey: DefaultsKeys.run_id)

        self.login()
    }
    
    class func retrieveBroker() -> String? {
        let defaults = NSUserDefaults.standardUserDefaults()
        return defaults.valueForKey(DefaultsKeys.broker) as? String
    }
    
    class func retrieveRunId() -> String? {
        let defaults = NSUserDefaults.standardUserDefaults()
        return defaults.valueForKey(DefaultsKeys.run_id) as? String
    }
    
    class func retrieveAppId() -> String? {
        let defaults = NSUserDefaults.standardUserDefaults()
        return defaults.valueForKey(DefaultsKeys.app_id) as? String
    }
    
    func login() {
        let broker = LoginViewController.retrieveBroker()
        if let broker = broker {
            self.performSegueWithIdentifier("loginSegue", sender: self)
        }
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        switch (segue.identifier!) {
        case "loginSegue":
            // do nothing
            break
        default:
            // do nothing
            break
        }
        
    }
    
    //////////// REACT.js METHODS ////////////
    

    
    //////////////////////////////////////////
    
}

