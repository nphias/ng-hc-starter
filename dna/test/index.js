/// NB: The tryorama config patterns are still not quite stabilized.
/// See the tryorama README [https://github.com/holochain/tryorama]
/// for a potentially more accurate example

//  for less verbose test output. use TRYORAMA_LOG_LEVEL=error hc test -s

const path = require("path");

const {
  Orchestrator,
  Config,
  combine,
  singleConductor,
  localOnly,
  tapeExecutor,
} = require("@holochain/tryorama");

process.on("unhandledRejection", (error) => {
  // Will print "unhandledRejection err is not defined"
  console.error("got unhandledRejection:", error);
});

const dnaPath = path.join(__dirname, "../dist/example-dna.dna.json");

const dna = Config.dna(dnaPath, "scaffold-test");
const conductorConfig = Config.gen(
  { profiles: dna },
  {
    network: {
      type: "sim2h",
      sim2h_url: "ws://localhost:9000",
    },
  }
);

const orchestrator = new Orchestrator({
  waiter: {
    softTimeout: 20000,
    hardTimeout: 30000,
  },
});

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

orchestrator.registerScenario("description of example test", async (s, t) => {
  const { alice, bob } = await s.players(
    { alice: conductorConfig, bob: conductorConfig },
    true
  );

  const aliceAddress = alice.instance("profiles").agentAddress;
  const bobAddress = bob.instance("profiles").agentAddress;

  let result = await getAllAgents()(alice);
  t.equal(result.Ok.length, 0);

  result = await setUsername("alice")(alice);
  t.ok(result.Ok);
  await s.consistency();

  result = await getAllAgents()(bob);
  t.equal(result.Ok.length, 1);

  result = await setUsername("bob")(bob);
  t.ok(result.Ok);
  await s.consistency();

  result = await getAllAgents()(alice);
  t.equal(result.Ok.length, 2);

  result = await getUsername(aliceAddress)(bob);
  t.equal(result.Ok, "alice");
});

require("./profiles")(orchestrator.registerScenario, conductorConfig);

orchestrator.run();