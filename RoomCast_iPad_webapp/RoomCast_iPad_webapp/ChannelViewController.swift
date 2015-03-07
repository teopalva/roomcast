//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class ChannelViewController: UIViewController, WKNavigationDelegate {
    
    @IBOutlet weak var homeButton: UIImageView!

    @IBOutlet var nativeView: NativeView!
    var webView: WKWebView?
    
    var url : String? = nil
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.webView = WKWebView()
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
        self.view = self.webView!
        self.view.addSubview(self.nativeView)
        
        // Load from external website
        if let url = url {
            let requestURL = NSURL(string:url)
            let request = NSURLRequest(URL: requestURL!)
            self.webView!.loadRequest(request)
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
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
    func backToMenu() {
        println("click")
    }
    
}

