//
//  NewActivityViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 09/04/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class NewActivityViewController: UIViewController, UIWebViewDelegate {
    
    var webView: UIWebView!
    var rid: String? = nil
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        self.webView = UIWebView()
        self.webView.scrollView.bounces = false
        self.webView.scalesPageToFit = false
        self.webView.multipleTouchEnabled = false
        self.webView.delegate = self
        
        self.view = self.webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load main interface from local files
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/new-activity")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile as String, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView.loadHTMLString(htmlString as String, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/new-activity")!)
                println("Page loaded.")
            } else {
                println("Bundle not found.")
            }
        } else {
            println("File not found.")
        }
        
    }
    
    // Controller for the web view
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        // These need to match the values defined in JavaScript: roomcast://playChannel
        var appScheme: NSString = "roomcast"
        //var actionType: NSString = "playChannel"
        
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
        case "discardNewActivityScreen":
            let rid = parameters["rid"] as String!
            self.rid = rid
            discardNewActivityScreen()
            break
        default:
            return false
        }
        
        return false
    }
    
    func discardNewActivityScreen() {
        self.performSegueWithIdentifier("newActivityUnwindSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        var nextVC = segue.destinationViewController as! MenuViewController
        if let rid = self.rid {
            nextVC.setResourceIdentity(rid)
        }
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
}
