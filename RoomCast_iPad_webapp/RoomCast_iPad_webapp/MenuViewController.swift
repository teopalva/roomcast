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
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        // TODO: currently using UIWebView because of bug of WK when loading local files
        self.webView = BasicWebView()
        self.webView.scrollView.bounces = false
        self.webView.delegate = self
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        /*
        // Load from external website
        var url : String? = "http://52.1.142.215:57880/roomcast/main-interface/index.html?run_id=roomcast&broker=52.1.142.215"
        if let url = url {
        let requestURL = NSURL(string:url)
        let request = NSURLRequest(URL: requestURL!)
        self.webView!.loadRequest(request)
        }
        */
        
        // Load main menu from local files
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/menu")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView.loadHTMLString(htmlString, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/menu")!)
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
        //var actionType: NSString = "playChannel"
        
        // Ignore legit webview requests so they load normally
        if(request.URL.scheme! != appScheme) {
            return true;
        }
        
        // Get the action from the path
        var actionType: NSString = request.URL.host!
        
        // Deserialize the request JSON
        var jsonDictString: String? = request.URL.fragment?.stringByReplacingPercentEscapesUsingEncoding(NSASCIIStringEncoding)
        
        var parameters = Dictionary<String, String>()
        // Deserialize JSON fragment string into Swift dictionary
        if let jsonDictString = jsonDictString {
            var error : NSError?
            let JSONData = jsonDictString.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)
            let JSONDictionary: Dictionary = NSJSONSerialization.JSONObjectWithData(JSONData!, options: nil, error: &error) as NSDictionary
            for (key, value) in JSONDictionary {
                let keyName = key as String
                let keyValue: String = value as String
                parameters[keyName] = keyValue
            }
        }
        
        // Act based on actionType
        switch actionType {
        case "playChannel":
            playChannel(parameters)
        case "getResourceIdentity":
            getResourceIdentity()
        case "setResourceIdentity":
            setResourceIdentity(parameters)
        default:
            return false
        }
        
        return false
    }
    
    func playChannel(parameters: Dictionary<String, String>) {
        url = parameters["url"] as String?
        if let url = url {
            if(countElements(url) < 7) {
                return
            }
            if (url.substringWithRange(Range<String.Index>(start: url.startIndex, end: advance(url.startIndex, 7))) == "http://") {
                self.performSegueWithIdentifier("playChannelSegue", sender: self)
            } else {
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
    
    func getResourceIdentity() {
        let rid = retrieveResourceIdentity()
        if let rid = rid {
            handleUpdatedRid(rid)
        } else {
            setModalRightNav(); 
        }
        //componentDidMountCallback()
    }
    
    func setResourceIdentity(parameters: Dictionary<String, String>) {
        let rid = parameters["rid"] as String!
        storeResourceIdentity(rid)
        handleUpdatedRid(rid)
    }
    
    func webViewDidFinishLoad(webView: UIWebView) {
        self.view = self.webView
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        var nextVC = segue.destinationViewController as ChannelViewController
        nextVC.url = url
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
    
    //////////// REACT.js METHODS ////////////
    
    func handleUpdatedRid(rid: String) {
        let script: String = "ReactMain.handleSelectedResource('\(rid)')"
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func setModalRightNav() {
        let script: String = "ReactMain.setModalRightNav()"
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    func componentDidMountCallback() {
        let script: String = "componentDidMountCallback()";
        self.webView.stringByEvaluatingJavaScriptFromString(script)
    }
    
    //////////////////////////////////////////
    
}

