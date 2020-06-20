#![allow(dead_code)]
#![allow(unused_imports)]

use serde_derive::{Deserialize, Serialize};
use holochain_json_derive::DefaultJson;
use hdk::{
    api::AGENT_ADDRESS,
    prelude::*,
};

pub mod handlers;
pub mod strings;
pub mod validation;
use validation::*;
use strings::*;
use holochain_entry_utils::HolochainEntry;
// MAIN MODULE UNDER THE PROFILE CRATE
// contains data structure definitions and implementations, and entry definitions

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
#[serde(rename_all = "snake_case")]
pub struct Username {
    pub agent_id: Option<Address>,
    pub username: String,
}
#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
#[serde(rename_all = "snake_case")]
pub struct BooleanReturn {
    pub value: bool,
}

// IMPLEMENTATIONS
impl HolochainEntry for Username {
    fn entry_type() -> String {
        String::from(USERNAME_ENTRY_NAME)
    }
}

impl Username {
    pub fn new(agent_address: Option<Address>, username: String) -> Self {
        Username {
            agent_id: agent_address,
            username
        }
    }
}

// DEFINITIONS
// Username
pub fn username_definition() -> ValidatingEntryType {
    entry!(
        name: Username::entry_type(),
        description: "this is the username of the agent",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<Username>| {
            match validation_data
            {
                hdk::EntryValidationData::Delete{old_entry, old_entry_header, validation_data} =>
                {
                   validation::validate_delete_username(old_entry, old_entry_header, validation_data)
                },
                // need validation for update
                _ => Ok(()),
            }
        },
        links: [
            from!(
                holochain_anchors::ANCHOR_TYPE,
                link_type: USERNAME_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                link_type: AGENT_USERNAME_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            )
        ]
    )
}