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
include Source/CMakeFiles/cmcldeps.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include Source/CMakeFiles/cmcldeps.dir/compiler_depend.make

# Include the progress variables for this target.
include Source/CMakeFiles/cmcldeps.dir/progress.make

# Include the compile flags for this target's objects.
include Source/CMakeFiles/cmcldeps.dir/flags.make

Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj: Source/CMakeFiles/cmcldeps.dir/flags.make
Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj: Source/CMakeFiles/cmcldeps.dir/includes_CXX.rsp
Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj: opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Source/cmcldeps.cxx
Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj: Source/CMakeFiles/cmcldeps.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source && C:\MinGW\bin\g++.exe $(CXX_DEFINES) -D_WIN32_WINNT=0x0501 $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj -MF CMakeFiles\cmcldeps.dir\cmcldeps.cxx.obj.d -o CMakeFiles\cmcldeps.dir\cmcldeps.cxx.obj -c C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Source\cmcldeps.cxx

Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/cmcldeps.dir/cmcldeps.cxx.i"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source && C:\MinGW\bin\g++.exe $(CXX_DEFINES) -D_WIN32_WINNT=0x0501 $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Source\cmcldeps.cxx > CMakeFiles\cmcldeps.dir\cmcldeps.cxx.i

Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/cmcldeps.dir/cmcldeps.cxx.s"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source && C:\MinGW\bin\g++.exe $(CXX_DEFINES) -D_WIN32_WINNT=0x0501 $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Source\cmcldeps.cxx -o CMakeFiles\cmcldeps.dir\cmcldeps.cxx.s

# Object files for target cmcldeps
cmcldeps_OBJECTS = \
"CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj"

# External object files for target cmcldeps
cmcldeps_EXTERNAL_OBJECTS = \
"C:/Users/leesj/Desktop/DiscordBot/src/reversi/Source/CMakeFiles/CMakeVersion.dir/CMakeVersion.rc.obj"

bin/cmcldeps.exe: Source/CMakeFiles/cmcldeps.dir/cmcldeps.cxx.obj
bin/cmcldeps.exe: Source/CMakeFiles/CMakeVersion.dir/CMakeVersion.rc.obj
bin/cmcldeps.exe: Source/CMakeFiles/cmcldeps.dir/build.make
bin/cmcldeps.exe: Source/libCMakeLib.a
bin/cmcldeps.exe: Source/kwsys/libcmsys.a
bin/cmcldeps.exe: Utilities/std/libcmstd.a
bin/cmcldeps.exe: Utilities/cmexpat/libcmexpat.a
bin/cmcldeps.exe: Utilities/cmlibarchive/libarchive/libcmlibarchive.a
bin/cmcldeps.exe: Utilities/cmliblzma/libcmliblzma.a
bin/cmcldeps.exe: Utilities/cmzstd/libcmzstd.a
bin/cmcldeps.exe: Utilities/cmbzip2/libcmbzip2.a
bin/cmcldeps.exe: Utilities/cmcurl/lib/libcmcurl.a
bin/cmcldeps.exe: Utilities/cmzlib/libcmzlib.a
bin/cmcldeps.exe: Utilities/cmnghttp2/libcmnghttp2.a
bin/cmcldeps.exe: Utilities/cmjsoncpp/libcmjsoncpp.a
bin/cmcldeps.exe: Utilities/cmlibuv/libcmlibuv.a
bin/cmcldeps.exe: Utilities/cmlibrhash/libcmlibrhash.a
bin/cmcldeps.exe: opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Source/cmake.version.manifest
bin/cmcldeps.exe: Source/CMakeFiles/cmcldeps.dir/linklibs.rsp
bin/cmcldeps.exe: Source/CMakeFiles/cmcldeps.dir/objects1.rsp
bin/cmcldeps.exe: Source/CMakeFiles/cmcldeps.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=C:\Users\leesj\Desktop\DiscordBot\src\reversi\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable ..\bin\cmcldeps.exe"
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\cmcldeps.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
Source/CMakeFiles/cmcldeps.dir/build: bin/cmcldeps.exe
.PHONY : Source/CMakeFiles/cmcldeps.dir/build

Source/CMakeFiles/cmcldeps.dir/clean:
	cd /d C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source && $(CMAKE_COMMAND) -P CMakeFiles\cmcldeps.dir\cmake_clean.cmake
.PHONY : Source/CMakeFiles/cmcldeps.dir/clean

Source/CMakeFiles/cmcldeps.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1 C:\Users\leesj\Desktop\DiscordBot\src\reversi\opencv_sources\cmake-3.21.0-rc1\cmake-3.21.0-rc1\Source C:\Users\leesj\Desktop\DiscordBot\src\reversi C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source C:\Users\leesj\Desktop\DiscordBot\src\reversi\Source\CMakeFiles\cmcldeps.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : Source/CMakeFiles/cmcldeps.dir/depend

