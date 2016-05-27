import Foundation
import RxSwift
import RxCocoa
import RxDataSources

class ItemService {
    static let sharedInstance = ItemService()
    
    private var items = Variable<[JSItem]>([])
    
    private init() {}
    
    func setItems(items: [JSItem]) {
        self.items.value = items
    }
    
    var itemsDriver: Driver<[JSItem]> {
        return items.asDriver()
    }
}