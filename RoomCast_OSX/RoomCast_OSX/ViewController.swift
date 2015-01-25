//
//  ViewController.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 25/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {
    
    @IBOutlet weak var collectionView: NSCollectionView!
    
    @IBOutlet var arrayController: NSArrayController!
    
    var channels: NSMutableArray!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Fix Xcode bug
        let itemPrototype = self.storyboard?.instantiateControllerWithIdentifier("collectionViewItem") as NSCollectionViewItem
        self.collectionView.itemPrototype = itemPrototype
        
        // Update content
        channels = NSMutableArray()
        var array : NSMutableArray = NSMutableArray()
        
        let ch1 = Channel(name: "Channel1", iconName: "ch01", chDescription: "The first channel", contentUrl: "http://apple.com")
        arrayController.addObject(ch1)
        let ch2 = Channel(name: "Channel2", iconName: "ch02", chDescription: "The second channel", contentUrl: "http://google.com")
        arrayController.addObject(ch2)
        let ch3 = Channel(name: "Channel3", iconName: "ch03", chDescription: "The third channel", contentUrl: nil)
        arrayController.addObject(ch3)
        let ch4 = Channel(name: "Channel4", iconName: "ch04", chDescription: "The fourth channel", contentUrl: "http://mpalva2.people.uic.edu/viz")
        arrayController.addObject(ch4)
        
        var i: Int
        for i in 5...30 {
            let ch = Channel(name: "Channel", iconName: "ch00", chDescription: "Another channel", contentUrl: nil)
            arrayController.addObject(ch)
        }
        
        
    }
    
    override var representedObject: AnyObject? {
        didSet {
            // Update the view, if already loaded.
        }
    }
    
    
}

