//
//  Channel.swift
//  RoomCast_iPad
//
//  Created by Matteo Palvarini on 16/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Foundation
import AppKit

class Channel: NSObject {
    
    var name : String = ""
    var iconName : String = " "
    var chDescription : String = ""
    var contentUrl: String?
    
    var icon: NSImage {
        get {
            if let img = NSImage(named: iconName) {
                return img
            }
            return NSImage(named: "ch00")!
        }
    }
    
    override init() {
        super.init()
    }
    
    init (name: String, iconName: String, chDescription: String, contentUrl: String?) {
        self.name = name
        self.iconName = iconName
        self.chDescription = chDescription
        self.contentUrl = contentUrl
        
    }
    
    
}

