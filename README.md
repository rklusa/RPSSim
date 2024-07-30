# RPSsimulator
## inspired by the [TikTok](https://www.tiktok.com/@rockpaperscissorsbattle?lang=en) simulator
  A simple zero player simulation written in vanilla js, using the ruleset of Rock Paper Scissors to determine the winning team battle royal style.

# Entity Behaviour
* 1. Move away from the closest threat to ensure entities prioritize their saftey and avoid immediate threats.
  2. If a Threat is not in range for fleeing, Entities will prioritize attacking their closest target within their detection range.
  3. When no threats or tagets are found or are within range entities will wander randomly until a target or threat is found within range.
