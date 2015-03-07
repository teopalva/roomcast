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
    
    var webView: UIWebView?
    
    // Channel's url
    var url: String? = nil
    
    override func loadView() {
        // TODO: currently using UIWebView because of bug of WK when loading local files
        self.webView = BasicWebView()
        self.webView!.scrollView.bounces = false
        self.webView!.delegate = self
        self.view = self.webView
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
        
        // Load from local files
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView?.loadHTMLString(htmlString, baseURL: NSURL(fileURLWithPath: "\(bundle)/")!)
                //println(NSBundle.mainBundle().pathForResource("app", ofType: "js")!)
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
    
    /*
    func switchViews () {
    (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    // Load the first request in place, because there is no web view currently showing
    if (self.makingFirstRequest) {
    self.makingFirstRequest = NO;
    return YES;
    }
    // The web view that is currently showing originated the request
    if (webView == self.visibleWebView) {
    [self.hiddenWebView loadRequest:request];
    [UIView animateWithDuration:duration animations:^{
    // Some desired animation here
    } completion:^(BOOL finished) {
    UIWebView *oldVisibleWebView = self.visibleWebView;
    self.visibleWebView = self.hiddenWebView;
    self.hiddenWebView = oldVisibleWebView;
    }
    return NO;
    }
    return YES;
    }
    }
    */
    
    // Controller for the web view
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        println("url called")
        
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
            
            url = parameters["url"] as String?
            if let url = url {
                if(countElements(url) < 7) {
                    return false
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
        
        return false;
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        var nextVC = segue.destinationViewController as ChannelViewController
        nextVC.url = url
    }
    
    @IBAction func unwindToMenu(unwindSegue: UIStoryboardSegue) {
        
    }
    
    
}

