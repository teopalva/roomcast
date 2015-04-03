//
//  ViewController.swift
//  RoomCast_iPad_broadcastingApp
//
//  Created by Matteo Palvarini on 03/04/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class MainViewController: UIViewController, UIWebViewDelegate {
    
    var webView: UIWebView!
    
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
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html", inDirectory: "./assets/main")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView.loadHTMLString(htmlString, baseURL: NSURL(fileURLWithPath: "\(bundle)/assets/main")!)
                println("Page loaded.")
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


}

