import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Product } from './product.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {

  listenTo(): any {
    return Product;
  }

  afterUpdate(event: UpdateEvent<Product>): Promise<any> | void {
    const priceGotUpdated = event.updatedColumns.find(value => value.propertyName, Product.prototype.price);
    if (priceGotUpdated) {
      if (Number(event.databaseEntity.price) !== event.entity.price) {
        Logger.log(`Price changed from ${ event.databaseEntity.price } to ${ event.entity.price }`, 'Product Price Updated', false);
      }
    }
  }
}
