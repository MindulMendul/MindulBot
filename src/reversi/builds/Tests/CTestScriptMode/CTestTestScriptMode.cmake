# This script will be executed with ctest -S

# Check that the system name is determined correctly:
set(CMAKE_CMAKE_SYSTEM_NAME "Windows")

if (NOT "${CMAKE_SYSTEM_NAME}" STREQUAL "${CMAKE_CMAKE_SYSTEM_NAME}")
   message(FATAL_ERROR "Error: CMAKE_SYSTEM_NAME is \"${CMAKE_SYSTEM_NAME}\", but should be \"Windows\"")
endif()

# this seems to be necessary, otherwise ctest complains that these
# variables are not set:
set(CTEST_COMMAND "\"C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/bin/ctest\"")
set(CTEST_SOURCE_DIRECTORY "C:/Users/leesj/Desktop/DiscordBot/src/reversi/opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Tests/CTestScriptMode/")
set(CTEST_BINARY_DIRECTORY "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CTestScriptMode/")
