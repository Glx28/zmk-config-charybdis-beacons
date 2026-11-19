# Copyright (c) 2026 The Charybdis Contributors
# SPDX-License-Identifier: MIT

if(CONFIG_INPUT_PROCESSOR_JUMP_ACCEL)
  zephyr_library()
  zephyr_library_sources(src/input_processor_jump_accel.c)
  zephyr_library_sources_ifdef(CONFIG_ZMK_BEHAVIOR_TRACKBALL_TUNE src/behavior_trackball_tune.c)
  zephyr_library_sources(src/input_processor_motion_smoother.c)
endif()
