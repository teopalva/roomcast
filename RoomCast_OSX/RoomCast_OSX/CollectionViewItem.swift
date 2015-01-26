//
//  CollectionViewItem.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 25/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa

class CollectionViewItem: NSCollectionViewItem {
    
    
    @IBAction func channelSelected(sender: AnyObject) {
        self.performSegueWithIdentifier("segue_channelSelection", sender: sender)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do view setup here.
        
        println("loaded item")
    }
    
    // MARK: - Navigation
    
    override func prepareForSegue(segue: NSStoryboardSegue, sender: AnyObject?) {
        
        // Get the new view controller
        var nextVC = segue.destinationController as ChannelViewController
        
        // Pass the selected object to the new view controller
        let cell = sender as NSImageView
        let indexPath = 0//self.collectionView!.sele
        /*
        if let i = indexPath?.item{
        var url = channels[i].contentUrl
        nextVC.url = url
        }
        */
        nextVC.url = "http://google.com"
        println("click")
        
    }
    
}
