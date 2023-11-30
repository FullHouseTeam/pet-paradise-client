export interface Purchase {
  purchaseID: number,
  totalPrice: number,
  reportDate: string,
  obtainedTaxes: number,
  applicationTax: number,
  deliveryTime: number,
  localQuantity: number,
  productID: number,
  userID: number,
  isAvailable: string
}
