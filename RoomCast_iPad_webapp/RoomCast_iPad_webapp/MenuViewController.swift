//
//  ViewController.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 27/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import WebKit

class MenuViewController: UIViewController {

    var webView: WKWebView?
    
    override func loadView() {
        self.webView = WKWebView()
        
        //If you want to implement the delegate
        //self.webView!.navigationDelegate = self
        
        self.view = self.webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load from external website
        
        var url : String? = "http://localhost:3000/"
        if let url = url {
            let requestURL = NSURL(string:url)
            let request = NSURLRequest(URL: requestURL!)
            self.webView!.loadRequest(request)
        }

        /*
        // Load from local files
        var htmlFile: NSString? = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var htmlString: NSString?
        
        if let htmlFile = htmlFile {
            htmlString = NSString(contentsOfFile: htmlFile, encoding: NSUTF8StringEncoding, error: nil)!
            if let htmlString = htmlString {
                var bundle: String = NSBundle.mainBundle().bundlePath
                webView?.loadHTMLString(htmlString, baseURL: NSURL(fileURLWithPath: "\(bundle)/web_example"))
            }
        } else {
            println("File not found.")
        }
        */
        
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
