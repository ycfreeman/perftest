import Foundation

class ItemService {
    private init() {}
    
    static let sharedInstance = ItemService()
    
    var items: [Item] = []
}