//: Playground - noun: a place where people can play

import UIKit
import JavaScriptCore
import JSCoreBom

var str = "Hello, playground"



let jsData = NSData(contentsOfFile: NSBundle.mainBundle().pathForResource("app", ofType: "js") ?? "")!
var appJs: String = String(data: jsData, encoding: NSUTF8StringEncoding) ?? ""

appJs = "var window = this; \(appJs)"

let virtualMachine = JSVirtualMachine()

let context = JSContext(virtualMachine: virtualMachine)

context.exceptionHandler = { context, exception in
    print("JS Error: \(exception)")
}

JSCoreBom.shared().extend(context)

context.setObject(Item.self, forKeyedSubscript: "Item")

context.evaluateScript(appJs)

context.evaluateScript("list.start()")

context.evaluateScript("setTimeout(function(){ console.log('Hi in 5 seconds!')},5000);")
