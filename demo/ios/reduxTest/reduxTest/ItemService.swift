import Foundation
import RxSwift
import RxCocoa
import RxDataSources

class ItemService {
    static let sharedInstance = ItemService()
    
    private var items = Variable<[Item]>([])
    
    private init() {}
    
    func setItems(items: [Item]) {
        self.items.value = items
    }
    
    var itemsDriver: Driver<[Item]> {
        return items.asDriver()
    }
}