import { Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import { ProfilesStore } from "src/app/stores/profiles.store";
import { Profile, ProfilesService } from "src/app/services/profiles.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  errorMessage:string = ""
  public agentData!: Profile
  private agentKey!: string

  constructor( 
    public p_store: ProfilesStore,
    private profilesService: ProfilesService,
    private aroute: ActivatedRoute,
    private router: Router,

   ) { 
  }

  async ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
        this.router.navigate(["signup"]);
   try {
      const key = this.aroute.snapshot.paramMap.get('id');
      key ? this.agentKey = key : this.agentKey = this.p_store.myAgentPubKey 
        await this.profilesService.loadAgentProfile(this.agentKey)
    } catch(exception){
        console.log(exception)
        this.errorMessage = "type:"+exception.data.type+" "+exception.data.data
        console.log(exception)
    }
  }

  setAgent(){
    this.agentData = this.p_store.profileOf(this.agentKey)
  }

}
