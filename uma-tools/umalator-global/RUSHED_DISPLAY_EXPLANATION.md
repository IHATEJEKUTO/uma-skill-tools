# Rushed Status Display Across 500 Simulations

## How Rushed is Determined

When you run a comparison with 500 samples, the rushed state is **probabilistic** - each simulation has its own random chance of entering the rushed state based on the horse's wisdom stat.

## What Each Run Type Shows

The UI displays 4 different run types, and each shows **its own actual rushed state** from that specific simulation:

### Min Run (Fastest Time)
- Shows the rushed state that occurred in the **fastest** of the 500 simulations
- Often has **no rushed state** or rushed at a favorable position
- This is the "best case scenario" - everything went right

### Max Run (Slowest Time)  
- Shows the rushed state that occurred in the **slowest** of the 500 simulations
- Often has rushed at an **unfavorable position** or for longer duration
- This is the "worst case scenario" - things went poorly

### Mean Run (Average)
- Shows the rushed state from the simulation **closest to the average time**
- This is a **realistic, typical** outcome you might expect
- Represents what happens in a "normal" run

### Median Run (Middle Value)
- Shows the rushed state from the simulation at the **median time** (50th percentile)
- Similar to mean, but less affected by outliers
- Another good representation of a **typical** outcome

## Understanding the Results

- **No rushed indicator**: That specific run didn't trigger the rushed state
- **Blue "Rushed" indicator (Uma 1)**: Uma 1 entered rushed state at that track position
- **Red "Rushed" indicator (Uma 2)**: Uma 2 entered rushed state at that track position
- **Different rushed positions**: Each run can have different rushed timing because it's based on random chance

## Which Run Should You Focus On?

- **For best possible time**: Look at Min Run
- **For realistic expectations**: Look at Mean or Median Run  
- **For worst case planning**: Look at Max Run
- **For understanding the mechanic**: Compare all 4 runs to see the variation

## Toggling Rushed

You can disable rushed for either horse using the checkboxes:
- **Allow Rushed (Uma 1)**: Toggle blue checkbox
- **Allow Rushed (Uma 2)**: Toggle red checkbox

When disabled, that horse will **never** enter the rushed state in any simulation, letting you see the baseline performance without this mechanic.

