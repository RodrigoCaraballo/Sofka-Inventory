import {
  RegisterProductInventoryStockData,
  RegisterSalesData,
  RegisterUserData,
} from '@Domain';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RegisterProductData } from '../../../../domain/interfaces/event-data/register-product.data';
import { RegisterReturnSaleData } from '../../../../domain/interfaces/event-data/register-return-sale.data';

@WebSocketGateway(3004, {
  cors: { origin: '*' },
})
export class BranchGateway {
  @WebSocketServer() server: Server;

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_REGISTERED',
    queue: 'WS_PRODUCT_REGISTERED',
  })
  registerProduct(payload: string) {
    const product: RegisterProductData = JSON.parse(payload);
    try {
      this.server.emit(`new_product_${product.branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_RESELLER_SALE_REGISTERED',
    queue: 'WS_PRODUCT_RESELLER_SALE_REGISTERED',
  })
  registerResellerSale(payload: string) {
    const sales: RegisterSalesData[] = JSON.parse(payload);
    try {
      this.server.emit(`new_sale_${sales[0].branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_INVENTORY_STOCK_REGISTERED',
    queue: 'WS_PRODUCT_INVENTORY_STOCK_REGISTERED',
  })
  registerProductInventoryStock(payload: string) {
    const productChanged: RegisterProductInventoryStockData =
      JSON.parse(payload);
    try {
      this.server.emit(`new_inventory_${productChanged.branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED',
    queue: 'WS_PRODUCT_FINAL_CUSTOMER_SALE_REGISTERED',
  })
  registerFinalCustomerSale(payload: string) {
    const sales: RegisterSalesData[] = JSON.parse(payload);
    try {
      this.server.emit(`new_sale_${sales[0].branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'PRODUCT_UPDATED',
    queue: 'WS_PRODUCT_UPDATED',
  })
  registerProductUpdate(payload: string) {
    const productChanged: RegisterProductData = JSON.parse(payload);
    try {
      this.server.emit(`product_update_${productChanged.branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'USER_REGISTERED',
    queue: 'WS_USER_REGISTERED',
  })
  registerUser(payload: string) {
    const userRegistered: RegisterUserData = JSON.parse(payload);
    try {
      this.server.emit(`user_registered_${userRegistered.branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'RETURN_SALE_REGISTERED',
    queue: 'WS_RETURN_SALE_REGISTERED',
  })
  registerReturnSale(payload: string) {
    const saleRemoved: RegisterReturnSaleData = JSON.parse(payload);
    try {
      this.server.emit(`return_sale_${saleRemoved.branchId}`, payload);
      console.log('Evento emitido correctamente');
    } catch (error) {
      console.error('Error al emitir el evento:', error);
    }
  }
}
