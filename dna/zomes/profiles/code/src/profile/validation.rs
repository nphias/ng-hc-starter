use hdk::{
    holochain_core_types::{
        chain_header::ChainHeader,
    },
    api::AGENT_ADDRESS,
};
use crate::profile::{
  Username
};

pub fn validate_delete_username(old_entry: Username, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_entry_delete_old_entry: {:?}", old_entry)).ok();
    hdk::debug(format!("validate_entry_delete_old_entry_header: {:?}", old_entry_header)).ok();
    hdk::debug(format!("validate_entry_delete_validation_data: {:?}", validation_data)).ok();
    if let (Some(o), Some(p)) = (old_entry_header.provenances().get(0), validation_data.package.chain_header.provenances().get(0)) {
        if o.source() == p.source() {
          Ok(())
        } else {
            Err("Agent who did not author is trying to delete".to_string())
        }
    } else {
        Err("No provenance on this validation_data".to_string())
    }
}

