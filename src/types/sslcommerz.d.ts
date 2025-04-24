/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'sslcommerz' {
  export class SslCommerzPayment {
    constructor(storeId: string, storePassword: string, isLive: boolean)
    init(data: any): Promise<any>
  }
}
