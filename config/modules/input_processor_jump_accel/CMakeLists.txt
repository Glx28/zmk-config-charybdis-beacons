# Copyright (c) 2026 The Charybdis Contributors
# SPDX-License-Identifier: MIT

if(CONFIG_INPUT_PROCESSOR_JUMP_ACCEL)
  zephyr_library()
  zephyr_library_sources(src/input_processor_jump_accel.c)
endif()
