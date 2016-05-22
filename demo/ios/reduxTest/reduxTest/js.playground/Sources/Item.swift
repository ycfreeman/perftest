import Foundation
import JavaScriptCore
// copy code from http://nshipster.com/javascriptcore/

// Custom protocol must be declared with `@objc`
@objc protocol ItemJSExports : JSExport {
    var id: NSNumber { get set }
    var str: String { get set }
    var int: NSNumber { get set }
    
    static func createWithId(id: NSNumber, str: String, int: NSNumber) -> Item
    
    // static emit function (shouldn't be here)
    static func emitItems(items: [Item])
}

// Custom class must inherit from `NSObject`
@objc public class Item : NSObject, ItemJSExports {
    // properties must be declared as `dynamic`
    dynamic var id: NSNumber
    dynamic var str: String
    dynamic var int: NSNumber
    
    init(id: NSNumber, str: String, int: NSNumber) {
        self.id = id
        self.str = str
        self.int = int
    }
    
    public class func createWithId(id: NSNumber, str: String, int: NSNumber) -> Item {
        return Item(id: id, str: str, int: int)
    }
    
    public class func emitItems(items: [Item]) {
        ItemService.sharedInstance.items = items
        guard items.count > 0 else {
            return
        }
        let item = items[0]
        print("\(item.str): \(item.int)")
    }
}
