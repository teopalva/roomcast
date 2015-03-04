//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class MenuViewController: UIViewController { //WKNavigationDelegate {
    
    var webView: UIWebView?
    
    override func loadView() {
        // TODO: currently using UIWebView because of bug of WK when loading local files
        self.webView = UIWebView()
        //self.webView!.navigationDelegate = self
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
    
    
}

