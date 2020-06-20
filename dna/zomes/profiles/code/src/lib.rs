#![feature(proc_macro_hygiene)]
#![allow(dead_code)]
#![allow(unused_imports)]

use hdk::{
    entry_definition::ValidatingEntryType, error::ZomeApiResult,
    holochain_persistence_api::cas::content::Address,
};
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
pub mod profile;
use profile::Username;

// MAIN FILE FOR THE PROFILE ZOME
// contains calls to entry definitions and functions.

// Crate              Modules
// profile __________ mod
//            |______ handlers
//            |______ strings
//            |______ validation

#[zome]
mod profile_zome {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    // ENTRY DEFINITIONS
    #[entry_def]
    fn username_def() -> ValidatingEntryType {
        profile::username_definition()
    }

    #[entry_def]
    fn anchor_def() -> ValidatingEntryType {
        holochain_anchors::anchor_definition()
    }

    // ZOME CALLS
    #[zome_fn("hc_public")]
    fn set_username(username: String) -> ZomeApiResult<Username> {
        profile::handlers::set_username(username)
    }

    #[zome_fn("hc_public")]
    fn get_all_agents() -> ZomeApiResult<Vec<Username>> {
        profile::handlers::get_all_agents()
    }

    #[zome_fn("hc_public")]
    fn get_username(agent_address: Address) -> ZomeApiResult<Option<String>> {
        profile::handlers::get_username(agent_address)
    }

    #[zome_fn("hc_public")]
    fn get_my_address() -> ZomeApiResult<Address> {
        Ok(hdk::AGENT_ADDRESS.clone())
    }
/* 
    #[zome_fn("hc_public")]
    fn update_profile(profile: Profile) -> ZomeApiResult<bool> {
        profile::handlers::update_profile(profile)
    } */

    #[zome_fn("hc_public")]
    fn delete_my_username() -> ZomeApiResult<bool> {
        profile::handlers::delete_my_username()
    }
}
