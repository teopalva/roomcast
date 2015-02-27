//
//  MenuViewController.swift
//  RoomCast_iPad
//
//  Created by Matteo Palvarini on 16/01/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit
import Foundation;
import Nutella

class MenuViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout, UIGestureRecognizerDelegate, NutellaDelegate {
    
    var channels = [Channel]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        /////////////////  SWIPE BACK + HIDE NAV CONTROLLER  /////////////////
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        self.navigationController?.interactivePopGestureRecognizer.enabled = true
        self.navigationController?.interactivePopGestureRecognizer.delegate = nil
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Do any additional setup after loading the view.
        
        // Fetch channels from back end
        
        // Fetch mapping form back end
        //var nutella = Nutella(host: "10.0.0.3", actorName: "iPad1", runId: "roomcast", clientId: nil)
        //nutella.net.subscribe("mapping/updated")
        //nutella.net.asyncRequest("mapping/requestMapping", message: "message", requestName: nil)
        
        let ch1 = Channel(name:"Channel1", iconName: "ch01", description: "The first channel", contentUrl: "http://apple.com")
        channels.append(ch1)
        let ch2 = Channel(name:"Channel2", iconName: "ch02", description: "The second channel", contentUrl: "http://google.com")
        channels.append(ch2)
        let ch3 = Channel(name:"Channel3", iconName: "ch03", description: "The third channel", contentUrl: "roomquake.seismometer://?param1=value")
        channels.append(ch3)
        let ch4 = Channel(name:"Channel4", iconName: "ch04", description: "The fourth channel", contentUrl: "http://matteopalvarini.com/viz/Project3/webapp/")
        channels.append(ch4)
        
        var i: Int
        for i in 5...30 {
            let ch = Channel(name:"Channel", iconName: "ch00", description: "Another channel", contentUrl: nil)
            channels.append(ch)
        }
        
        
    }
    
    func responseReceived(channelName: String, requestName: String?, response: AnyObject) {
        if(channelName=="mapping/requestMapping") {
            var mapping = response as String
            println("new mapping: " + mapping )
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: UICollectionViewDataSource
    
    override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 1
    }
    
    override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return channels.count
    }
    
    override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let ch = collectionView.dequeueReusableCellWithReuseIdentifier("ch", forIndexPath: indexPath) as ChannelCell
        
        // Set cell background color (transparent)
        ch.backgroundColor = nil
        
        // Load and display image
        let image1 = UIImage(named: channels[indexPath.item].iconName)
        ch.imageView.image = image1
        ch.imageView.setCornerRadius()
        
        // add action to clicked imageView
        //var recognizer = UITapGestureRecognizer(target:self, action:Selector("imageTapped:"))
        //recognizer.delegate = self
        //ch.addGestureRecognizer(recognizer)
        
        return ch
        
    }
    
    /* handles click on imageView
    func imageTapped(recognizer: UITapGestureRecognizer) {
    println("tap")
    self.performSegueWithIdentifier("webviewSegue", sender: self)
    }
    */
    
    /**
    * Handles tap on a channel. Shows either a web or native content.
    */
    override func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath) {
        
        var sender_ = self.collectionView!.cellForItemAtIndexPath(indexPath)
        var url: String? = self.channels[indexPath.item].contentUrl
        if let url = url {
            if (url.substringWithRange(Range<String.Index>(start: url.startIndex, end: advance(url.startIndex, 7))) == "http://") {
                self.performSegueWithIdentifier("webviewSegue", sender: sender_)
            } else {
                let customUrl: NSURL = NSURL(string:url)!
                if (UIApplication.sharedApplication().canOpenURL(customUrl)) {
                    UIApplication.sharedApplication().openURL(customUrl)
                } else {
                    println("Could not open " + url)
                }
            }
        } else {
            println("Empty Channel!")
        }
    }
    
    // MARK: UICollectionViewDelegate
    
    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(collectionView: UICollectionView, shouldHighlightItemAtIndexPath indexPath: NSIndexPath) -> Bool {
    return true
    }
    */
    
    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(collectionView: UICollectionView, shouldSelectItemAtIndexPath indexPath: NSIndexPath) -> Bool {
    return true
    }
    */
    
    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(collectionView: UICollectionView, shouldShowMenuForItemAtIndexPath indexPath: NSIndexPath) -> Bool {
    return false
    }
    
    override func collectionView(collectionView: UICollectionView, canPerformAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) -> Bool {
    return false
    }
    
    override func collectionView(collectionView: UICollectionView, performAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) {
    
    }
    */
    
    // MARK: UICollectionViewDelegateFlowLayout
    
    func collectionView(collectionView: UICollectionView!,
        layout collectionViewLayout: UICollectionViewLayout!,
        sizeForItemAtIndexPath indexPath: NSIndexPath!) -> CGSize {
            return CGSize(width: 100, height: 100)
    }
    
    private let sectionInsets = UIEdgeInsets(top: 50.0, left: 20.0, bottom: 50.0, right: 20.0)
    
    func collectionView(collectionView: UICollectionView!, layout collectionViewLayout: UICollectionViewLayout!, insetForSectionAtIndex section: Int) -> UIEdgeInsets {
        return sectionInsets
    }
    
    // MARK: - Navigation
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        println("called prepare:", sender)
        
        // Get the new view controller
        var nextVC = segue.destinationViewController as ChannelViewController
        
        // Pass the selected object to the new view controller
        let cell = sender as UICollectionViewCell
        let indexPath = self.collectionView!.indexPathForCell(cell)
        if let i = indexPath?.item{
            var url = channels[i].contentUrl
            nextVC.url = url
        }
        
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }
    
}

extension UIImageView {
    func setCornerRadius() {
        self.layer.masksToBounds = true
        self.layer.cornerRadius = CGRectGetWidth(self.frame)/20.0
    }
}
