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
    
    typealias ItemSection = SectionModel<String, Item>
    
    var sections: [ItemSection] = [
        ItemSection(model: "Section", items: [])
    ]
    
    let reloadDataSource = RxTableViewSectionedReloadDataSource<ItemSection>()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    
        reloadDataSource.configureCell = {
            (dataSource, tableView, indexPath, item: Item) in
            let cell: UITableViewCell = tableView.dequeueReusableCellWithIdentifier("Cell") ??
                UITableViewCell(style: .Default, reuseIdentifier: "Cell")
            
            cell.textLabel?.text = "\(item.id) \(item.str)"
            cell.detailTextLabel?.text = "\(item.int)"

            return cell
        }
        
        ItemService.sharedInstance.itemsDriver
            .map({[unowned self]
                items -> [ItemSection] in
                self.sections[0].items = items
                return self.sections
            })
            .drive(tableView.rx_itemsWithDataSource(reloadDataSource))
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
                    context.setObject(Item.self, forKeyedSubscript: "Item")
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

