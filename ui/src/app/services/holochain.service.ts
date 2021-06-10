import { Injectable } from "@angular/core";
import { environment } from '@environment';
import { AppSignalCb, AppWebsocket, CellId  } from '@holochain/conductor-api'
import { ProfilesStore } from "../stores/profiles.store";
import { serializeHash } from "../helpers/utils";

export enum ConnectionState{
  OPEN,
  CLOSED,
  CLOSING,
  CONNECTING
}

@Injectable({
  providedIn: "root"
})
export class HolochainService {
  protected hcConnection!: AppWebsocket //tsconfig: "allowSyntheticDefaultImports": true,
  protected cellId!: CellId //= [Buffer.from("g","utf8"),Buffer.from("g","utf8")]     //tsconfig: "allowSyntheticDefaultImports": true,
  protected signal! : AppSignalCb

 constructor(
   private pstore: ProfilesStore){}


    async init(){ //called by the appModule at startup
        if (!environment.mock){
          try{
            console.log("Connecting to holochain")
              await AppWebsocket.connect(environment.HOST_URL,1200,
                signal => {
                  const payload = signal.data.payload;
                  //if (payload.OfferReceived) {
                    //this.tstore.storeOffer(payload.OfferReceived);
                })
                .then(async (connection)=>{
                this.hcConnection = connection
                const appInfo = await connection.appInfo({ installed_app_id: environment.APP_ID});
                this.cellId = appInfo.cell_data[0].cell_id;
                this.pstore.myAgentPubKey = serializeHash(this.cellId[1])
                console.log("Connected to holochain",appInfo.cell_data)
              })
          }catch(error){
              console.error("Holochain connection failed:")
              throw(error)
          }
        } else {
          this.pstore.myAgentPubKey = "DEFAULT_KEY"
          console.log("you are in Mock mode.. no connections made!")
        }
    }

     call(zome:string, fnName:string, args:{}|null){
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

    getConnectionState(){
      return ConnectionState[this.hcConnection.client.socket.readyState]
    }

}
