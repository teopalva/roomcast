//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class ChannelViewController: UIViewController, WKNavigationDelegate, UIWebViewDelegate {
    
    @IBOutlet weak var homeButton: UIImageView!

    @IBOutlet var nativeView: NativeView!
    var webView: WKWebView!
    var loadingWebView: UIWebView!
    
    var url : String? = nil
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.webView = WKWebView()
        self.webView.navigationDelegate = self
        self.loadingWebView = UIWebView()
        self.loadingWebView.delegate = self
    }
    
   /*
    // If called, the outlets form Storyboard don't get loaded
    override func loadView() {
        self.webView = WKWebView()
        self.view.addSubview(self.webView!)
    }
   */
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Once the native view has been loaded, we can switch order of views
        self.view = self.loadingWebView
        self.view.addSubview(self.nativeView)
        
        // Load loading page
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/loading")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                loadingWebView.loadHTMLString(htmlString, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/loading")!)
            } else {
                println("Bundle not found.")
            }
        } else {
            println("File not found.")
        }
        
        // Load content from external website
        if let url = url {
            let requestURL = NSURL(string:url)
            let request = NSURLRequest(URL: requestURL!)
            self.webView.loadRequest(request)
        }
        
        /*
        // Add back button programmatically
        let button = UIButton.buttonWithType(UIButtonType.System) as UIButton
        button.frame = CGRectMake(100, 100, 100, 50)
        button.backgroundColor = UIColor.clearColor()
        button.addTarget(self, action: "buttonAction:", forControlEvents: UIControlEvents.TouchUpInside)
        var buttonImage: UIImage = UIImage(named: "button-menu")!
        button.setImage(buttonImage, forState: UIControlState.Normal)
        self.view.addSubview(button)
        */
        
    }
    
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        return true
    }
    
    func webView(webView: WKWebView, decidePolicyForNavigationAction navigationAction: WKNavigationAction, decisionHandler: (WKNavigationActionPolicy) -> Void) {
        decisionHandler(WKNavigationActionPolicy.Allow)
    }
    
    func webView(webView: WKWebView, didFinishNavigation navigation: WKNavigation!) {
        self.view = self.webView
        self.view.addSubview(self.nativeView)
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
    func backToMenu() {
        println("click")
    }
    
}

