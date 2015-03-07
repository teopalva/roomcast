//
//  BasicWebView.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 06/03/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit

class BasicWebView: UIWebView {

    /*
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
    }
    */
    
    override func canPerformAction(action: Selector, withSender sender: AnyObject?) -> Bool {
       return true
    }

}
