//
//  SwitchViewsDelegate.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 27/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Foundation

protocol SwitchViewsDelegate {
    
    func switchSubViews(webViewHasUrl url:String)
    func removeAllSubviews()
    
    
}