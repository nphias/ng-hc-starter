import { Injectable } from "@angular/core";
import { ApolloClientModule } from '@uprtcl/graphql';
import { MicroOrchestrator, i18nextBaseModule } from '@uprtcl/micro-orchestrator';
import { HolochainConnectionModule, HolochainConnection } from '@uprtcl/holochain-provider';
//import { ProfilesModule } from 'holochain-profiles';
import {connect} from '@holochain/hc-web-client'

@Injectable({
  providedIn: "root"
})
export class HolochainService {
  hcConnection: HolochainConnection
  connection: any

  constructor( ) {
    //this.init()
  }

  async init(){
    //this.connection = await connect({ url: HOST_URL });
   this.hcConnection = new HolochainConnection({
      host: 'ws://localhost:8888'
    })
    await this.hcConnection.ready()
    console.log("we are ready")
    //, { retries: 3, retryInterval: 3000});
    /*const hcModule = new HolochainConnectionModule(this.hcConnection);
    const orchestrator = new MicroOrchestrator();
    await orchestrator.loadModules([
      hcModule,
      new i18nextBaseModule(),
      new ApolloClientModule(),
      new ProfilesModule('lobby-instance')]);
      this.apolloClient = orchestrator.container.get(ApolloClientModule.bindings.Client)*/
  }
  

  makeRequest (params: object, functionName: string):Promise<any>{
   return this.hcConnection.ready().then(()=>{
      this.hcConnection.call("my_instance","myzome",functionName,params)
    })
  }
  






  /*private makeBody = (functionName, params) => {
    const body = {
      id: "0",
      jsonrpc: "2.0",
      method: "call",
      params: {
        instance_id: "_instance",
        zome: "nge",
        function: functionName,
        params: params
      }
    };
    return body;
  };

  makeReq = (params: object, functionName: string) => {
    let requestBody: object = this.makeBody(functionName, params);
    return this.http.post<Result>("http://127.0.0.1:8889", requestBody);
  };*/


}
