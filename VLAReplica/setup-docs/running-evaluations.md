# Running evaluations

[Back to project page](../../index.html)

## Evaluation script

Use the evaluation script `benchmark.py` to run a policy across predefined ID or OOD tasks, with predefined reference images. Refer to the table below for all CLI flags.

Currently, the script supports the following models: `{act,smolvla,dit,xvla,pi0,pi05}`. Support for other VLA models will arrive soon. Feel free to modify the script to implement other VLA models of your liking.

Inside your virtual environment, run:
```
python benchmark.py \
  --policy-type pi0 \
  --policy-path lerobot/pi0_base \
  --policy-from-hub \
  --run-all-tasks \
  --task-subset ID \
  --iterations 5 \
  --eval-follower-calib-dirs calibration/robots/so101_follower \
  --eval-follower-ports /dev/ttyACM1 \
  --eval-follower-ids so101_follower_arm \
  --eval-top-indexes 4 \
  --eval-wrist-indexes 14 \
  --reset-mode fixed \
  --reset-action-file arm_reset.json
```

| Flag | Description |
| :--- | :--- |
| `--policy-type <model>` | Selects the policy family to evaluate. Currently supported models: `{act,smolvla,dit,xvla,pi0,pi05}` |
| `--policy-path <path>` | Hugging Face repo ID or local path for the policy checkpoint. |
| `--policy-from-hub` | If `--policy-path` directs to a Hugging Face repo ID, include this flag. Loads policy from Hugging Face Hub instead of local directory. |
| `--run-all-tasks` | Runs evaluation across all 10 VLA-REPLICA tasks from task config, instead of single task. |
| `--task-subset <ID or OOD>` | When using `--run-all-tasks`, restricts evaluation to ID or OOD task subset. |
| `--iterations <number>` | Number of evaluation iterations per task (we used 5 in the paper). |
| `--eval-follower-calib-dirs <path>` | Follower calibration directory. (default: `calibration/robots/so101_follower`). |
| `--eval-follower-ports <serial port>` | Serial port for the follower robot (e.g. `dev/ttyACM1`) |
| `--eval-follower-ids <id>` | Robot ID for the follower arm. (default: `so101_follower_arm`) |
| `--eval-top-indexes <index>` | Top-camera index for the active arm. |
| `--eval-wrist-indexes <index>` | Wrist-camera index for the active arm. |
| `--reset-mode fixed` | Uses a fixed reset action instead of teleoperated leader reset (we enabled this for the paper). |
| `--reset-action-file <path>` | JSON file containing the normalized reset action vector required when `--reset-mode fixed` is used. (default: `arm_reset.json`) |

## Evaluation process

1. After the script loads the corresponding policy and connects successfully to the followers, the follower arm will move to a consistent start position (predetermined in `arm_reset.json`). An openCV GUI will pop up, overlaying the live video feed from the top camera with the proper test scene (i.e. predefined object placements) for that task. 

2. Grab the corresponding objects needed for that scene (i.e. red plate and bread A for the first task) and then move the objects to their reference image positions so that the live camera and overlay image are identical to each other. 

3. When the live video feed and overlay image match almost exactly, press `Enter` on the keyboard to start policy inference.
    * During policy evaluations for the VLA-REPLICA paper, each policy is given 90 seconds to complete the task before the iteration ends.
    * If the policy completes the task before 90 seconds, press `right arrow (➜)` to skip to the setup phase of the next iteration. The SO-101 arm will reset back to the start position.
4. Log success and/or failure behavior for each iteration corresponding to that specific task. The full list of tasks and criteron are listed below.

## ID versus OOD evaluation

- ID tasks use scene layouts close to the training distribution to see how well the model learns.
    - There are 10 ID tasks total, with 5 variants each, for a total of __50 ID iterations__.
- OOD tasks test new colors, counts, or objects to test how well the model generalizes generalization.
    - There are 8 ID tasks total, with 5 variants each, for a total of __40 ID iterations__.

## Full List of Tasks & Success Criterion
<table>
  <table style="width: 80%; margin: left;">
  <thead>
    <tr>
      <th style="width: 5%; text-align: left;">ID#</th>
      <th style="width: 7%; text-align: left;">Level</th>
      <th style="width: 30%; text-align: left;">Task Variant</th>
      <th style="width: 7%; text-align: left;">Dist.</th>
      <th style="width:30%; text-align: left;">Success Criterion</th>
    </tr>
  </thead>
  <tbody>
    <!-- Task 1 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 1: Put Bread on Plate</b></td></tr>
    <tr><td>1</td><td>Easy</td><td>Put A bread on the red plate</td><td>ID</td><td rowspan="10">Bread is resting on the correct colored plate, and SO-101 moved back to its home position.</td></tr>
    <tr><td>2</td><td>Easy</td><td>Put B bread on the blue plate</td><td>ID</td></tr>
    <tr><td>3</td><td>Medium</td><td>Put A bread on the blue plate</td><td>ID</td></tr>
    <tr><td>4</td><td>Medium</td><td>Put B bread on the red plate (1 distractor)</td><td>ID</td></tr>
    <tr><td>5</td><td>Hard</td><td>Put A bread on the red plate (2 distractors)</td><td>ID</td></tr>
    <tr><td>6</td><td>Easy</td><td>Put C bread on the red plate</td><td>OOD</td></tr>
    <tr><td>7</td><td>Easy</td><td>Put C bread on the blue plate</td><td>OOD</td></tr>
    <tr><td>8</td><td>Medium</td><td>Put A bread on the yellow plate</td><td>OOD</td></tr>
    <tr><td>9</td><td>Medium</td><td>Put B bread on the yellow plate</td><td>OOD</td></tr>
    <tr><td>10</td><td>Hard</td><td>Put C bread on the yellow plate</td><td>OOD</td></tr>

    <!-- Task 2 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 2: Put Bowl on Coaster</b></td></tr>
    <tr><td>11</td><td>Easy</td><td>Put red bowl on green coaster</td><td>ID</td><td rowspan="10">Correct bowl is touching/resting on correct colored coaster, and SO-101 moved back to its home position.</td></tr>
    <tr><td>12</td><td>Easy</td><td>Put blue bowl on orange coaster</td><td>ID</td></tr>
    <tr><td>13</td><td>Medium</td><td>Put blue bowl on green coaster</td><td>ID</td></tr>
    <tr><td>14</td><td>Medium</td><td>Put red bowl on purple coaster (1 distractor)</td><td>ID</td></tr>
    <tr><td>15</td><td>Hard</td><td>Put yellow bowl on purple coaster (2 distractors)</td><td>ID</td></tr>
    <tr><td>16</td><td>Easy</td><td>Put blue bowl on purple coaster</td><td>OOD</td></tr>
    <tr><td>17</td><td>Easy</td><td>Put red bowl on orange coaster</td><td>OOD</td></tr>
    <tr><td>18</td><td>Medium</td><td>Put yellow bowl on green coaster</td><td>OOD</td></tr>
    <tr><td>19</td><td>Medium</td><td>Put yellow bowl on orange coaster</td><td>OOD</td></tr>
    <tr><td>20</td><td>Hard</td><td>Put green bowl on yellow coaster</td><td>OOD</td></tr>

    <!-- Task 3 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 3: Stack Blocks</b></td></tr>
    <tr><td>21</td><td>Easy</td><td>Stack red block on blue block</td><td>ID</td><td rowspan="10">Correctly colored top block has touched/rested on correctly colored bottom block for more than 2 seconds.</td></tr>
    <tr><td>22</td><td>Easy</td><td>Stack yellow block on blue block</td><td>ID</td></tr>
    <tr><td>23</td><td>Medium</td><td>Stack blue block on yellow block</td><td>ID</td></tr>
    <tr><td>24</td><td>Medium</td><td>Stack blue block on red block (1 distractor)</td><td>ID</td></tr>
    <tr><td>25</td><td>Hard</td><td>Stack red block on yellow block (2 distractors)</td><td>ID</td></tr>
    <tr><td>26</td><td>Easy</td><td>Stack yellow block on red block</td><td>OOD</td></tr>
    <tr><td>27</td><td>Easy</td><td>Stack blue block on blue block</td><td>OOD</td></tr>
    <tr><td>28</td><td>Medium</td><td>Stack red block on green block</td><td>OOD</td></tr>
    <tr><td>29</td><td>Medium</td><td>Stack green block on yellow block</td><td>OOD</td></tr>
    <tr><td>30</td><td>Hard</td><td>Stack green block on green block</td><td>OOD</td></tr>

    <!-- Task 4 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 4: Fold Towel</b></td></tr>
    <tr><td>31</td><td>Easy</td><td>Fold pink towel in half</td><td>ID</td><td rowspan="10">Correctly colored towel's edges are lifted and folded on itself by more than 50%, and SO-101 moved back to its home position.</td></tr>
    <tr><td>32</td><td>Easy</td><td>Fold yellow towel in half</td><td>ID</td></tr>
    <tr><td>33</td><td>Medium</td><td>Fold pink towel in half (1 distractor)</td><td>ID</td></tr>
    <tr><td>34</td><td>Medium</td><td>Fold yellow towel in half (1 distractor)</td><td>ID</td></tr>
    <tr><td>35</td><td>Hard</td><td>Fold pink towel in half (2 distractors)</td><td>ID</td></tr>
    <tr><td>36</td><td>Easy</td><td>Fold blue towel in half</td><td>OOD</td></tr>
    <tr><td>37</td><td>Easy</td><td>Fold blue towel in half</td><td>OOD</td></tr>
    <tr><td>38</td><td>Medium</td><td>Fold blue towel in half (1 distractor)</td><td>OOD</td></tr>
    <tr><td>39</td><td>Medium</td><td>Fold blue towel in half (2 distractors)</td><td>OOD</td></tr>
    <tr><td>40</td><td>Hard</td><td>Fold blue towel in half (2 distractors)</td><td>OOD</td></tr>

    <!-- Task 5 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 5: Open Oven (No OOD Variants)</b></td></tr>
    <tr><td>41</td><td>Easy</td><td>Open the oven</td><td>ID</td><td rowspan="5">Oven door opened for 2+ seconds, and SO-101 moved back to its home position.</td></tr>
    <tr><td>42</td><td>Easy</td><td>Open the oven</td><td>ID</td></tr>
    <tr><td>43</td><td>Medium</td><td>Open the oven (1 distractor)</td><td>ID</td></tr>
    <tr><td>44</td><td>Medium</td><td>Open the oven (2 distractors)</td><td>ID</td></tr>
    <tr><td>45</td><td>Hard</td><td>Open the oven (2 distractors)</td><td>ID</td></tr>

    <!-- Task 6 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 6: Clean Whiteboard (No OOD Variants)</b></td></tr>
    <tr><td>46</td><td>Easy</td><td>Clean whiteboard with eraser</td><td>ID</td><td rowspan="5">Eraser wiped whiteboard 2 or more times, and then placed next to whiteboard.</td></tr>
    <tr><td>47</td><td>Easy</td><td>Clean whiteboard with eraser</td><td>ID</td></tr>
    <tr><td>48</td><td>Medium</td><td>Clean whiteboard with eraser (1 distractor)</td><td>ID</td></tr>
    <tr><td>49</td><td>Medium</td><td>Clean whiteboard with eraser (2 distractors)</td><td>ID</td></tr>
    <tr><td>50</td><td>Hard</td><td>Clean whiteboard with eraser (2 distractors)</td><td>ID</td></tr>

    <!-- Task 7 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 7: Pour Pepper</b></td></tr>
    <tr><td>51</td><td>Easy</td><td>Pour 1 shake of pepper into the red plate</td><td>ID</td><td rowspan="10">The exact number of pepper shakes is poured into the correct colored plate, the pepper is placed to the left of the plate, and SO-101 moved back to its home position.</td></tr>
    <tr><td>52</td><td>Easy</td><td>Pour 3 shakes of pepper into the red plate</td><td>ID</td></tr>
    <tr><td>53</td><td>Medium</td><td>Pour 2 shakes of pepper (1 distractor)</td><td>ID</td></tr>
    <tr><td>54</td><td>Medium</td><td>Pour 1 shake of pepper (1 distractor)</td><td>ID</td></tr>
    <tr><td>55</td><td>Hard</td><td>Pour 3 shakes of pepper (2 distractors)</td><td>ID</td></tr>
    <tr><td>56</td><td>Easy</td><td>Pour 4 shakes of pepper into red plate</td><td>OOD</td></tr>
    <tr><td>57</td><td>Easy</td><td>Pour 5 shakes of pepper into red plate</td><td>OOD</td></tr>
    <tr><td>58</td><td>Medium</td><td>Pour 1 shake of pepper into blue plate</td><td>OOD</td></tr>
    <tr><td>59</td><td>Medium</td><td>Pour 3 shakes of pepper into blue plate</td><td>OOD</td></tr>
    <tr><td>60</td><td>Hard</td><td>Pour 5 shakes of pepper into blue plate</td><td>OOD</td></tr>

    <!-- Task 8 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 8: Lift Bowl</b></td></tr>
    <tr><td>61</td><td>Easy</td><td>Lift green bowl one time</td><td>ID</td><td rowspan="10">Correct colored bowl lifted up and down the correct number of times, and SO-101 moved back to its home position.</td></tr>
    <tr><td>62</td><td>Easy</td><td>Lift blue bowl one time</td><td>ID</td></tr>
    <tr><td>63</td><td>Medium</td><td>Lift red bowl three times</td><td>ID</td></tr>
    <tr><td>64</td><td>Medium</td><td>Lift green bowl three times (1 distractor)</td><td>ID</td></tr>
    <tr><td>65</td><td>Hard</td><td>Lift blue bowl three times (2 distractors)</td><td>ID</td></tr>
    <tr><td>66</td><td>Easy</td><td>Lift green bowl two times</td><td>OOD</td></tr>
    <tr><td>67</td><td>Easy</td><td>Lift blue bowl two times</td><td>OOD</td></tr>
    <tr><td>68</td><td>Medium</td><td>Lift red bowl two times</td><td>OOD</td></tr>
    <tr><td>69</td><td>Medium</td><td>Lift yellow bowl two times</td><td>OOD</td></tr>
    <tr><td>70</td><td>Hard</td><td>Lift yellow bowl four times</td><td>OOD</td></tr>

    <!-- Task 9 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 9: Press Button</b></td></tr>
    <tr><td>71</td><td>Easy</td><td>Press button one time</td><td>ID</td><td rowspan="10">Button is touched the correct number of times, and SO-101 moved back to its home position.</td></tr>
    <tr><td>72</td><td>Easy</td><td>Press button three times</td><td>ID</td></tr>
    <tr><td>73</td><td>Medium</td><td>Press button one time (1 distractor)</td><td>ID</td></tr>
    <tr><td>74</td><td>Medium</td><td>Press button three times (1 distractor)</td><td>ID</td></tr>
    <tr><td>75</td><td>Hard</td><td>Press button three times (2 distractors)</td><td>ID</td></tr>
    <tr><td>76</td><td>Easy</td><td>Press button two times</td><td>OOD</td></tr>
    <tr><td>77</td><td>Easy</td><td>Press button four times (1 distractor)</td><td>OOD</td></tr>
    <tr><td>78</td><td>Medium</td><td>Press button two times (2 distractors)</td><td>OOD</td></tr>
    <tr><td>79</td><td>Medium</td><td>Press button four times (2 distractors)</td><td>OOD</td></tr>
    <tr><td>80</td><td>Hard</td><td>Press button five times (2 distractors)</td><td>OOD</td></tr>

    <!-- Task 10 -->
    <tr><td colspan="5" style="background-color: #f2f2f2;"><b>Task 10: Collect Blocks</b></td></tr>
    <tr><td>81</td><td>Easy</td><td>Collect 2 blocks into blue box</td><td>ID</td><td rowspan="10">All the blocks on the workspace are placed into the correct colored box, and SO-101 moved back to its home position.</td></tr>
    <tr><td>82</td><td>Easy</td><td>Collect 2 blocks into yellow box</td><td>ID</td></tr>
    <tr><td>83</td><td>Medium</td><td>Collect 3 blocks into blue box (1 distractor)</td><td>ID</td></tr>
    <tr><td>84</td><td>Medium</td><td>Collect 3 blocks into yellow box</td><td>ID</td></tr>
    <tr><td>85</td><td>Hard</td><td>Collect 4 blocks into blue box (2 distractors)</td><td>ID</td></tr>
    <tr><td>86</td><td>Easy</td><td>Collect 2 blocks into pink box</td><td>OOD</td></tr>
    <tr><td>87</td><td>Easy</td><td>Collect 3 blocks into pink box</td><td>OOD</td></tr>
    <tr><td>88</td><td>Medium</td><td>Collect 5 blocks into blue box</td><td>OOD</td></tr>
    <tr><td>89</td><td>Medium</td><td>Collect 5 blocks into yellow box</td><td>OOD</td></tr>
    <tr><td>90</td><td>Hard</td><td>Collect 5 blocks into pink box</td><td>OOD</td></tr>
  </tbody>
</table>