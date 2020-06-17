import { Injectable } from "@angular/core";
//import { MicroOrchestrator, i18nextBaseModule } from '@uprtcl/micro-orchestrator';
import { HolochainConnection } from '@uprtcl/holochain-provider';
import { HOST_URL } from '../config';
//import { ProfilesModule } from 'holochain-profiles';

@Injectable({
  providedIn: "root"
})
export class HolochainService {
  hcConnection: HolochainConnection

  constructor( ) {
    //this.init()
  }

  async init(){
    //this.connection = await connect({ url: HOST_URL });
   this.hcConnection = new HolochainConnection({
      host: HOST_URL
    })
    await this.hcConnection.ready() //this is a promise.. we need an observable to show process
    console.log("we are ready")
  }


}
