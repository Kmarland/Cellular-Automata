# Cellular Automata Simulator

This project is a simple **React**-based simulator for exploring different types of **cellular automata**.

## Features

- 🖱️ **Interactive Canvas**: Click on cells to toggle them on or off.
- ▶️ **Pause / Unpause Simulation**: 
  - Press the **Pause** button to start the simulation.
  - Press it again to pause and stop generations from advancing.
- ⏭️ **Cycle Automata Rules**: 
  - Press the **Next** button to cycle through different cellular automaton types:
    1. **Conway's Game of Life**
    2. **Brian's Brain**
    3. **Seeds**
- 🔄 **Reset**: Refreshing the page resets the canvas to a blank state.

## How to Use

1. **Load the page** — a black canvas will appear with two buttons below it: **Pause** and **Next**.
2. **Click on the canvas** to turn cells on or off.
3. **Click Pause** to start the simulation and watch the automaton evolve through generations.
4. **Click Pause again** to stop the simulation at any time.
5. **Click Next** to switch between the three available types of cellular automata.
6. **Refresh** the page to clear the grid and start over.

## Cellular Automata Types

| Automaton | Description |
|:--|:--|
| **Conway's Game of Life** | Classic simulation where cells live, die, or are born based on neighbor counts. |
| **Brian's Brain** | Cells cycle through three states: on, dying, and off. |
| **Seeds** | A minimalist rule where only dead cells can be born. |
