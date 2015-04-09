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
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    /*
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
    // Get the new view controller using segue.destinationViewController.
    // Pass the selected object to the new view controller.
    }
    */
    
}
