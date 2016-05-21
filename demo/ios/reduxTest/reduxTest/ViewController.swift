//
//  ViewController.swift
//  reduxTest
//
//  Created by Freeman Man on 21/05/2016.
//  Copyright © 2016 LB OPERATIONS PTY LTD. All rights reserved.
//

import UIKit
import JavaScriptCore
import JSCoreBom

class ViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
        // load js file from bundle and evaluate
        // invoke from redux if changes occur
        // we can have rx stuff here in native environment 
        // we also need an adaptor that converts js object to native object / view model
        // then we consume the native object / view model
        
        if let appJsData = NSDataAsset(name: "app"), script = String(data: appJsData.data, encoding: NSUTF8StringEncoding) {
            
            let jsApp: String = "var window = this; \(script)"
            
            // so we evaluate it
            
            
            
            let context = JSContext()
            JSCoreBom.shared().extend(context)
            context.exceptionHandler = { context, exception in
                print("JS Error: \(exception)")
            }
            context.evaluateScript(jsApp)
            context.evaluateScript("list.start()")
            context.evaluateScript("setTimeout(function(){ console.log('Hi in 5 seconds!')},5000);")
        }

        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

