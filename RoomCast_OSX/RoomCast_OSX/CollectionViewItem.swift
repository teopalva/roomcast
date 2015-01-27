//
//  CollectionViewItem.swift
//  RoomCast_OSX
//
//  Created by Matteo Palvarini on 25/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import Cocoa

class CollectionViewItem: NSCollectionViewItem {
    
    var url: String? = nil

    @IBAction func onClick(sender: AnyObject) {
        
        var app = NSApplication.sharedApplication().delegate

        var ch: Channel = self.representedObject as Channel
        if let url = ch.contentUrl {
            if let ad = app as? AppDelegate {
                ad.switchDelegate?.switchSubViews(webViewHasUrl: url)
            }
        }
        
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do view setup here.
    }
    
    
    /*
    // MARK: - Navigation
    
    override func prepareForSegue(segue: NSStoryboardSegue, sender: AnyObject?) {
        
        // Get the new view controller
        var nextVC = segue.destinationController as ChannelViewController
        
        // Pass the selected object to the new view controller
        //let cell = sender as NSImageView
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
*/
    
}
