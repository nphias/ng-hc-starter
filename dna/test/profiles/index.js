function setUsername(username) {
  return (caller) =>
    caller.call("profiles", "profiles", "set_username", {
      username,
    });
}

function getUsername(agentAddress) {
  return (caller) =>
    caller.call("profiles", "profiles", "get_username", {
      agent_address: agentAddress,
    });
}

function getAllAgents() {
  return (caller) => caller.call("profiles", "profiles", "get_all_agents", {});
}

function deleteUsername(username) {
  return (caller) => caller.call("profiles", "profiles", "delete_my_username", {"username":username})
}
module.exports = (scenario, conductorConfig) => {
    // Register a scenario, which is a function that gets a special API injected in
    // TATS: this first line is just a boiler plate then sa string you can just specify what scenario you are creating 
  scenario("set_username", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true);
    const set_username_result_alice　= await setUsername("aLiCeGiRl")(alice);
    const set_username_result_bob = await setUsername("bob")(bob);
    // TATS: check if all calls above returns Ok from rust
    await s.consistency();
    t.deepEqual(set_username_result_bob.Ok.username, "bob");
    t.deepEqual(set_username_result_alice.Ok.username, "aLiCeGiRl");
    console.log(set_username_result_alice)
    console.log(set_username_result_bob)
  })

  scenario("validate_set_username", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true);
    const set_username_result_alice = await setUsername("alice")(alice);
    await s.consistency();
    // committing a non-unique username
    const invalid_set_username_result_bob = await setUsername("alice")(bob);
    // committing the username entry for the second time for the same agent 
    const invalid_set_username_result_alice = await setUsername("alice1234")(alice);
    await s.consistency()
    const set_username_result_bob = await setUsername("bob")(bob);
    await s.consistency()
    t.ok(set_username_result_alice.Ok)
    t.deepEqual(invalid_set_username_result_alice.Err, {"Internal":"This agent already has a username"})
    t.deepEqual(invalid_set_username_result_bob.Err, {"Internal":"This username is already existing"})
    t.ok(set_username_result_bob.Ok)
  })

  scenario("get_usernames", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true);
    const aliceAddress = alice.instance("profiles").agentAddress;
    const bobAddress = bob.instance("profiles").agentAddress;
    const set_username_result_alice　= await setUsername("alice")(alice);
    await s.consistency()
    const invalid_set_username_result_alice = await setUsername("alice1")(alice);
    const invalid_set_username_result_bob = await setUsername("alice")(bob);
    await s.consistency()
    const set_username_result_bob　= await setUsername("bob")(bob);
    await s.consistency()
    const get_all_agents_result = await getAllAgents()(alice);
    const get_username_alice_result = await getUsername(aliceAddress)(alice);
    t.deepEqual(get_all_agents_result.Ok.length, 2);
    t.deepEqual(get_username_alice_result.Ok, "alice");
  })

  scenario("delete_username", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true);
    const aliceAddress = alice.instance("profiles").agentAddress;
    
    // create usernames for alice
    const set_username_result_alice　= await setUsername("alice")(alice);
    await s.consistency();

    // check that the username was created successfully
    t.deepEqual(set_username_result_alice.Ok.username, "alice");

    // delete alice's profile
    const delete_username_result_alice = await deleteUsername("alice")(alice);
    s.consistency();

    // test return value
    t.deepEqual(delete_username_result_alice.Ok, true);
    
    // test username deletion
    const get_username_result_alice = await getUsername(aliceAddress)(alice);
    t.deepEqual(get_username_result_alice.Ok, null);
  })
}
