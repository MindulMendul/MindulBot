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
include Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/compiler_depend.make

# Include the progress variables for this target.
include Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/progress.make

# Include the compile flags for this target's objects.
include Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/flags.make

Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/flags.make
Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/includes_CXX.rsp
Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj: Tests/CMakeLib/PseudoMemcheck/ret1.cxx
Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck && C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj -MF CMakeFiles\memcheck_fail.dir\ret1.cxx.obj.d -o CMakeFiles\memcheck_fail.dir\ret1.cxx.obj -c C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck\ret1.cxx

Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/memcheck_fail.dir/ret1.cxx.i"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck && C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck\ret1.cxx > CMakeFiles\memcheck_fail.dir\ret1.cxx.i

Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/memcheck_fail.dir/ret1.cxx.s"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck && C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck\ret1.cxx -o CMakeFiles\memcheck_fail.dir\ret1.cxx.s

# Object files for target memcheck_fail
memcheck_fail_OBJECTS = \
"CMakeFiles/memcheck_fail.dir/ret1.cxx.obj"

# External object files for target memcheck_fail
memcheck_fail_EXTERNAL_OBJECTS =

Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/ret1.cxx.obj
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/build.make
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Source/libCMakeLib.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Source/kwsys/libcmsys.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/std/libcmstd.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmexpat/libcmexpat.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmlibarchive/libarchive/libcmlibarchive.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmliblzma/libcmliblzma.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmzstd/libcmzstd.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmbzip2/libcmbzip2.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmcurl/lib/libcmcurl.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmzlib/libcmzlib.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmnghttp2/libcmnghttp2.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmjsoncpp/libcmjsoncpp.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmlibuv/libcmlibuv.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Utilities/cmlibrhash/libcmlibrhash.a
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/linklibs.rsp
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/objects1.rsp
Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe: Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable memcheck_fail.exe"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\memcheck_fail.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/build: Tests/CMakeLib/PseudoMemcheck/memcheck_fail.exe
.PHONY : Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/build

Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/clean:
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck && $(CMAKE_COMMAND) -P CMakeFiles\memcheck_fail.dir\cmake_clean.cmake
.PHONY : Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/clean

Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1 C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Tests\CMakeLib\PseudoMemcheck C:\Users\leesj\Desktop\DiscordBot\src\reversi C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck C:\Users\leesj\Desktop\DiscordBot\src\reversi\Tests\CMakeLib\PseudoMemcheck\CMakeFiles\memcheck_fail.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : Tests/CMakeLib/PseudoMemcheck/CMakeFiles/memcheck_fail.dir/depend

