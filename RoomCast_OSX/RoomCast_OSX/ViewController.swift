//
//  ViewController.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 19/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {
    
    var channels = [Channel]()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let ch1 = Channel(name:"Channel1", iconName: "ch01", description: "The first channel", contentUrl: "http://apple.com")
        channels.append(ch1)
        let ch2 = Channel(name:"Channel2", iconName: "ch02", description: "The second channel", contentUrl: "http://google.com")
        channels.append(ch2)
        let ch3 = Channel(name:"Channel3", iconName: "ch03", description: "The third channel", contentUrl: nil)
        channels.append(ch3)
        let ch4 = Channel(name:"Channel4", iconName: "ch04", description: "The fourth channel", contentUrl: "http://mpalva2.people.uic.edu/viz")
        channels.append(ch4)
        
        var i: Int
        for i in 5...30 {
            let ch = Channel(name:"Channel", iconName: "ch00", description: "Another channel", contentUrl: nil)
            channels.append(ch)
        }

    }

    override var representedObject: AnyObject? {
        didSet {
        // Update the view, if already loaded.
        }
    }


}

