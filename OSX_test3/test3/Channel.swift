//
//  Channel.swift
//  RoomCast_iPad
//
//  Created by Matteo Palvarini on 16/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Foundation

class Channel: NSObject {
    
    var name : String = "name"
    var iconName : String = "iconName"
    var chDescription : String = "descr"
    var contentUrl: String?
    
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


