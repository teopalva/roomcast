//
//  ChannelWebView.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 27/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

//import Cocoa
import WebKit

class ChannelWebView: WebView {
    
    override func keyDown(event: NSEvent) {
        
        var app = NSApplication.sharedApplication().delegate
        
        if (event.keyCode == 11) { //For left arrow key
            if let ad = app as? AppDelegate {
                ad.switchDelegate?.backToMenu()
            }
            println("arrow left")
        }
        
    }
    
    func acceptsFirstResponder() -> Bool {
        return true
    }
    
    override func resignFirstResponder() -> Bool {
        return true
    }
    
    override func becomeFirstResponder() -> Bool {
        return true
    }
    
}
