#### Context

Add any background information that a reviewer will need to understand the changes made and reasoning behind them.

#### Changes

Details about the changes you've made, ideally as a bulleted list.

#### Considerations

Add any details about why you've made the decisions you have in the course of writing this PR. You can include alternatives you considered or tried and any drawbacks to the approach you ended up choosing.

#### Release type

- [ ] Patch
- [ ] Minor
- [ ] Major

#### Peer review

- [ ] The feature/changes have been peer reviewed
- [ ] Automated test coverage and correctness have been peer reviewed
- [ ] The test plan has been peer reviewed

#### Test flows

Write test plan steps that specifically exercises the feature or change.

- [ ] Browser click-through flows
- [ ] Command console test flows
- [ ] Endpoint performance tests e.g. Run a load test on the end point of up to 500 requests per minute
- [ ] Mobile Native SDK integration test flows
- [ ] Mobile device click-through flows

#### Success Criteria

Add any measureable conditions of success for the above flows

- [ ] e.g. > 99% of requests complete within < 1 second response time

#### Manager Sign-off (for major launches)

- [ ] <Name Approver> approves test plan is complete and sanity checked

#### Partner Collaboration (for major launches)

If collaborating a launch with a major partner

- [ ] Partner tests completed with acceptable results
- [ ] Partner approves launch

#### Pre Deploy plan (for major launches)

- [ ] For large releases: Auto-scaling warming?

#### Post Launch plan

- [ ] Re-run test flows in production
- [ ] Monitor instances, traffic and response times
- [ ] No remarkable indicators of degradation
- [ ] # No errors reported by Airbrake
