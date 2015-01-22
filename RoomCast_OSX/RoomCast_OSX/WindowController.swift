//
//  WindowController.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 22/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa

class WindowController: NSWindowController {
    
    @IBOutlet weak var collectionView: NSCollectionView!

    override func windowDidLoad() {
        super.windowDidLoad()
        
        // Automatic full screen
        //self.window?.toggleFullScreen(self)
    
        // Implement this method to handle any initialization after your window controller's window has been loaded from its nib file.
    }

}
