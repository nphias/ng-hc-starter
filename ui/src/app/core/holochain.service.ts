import { Injectable } from "@angular/core";
import { HolochainConnection } from '@uprtcl/holochain-provider';
import { environment } from '@environment';
import { PubSub } from 'graphql-subscriptions'

@Injectable({
  providedIn: "root"
})
export class HolochainService {
  hcConnection: HolochainConnection
  pubsub: PubSub = new PubSub()

  async init(){
    this.hcConnection = new HolochainConnection({
        host: environment.HOST_URL
        })
        this.pubsub.subscribe('username-set',()=>{console.log("hello")})
        try{
            await this.hcConnection.ready()//.then((result)=>{
              this.hcConnection.onSignal('username-set', ( user_address ) => {
                this.pubsub.publish('username-set', user_address.user_address);
                console.log("signal callback:",user_address)
              })
        }catch(error){
            console.log("Holochain connection failed:"+error)
        }
    }

    call(instance:string, zome:string, fnName:string, args:{}){
      return this.hcConnection.call(instance,zome,fnName,args)
    }

    subscribe(event:string){
      return this.pubsub.asyncIterator(event)
    }

}
