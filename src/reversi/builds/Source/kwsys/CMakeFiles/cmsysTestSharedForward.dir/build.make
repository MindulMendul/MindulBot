# CMAKE generated file: DO NOT EDIT!
# Generated by "MinGW Makefiles" Generator, CMake Version 3.21

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

SHELL = cmd.exe

# The CMake executable.
CMAKE_COMMAND = "C:\Program Files\CMake\bin\cmake.exe"

# The command to remove a file.
RM = "C:\Program Files\CMake\bin\cmake.exe" -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = C:\Users\leesj\Desktop\DiscordBot\src\reversi

# Include any dependencies generated for this target.
include Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/compiler_depend.make

# Include the progress variables for this target.
include Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/progress.make

# Include the compile flags for this target's objects.
include Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/flags.make

Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/flags.make
Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/includes_C.rsp
Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj: Source/kwsys/testSharedForward.c
Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys && C:\MinGW\bin\gcc.exe $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -MD -MT Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj -MF CMakeFiles\cmsysTestSharedForward.dir\testSharedForward.c.obj.d -o CMakeFiles\cmsysTestSharedForward.dir\testSharedForward.c.obj -c C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys\testSharedForward.c

Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.i"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys && C:\MinGW\bin\gcc.exe $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys\testSharedForward.c > CMakeFiles\cmsysTestSharedForward.dir\testSharedForward.c.i

Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.s"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys && C:\MinGW\bin\gcc.exe $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys\testSharedForward.c -o CMakeFiles\cmsysTestSharedForward.dir\testSharedForward.c.s

# Object files for target cmsysTestSharedForward
cmsysTestSharedForward_OBJECTS = \
"CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj"

# External object files for target cmsysTestSharedForward
cmsysTestSharedForward_EXTERNAL_OBJECTS =

Source/kwsys/cmsysTestSharedForward.exe: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/testSharedForward.c.obj
Source/kwsys/cmsysTestSharedForward.exe: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/build.make
Source/kwsys/cmsysTestSharedForward.exe: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/linklibs.rsp
Source/kwsys/cmsysTestSharedForward.exe: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/objects1.rsp
Source/kwsys/cmsysTestSharedForward.exe: Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking C executable cmsysTestSharedForward.exe"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\cmsysTestSharedForward.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/build: Source/kwsys/cmsysTestSharedForward.exe
.PHONY : Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/build

Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/clean:
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys && $(CMAKE_COMMAND) -P CMakeFiles\cmsysTestSharedForward.dir\cmake_clean.cmake
.PHONY : Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/clean

Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1 C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Source\kwsys C:\Users\leesj\Desktop\DiscordBot\src\reversi C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\kwsys\CMakeFiles\cmsysTestSharedForward.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : Source/kwsys/CMakeFiles/cmsysTestSharedForward.dir/depend

