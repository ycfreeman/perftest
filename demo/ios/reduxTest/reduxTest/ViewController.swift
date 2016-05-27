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
import RxCocoa
import RxSwift
import RxDataSources

class ViewController: UIViewController {

    let dispose = DisposeBag()
        
    @IBOutlet weak var tableView: UITableView!
    
    var sections: [JSItemSection] = [
        JSItemSection(header: "Section", items: [])
    ]
    
    let reloadDataSource = RxTableViewSectionedAnimatedDataSource<JSItemSection>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    
        reloadDataSource.configureCell = {
            (dataSource, tableView, indexPath, item: JSItem) in
            let cell: TableViewCell = tableView.dequeueReusableCellWithIdentifier("Cell") as? TableViewCell ??
                TableViewCell(style: .Default, reuseIdentifier: "Cell")
            
            // these can be wrapped in a bindView() method
            
            if let cellDetailLabel: UILabel = cell.detailTextLabel, dispose = cell.dispose {
                item.intOutlet.bindTo(cellDetailLabel.rx_text).addDisposableTo(dispose)
            }
            
            if let cellTitleLabel: UILabel = cell.textLabel, dispose = cell.dispose {
                item.strOutlet.bindTo(cellTitleLabel.rx_text).addDisposableTo(dispose)
            }

            return cell
        }
        
        ItemService.sharedInstance.itemsDriver
            .map({[unowned self]
                items -> [JSItemSection] in
                self.sections[0].items = items
                return self.sections
            })
            .drive(tableView.rx_itemsAnimatedWithDataSource(reloadDataSource))
            .addDisposableTo(dispose)

        
        
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)) {
            
            // load js file from bundle and evaluate
            // invoke from redux if changes occur
            // we can have rx stuff here in native environment
            // we also need an adaptor that converts js object to native object / view model
            // then we consume the native object / view model
            if let appJsData = NSDataAsset(name: "app"),
                script = String(data: appJsData.data, encoding: NSUTF8StringEncoding) {
                    
                    let jsApp: String = "var window = this; \(script)"
                    
                    // so we evaluate it
                    
                    let context = JSContext()
                    JSCoreBom.shared().extend(context)
                    context.exceptionHandler = { context, exception in
                        print("JS Error: \(exception)")
                    }
                    context.setObject(JSItem.self, forKeyedSubscript: "JSItem")
                    context.evaluateScript(jsApp)
                    context.evaluateScript("list.start()")
            }

        }
        
     
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

