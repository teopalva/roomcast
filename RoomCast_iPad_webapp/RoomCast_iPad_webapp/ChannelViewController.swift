//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class ChannelViewController: UIViewController, UIWebViewDelegate { //WKNavigationDelegate {
    
    var webView: UIWebView?
    
    var url : String? = nil
    
    override func loadView() {
        // TODO: currently using UIWebView because of bug of WK when loading local files
        self.webView = UIWebView()
        //self.webView!.navigationDelegate = self
        self.view = self.webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load from external website
        if let url = url {
        let requestURL = NSURL(string:url)
        let request = NSURLRequest(URL: requestURL!)
        self.webView!.loadRequest(request)
        }
        
    }
    
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        return true
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
    func webView(webView: UIWebView, request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
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
        var jsonDictString: String! = request.URL.fragment!.stringByReplacingPercentEscapesUsingEncoding(NSASCIIStringEncoding)
        
        // Act based on actionType
        if(actionType == "playChannel") {
            
            // Deserialize JSON fragment string into Swift dictionary
            var parameters = Dictionary<String, String>()
            var error : NSError?
            let JSONData = jsonDictString.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)
            let JSONDictionary: Dictionary = NSJSONSerialization.JSONObjectWithData(JSONData!, options: nil, error: &error) as NSDictionary
            for (key, value) in JSONDictionary {
                let keyName = key as String
                let keyValue: String = value as String
                parameters[keyName] = keyValue
            }
            
            var chId: String? = parameters["chId"]
            if let chId = chId {
                
            }
            
        }
        
        
        
        return false;
    }
    
    
}

