//
//  ChannelWebView.swift
//  RoomCast_iPad
//
//  Created by Matteo Palvarini on 16/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit

class ChannelViewController: UIViewController {

    /*
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
    }
    */
    
    @IBOutlet weak var webView: UIWebView!
    
    var url : String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if url != nil {
            let requestURL = NSURL(string:url!)
            let request = NSURLRequest(URL: requestURL!)
            webView.loadRequest(request)
        }
        
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }

}
