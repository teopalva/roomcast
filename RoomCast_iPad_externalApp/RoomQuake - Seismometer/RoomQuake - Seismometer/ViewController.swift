//
//  ViewController.swift
//  RoomQuake - Seismometer
//
//  Created by Matteo Palvarini on 21/02/15.
//  Copyright (c) 2015 Matteo Palvarini. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var appTitleLabel: UILabel!
    
    @IBAction func backToMenuAction(sender: AnyObject) {
        
        let customUrl: NSURL = NSURL(string: "roomcast.app://")!
        if (UIApplication.sharedApplication().canOpenURL(customUrl)) {
            UIApplication.sharedApplication().openURL(customUrl)
        } else {
            println("Could not open RoomCast")
        }
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let nsObject: AnyObject? = NSBundle.mainBundle().infoDictionary!["CFBundleName"]
        
        appTitleLabel.text = nsObject as String?
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // Hide the status bar
    override func prefersStatusBarHidden() -> Bool {
        return true;
    }


}

