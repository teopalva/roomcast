//
//  NativeView.swift
//  RoomCast_iPad_webapp
//
//  Created by Matteo Palvarini on 04/03/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit

class NativeView: UIView {

    override func awakeFromNib() {
    }
    
    override func hitTest(point: CGPoint, withEvent event: UIEvent?) -> UIView? {
        var hitView = super.hitTest(point, withEvent: event)
        if (hitView! == self) {
            return nil
        }
        else {
            return hitView!
        }
    }
    
}
