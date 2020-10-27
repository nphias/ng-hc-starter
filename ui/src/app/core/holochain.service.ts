import { Injectable } from "@angular/core";
import { environment } from '@environment';
//import { PubSub } from 'graphql-subscriptions'
import { AppWebsocket, CellId } from '@holochain/conductor-api'

@Injectable({
  providedIn: "root"
})
export class HolochainService {
  hcConnection: AppWebsocket
  cellId: CellId
  //pubsub: PubSub = new PubSub()

  async init(){
        //this.pubsub.subscribe('username-set',()=>{console.log("hello")})
        try{
            this.hcConnection = await AppWebsocket.connect(environment.HOST_URL)//.ready()//.then((result)=>{
              const appInfo = await this.hcConnection.appInfo({ app_id: environment.APP_ID });
              this.cellId = appInfo.cell_data[0][0];
        }catch(error){
            console.error("Holochain connection failed:")
            throw(error)
        }
    }

    call(zome:string, fnName:string, args:{}){
      //try{
        return this.hcConnection.callZome({
          cap: null as any,
          cell_id: this.cellId,
          zome_name: zome,
          fn_name: fnName,
          payload: args,
          provenance: this.cellId[1],
        })
      //}catch(ex){
      //  console.log(ex)
      //}
    }

    subscribe(event:string){
    //  return this.pubsub.asyncIterator(event)
    }

}
