import Foundation
import JavaScriptCore
import RxSwift
import RxDataSources
// copy code from http://nshipster.com/javascriptcore/

// Custom protocol must be declared with `@objc`
@objc protocol JSItemJSExports : JSExport {
    var id: NSNumber { get set }
    var str: String { get set }
    var int: NSNumber { get set }
    // we can export internal values to JS like this
//    var hashValue: Int { get }
    
    static func createWithId(id: NSNumber, str: String, int: NSNumber) -> JSItem
    
    // static emit function (shouldn't be here)
    static func emitItems(items: [JSItem])
}

// Custom class must inherit from `NSObject`
@objc public class JSItem : NSObject, JSItemJSExports, IdentifiableType {
    // properties must be declared as `dynamic`
    dynamic var id: NSNumber
    dynamic var str: String {
        didSet {
            strObservable.value = str
        }
    }
    dynamic var int: NSNumber {
        didSet {
            intObservable.value = int.integerValue
        }
    }
    
    private var strObservable: Variable<String>
    private var intObservable: Variable<Int>
    
    
    var intOutlet: Observable<String> {
        return intObservable.asObservable().map({ number -> String in
            return "\(number)"
        })
    }
    
    var strOutlet: Observable<String> {
        return strObservable.asObservable()
    }
    
    init(id: NSNumber, str: String, int: NSNumber) {
        self.id = id
        self.str = str
        self.int = int
        self.intObservable = Variable(self.int.integerValue)
        self.strObservable = Variable(self.str)
    }
    
    public class func createWithId(id: NSNumber, str: String, int: NSNumber) -> JSItem {
        return JSItem(id: id, str: str, int: int)
    }
    
    public class func emitItems(items: [JSItem]) {
        ItemService.sharedInstance.setItems(items)
        
        guard items.count > 0 else {
            return
        }

    }
    
    public typealias Identity = Int
    public var identity: Int {
        return hashValue
    }
    
    public override func isEqual(object: AnyObject?) -> Bool {
        guard let other = object as? JSItem else{
            return false
        }
        return other.str == self.str &&
            other.int.integerValue == self.int.integerValue
    }

}


func == (lhs: JSItem, rhs: JSItem) -> Bool {
    return lhs.isEqual(rhs)
}


struct JSItemSection: AnimatableSectionModelType {
    typealias Item = JSItem
    typealias Identity = String
    
    var header: String
    var items: [JSItem]
    
    init(header: String, items: [JSItem]){
        self.header = header
        self.items = items
    }
    
    init(original: JSItemSection, items: [JSItem]) {
        self = original
        self.items = items
    }
    
    var identity: String {
        return header
    }
    
}
