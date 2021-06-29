cmake_minimum_required(VERSION 2.8.10)

set(CTEST_SOURCE_DIRECTORY "C:/Users/leesj/Desktop/DiscordBot/src/reversi/opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Tests/VSProjectInSubdir")
set(CTEST_BINARY_DIRECTORY "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CTestBuildCommandProjectInSubdir/Nested")
set(CTEST_CMAKE_GENERATOR "MinGW Makefiles")
set(CTEST_BUILD_CONFIGURATION "Debug")

ctest_empty_binary_directory(${CTEST_BINARY_DIRECTORY})
ctest_start(Experimental)
ctest_configure(OPTIONS "-DCMAKE_MAKE_PROGRAM:FILEPATH=C:/MinGW/bin/mingw32-make.exe")
ctest_build(TARGET test)
