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
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
       //  println(self.window!.canBecomeKeyWindow)

    }
    
    override func keyDown(event: NSEvent) {
        
        var app = NSApplication.sharedApplication().delegate
        
        if (event.keyCode == 11) { // B
            if let ad = app as? AppDelegate {
                ad.switchDelegate?.backToMenu()
            }
            println("pressed B")
        }
        
    }
    
    override func resignFirstResponder() -> Bool {
        return true
    }
    
    override func becomeFirstResponder() -> Bool {
        return true
    }
    
}
