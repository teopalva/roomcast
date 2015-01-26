//
//  WebViewController.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 25/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa
import WebKit

class ChannelViewController: NSViewController {
    
    @IBOutlet weak var webView: WebView!
    
    var url : String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if url != nil {
            let requestURL = NSURL(string:url!)
            let request = NSURLRequest(URL: requestURL!)
            webView.mainFrame.loadRequest(request)
        }
        
    }
    
}
